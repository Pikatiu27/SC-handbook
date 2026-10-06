(function() {
  'use strict';
  const host = document.getElementById('antennaLookup');
  if (!host) return;
  const data = globalThis.panelAntennaData, lookup = globalThis.panelAntennaLookup;
  const $ = id => document.getElementById(id);
  if (!data || !lookup) { $('antennaCount').textContent = 'Catalogue unavailable. Reload the page; no values are available.'; $('antennaMessage').textContent = $('antennaCount').textContent; $('antennaMessage').hidden = false; return; }
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const label = {datasheet:'','sheet-pending':'PDF needs review',catalogue:'Catalogue · sheet needed',family:'Variant sheet needed',conflict:'Source conflict','site-record':'Site record · sheet needed'};
  const statusBadge = row => label[row.status] ? `<span class="antenna-status antenna-status-${esc(row.status)}">${esc(label[row.status])}</span>` : '';
  const evidenceLabel = {deployed:'Commercial deployment',existing:'Existing site record',planned:'Planned installation',reserved:'Reserved position',demonstration:'Live-site demonstration'};
  const sourceLink = row => `<a href="${esc(row.sourceUrl)}" target="_blank" rel="noopener noreferrer">${row.specUrl ? 'Original manufacturer PDF' : row.status === 'site-record' ? 'Site document' : row.status === 'catalogue' ? 'Manufacturer catalogue' : 'Manufacturer source'}</a>${row.productUrl ? ` · <a href="${esc(row.productUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc('Open product page for '+row.model)}">Product page ↗</a>` : ''}`;
  const pageLink = (row,page,text) => `<a href="${esc(row.specUrl)}#page=${page}" target="_blank" rel="noopener noreferrer" aria-label="${esc(row.model+' · '+text+' · page '+page)}">${esc(text)} · p.${page}</a>`;
  const specLinks = row => row.specUrl ? `<a class="antenna-spec-link" href="${esc(row.specUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc('Open spec sheet for '+row.model)}">Open spec sheet ↗</a><div class="antenna-page-links">${pageLink(row,row.mechanicalPage,'Size / mass')}${pageLink(row,row.windPage,'Wind')}</div>` : row.publicSpecUrl ? `<a class="antenna-pending-spec-link" href="${esc(row.publicSpecUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc('Open unreviewed public PDF for '+row.model)}">Public PDF · review needed ↗</a><small>${sourceLink(row)}</small>` : `<span class="antenna-missing-sheet">Spec sheet needed</span><small>${sourceLink(row)}</small>`;
  const massLabels = {'Without mounting kit':'Excl. mounting kit','Without mounting kit and RET':'Excl. kit / RET','Antenna only':'Antenna only','Weight, net; mounting-kit inclusion not stated in this row':'Net; kit basis unstated','Antenna weight; kit stated separately':'Kit listed separately','Net antenna weight; mounting-kit inclusion not stated':'Net; kit basis unstated','Net antenna weight; bracket stated separately':'Bracket listed separately','Antenna weight; mounting-kit inclusion not stated':'Kit inclusion unstated'};
  const controls = ['antennaSearch','antennaBrand','antennaKind','antennaStatus','antennaOperator','antennaEvidence','antennaGeneration','antennaFrequency'];
  const deploymentDetails = row => row.deployments.length ? `<h3>Australian operator evidence</h3><ul class="antenna-evidence-list">${row.deployments.map(e=>`<li><b>${esc(e.operator)} · ${esc(evidenceLabel[e.type])}</b><span>${esc(e.site)} · ${esc(e.date)}</span><span>${esc(e.technology)}</span><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${esc(e.locator)}</a></li>`).join('')}</ul>` : '<p>Australian use not established.</p>';
  const unavailable = '<span class="antenna-missing-value">Not verified</span>';
  const metrics = rows => `<dl class="antenna-metrics">${rows.map(([name,value])=>`<div${name==='Max'?' class="antenna-metric-max"':''}><dt>${name}</dt><dd>${value == null ? '—' : esc(value)}</dd></div>`).join('')}</dl>`;
  const pageSize = 25;
  let visible = [], pageRows = [], pageIndex = 0, selectedId = null, selectionOpen = false;
  function details(row) {
    const datum = (name,value,locator,wide=false) => `<div${wide?' class="antenna-detail-wide"':''}><dt>${esc(name)}</dt><dd>${esc(value ?? 'Not verified')}${locator ? `<small>${esc(locator)}</small>` : ''}</dd></div>`;
    const group = (name,fields,note='') => `<div class="antenna-detail-group" role="group" aria-label="${esc(name)}"><h3>${esc(name)}</h3><dl>${fields}</dl>${note}</div>`;
    const wind = row.windN ? Object.entries(row.windN).filter(([,v])=>v != null).map(([k,v])=>`${k}: ${v} N`).join('; ') + ` at ${row.windSpeedKmh} km/h` : row.status==='datasheet' ? 'Not stated in checked PDF' : null;
    const epa = row.epaM2 ? Object.entries(row.epaM2).map(([k,v])=>`${k}: ${v} m²`).join('; ') : null;
    const mechanical = datum(row.sizeDescription ? 'Size · length / diameter' : 'Size · H / W / D',row.dimensionsMm ? row.dimensionsMm.join(' × ')+' mm' : row.sizeDescription || null,row.locators.dimensions)
      + datum('Antenna mass',row.massKg == null ? null : row.massKg+' kg',row.locators.mass)
      + datum('Mass basis',row.massBasis)
      + (row.fieldIssues?.mass ? datum('Mass source conflict',row.fieldIssues.mass,row.locators.mass,true) : '')
      + datum('Mounting kit mass',row.kitMassKg == null ? null : row.kitMassKg+' kg · '+row.kitMassBasis,row.locators.kitMass)
      + datum('Mounting kit',row.mountingKit,row.locators.mounting)
      + datum('Mounting pipe OD',row.mountingPipeMm ? row.mountingPipeMm.join('–')+' mm' : null,row.locators.mounting);
    const coefficients = lookup.windCoefficients(row);
    const number = value => Number(value.toPrecision(6)).toString();
    const coefficientValues = entries => entries.length ? entries.map(entry=>`${entry.direction}: ${entry.value.toFixed(3)}`).join('; ')+' · dimensionless' : null;
    const coefficientBasis = entries => entries.map(entry=>`${entry.direction}: A = ${number(entry.referenceAreaM2)} m² (${entry.areaDescription})${entry.airDensityKgM3 ? '; ρ = '+number(entry.airDensityKgM3)+' kg/m³; '+entry.forceN+' N @ '+entry.referenceSpeedKmh+' km/h' : ''}; checked ${entry.checked}; ${Object.values(entry.locators).join('; ')}; ${entry.sourceUrl}`).join(' / ');
    const windFields = datum('Published wind force',wind,row.locators.wind)
      + datum('Maximum stated wind speed',row.survivalSpeedText || (row.survivalSpeedKmh == null ? null : row.survivalSpeedKmh+' km/h'),row.locators.wind)
      + datum('Published EPA',epa,row.locators.epa)
      + (row.fieldIssues?.epa ? datum('EPA source conflict',row.fieldIssues.epa,row.locators.epa,true) : '')
      + (row.equivalentFlatPlateAreaM2 != null ? datum('Published equivalent flat plate area',row.equivalentFlatPlateAreaM2+' m²',row.locators.efpa) : '');
    const coefficientFields = datum('Published Cd',coefficientValues(coefficients.published),coefficients.published.length ? coefficientBasis(coefficients.published) : null)
      + (row.fieldIssues?.cd ? datum('Cd source conflict',row.fieldIssues.cd,null,true) : '')
      + datum('Derived Cd',coefficientValues(coefficients.derived),coefficients.derived.length ? coefficientBasis(coefficients.derived) : null)
      + (coefficients.equivalent.length ? coefficients.equivalent.map(entry=>datum('Equivalent force coefficient · '+entry.direction,entry.value.toFixed(3)+' · dimensionless',`${entry.forceN} N @ ${entry.referenceSpeedKmh} km/h; assumed A = ${number(entry.referenceAreaM2)} m² (${entry.areaDescription})`)).join('') : datum('Equivalent force coefficient','Unavailable'));
    const missing = new Map();
    for(const [direction,reason] of Object.entries(coefficients.unavailable)) {
      if(!missing.has(reason)) missing.set(reason,[]);
      missing.get(reason).push(direction);
    }
    const missingDirections = [...missing].map(([reason,directions])=>`<li><b>${esc(directions.join(' / '))}:</b> ${esc(reason)}</li>`).join('');
    const windNote = `<p class="antenna-wind-note"><b>${esc(coefficients.status)}.</b> ${coefficients.equivalent.length ? 'Assumed density 1.225 kg/m³ and nominal envelope areas; not manufacturer Cd.' : 'Coefficient evidence or required inputs missing.'}</p><details class="antenna-coefficient-basis"><summary>Calculation basis and limitations</summary><div class="antenna-coefficient-content"><h4>Coefficient meanings</h4><ul><li><b>Published Cd:</b> verified manufacturer Cd with its reference-area definition.</li><li><b>Derived Cd:</b> verified drag force, test density and reference area.</li><li><b>Equivalent force coefficient:</b> estimate: stated force/speed; assumed density and envelope area.</li></ul><h4>Assumptions and source pages</h4><p class="antenna-wind-note">${esc(coefficients.assumptions || 'Documented basis or checked inputs required. Missing values are unavailable, never zero.')}</p><p class="antenna-wind-note">${esc('Dimensions: '+(row.locators.dimensions || 'Not verified')+'; wind: '+(row.locators.wind || 'Not verified'))}</p><h4>Unavailable directions</h4><ul>${missingDirections}</ul><h4>References and design limits</h4><p class="antenna-wind-note"><a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/" target="_blank" rel="noopener noreferrer">NASA drag equation</a>: equation and reference-area definition. <a href="https://www.rfstechnologies.com/pictures/white%20papers/rfs_white_paper_windloading_20july22.pdf#page=4" target="_blank" rel="noopener noreferrer">RFS wind-loading white paper · p.4</a>: drag/resultant-force interpretation. Estimates do not establish AS/NZS 1170.2 site actions or mount/pole capacity.</p></div></details>`;
    const radio = datum('Antenna type',row.kind+(row.formFactor ? ' · '+row.formFactor : ''))
      + datum(row.frequenciesMHz.length ? 'Operating frequency ranges' : 'Spectrum description',row.frequenciesMHz.length ? row.frequenciesMHz.map(([lo,hi])=>lo+'–'+hi).join('; ')+' MHz' : row.bandSummary || null,row.locators.rf)
      + (row.fieldIssues?.rf ? datum('RF source conflict',row.fieldIssues.rf,row.locators.rf,true) : '')
      + datum('RF connections',row.ports == null ? row.connector : row.ports+' ports'+(row.connector ? '; '+row.connector : ''),row.locators.rf)
      + datum('Electrical tilt',row.tiltDegrees == null ? null : row.tiltDegrees+'°',row.locators.rf);
    const documents = (row.aliases.length ? datum('Search aliases',row.aliases.join(', ')) : '')
      + datum('Product status',row.lifecycle)
      + datum('Document revision',row.revision)
      + datum('Source checked',row.checked)
      + (row.sourceAccess ? datum('Source access checked',row.sourceAccess.date+' · '+row.sourceAccess.result) : '')
      + datum('Source locator',row.locators.identity || row.id);
    const modelNotes = row.notes ? `<div class="antenna-detail-group" role="group" aria-label="Model notes"><h3>Model notes</h3><ul class="antenna-model-notes">${row.notes.split(/(?<=[.!?])\s+(?=[A-Z])/).map(note=>`<li>${esc(note)}</li>`).join('')}</ul></div>` : '';
    return `<div class="antenna-detail">${group('Mechanical and installation',mechanical)}${group('Wind',windFields)}${group('RF parameters',radio)}${group('Wind coefficient interpretation',coefficientFields,windNote)}${modelNotes}${group('Documents and sources',documents)}<div class="antenna-detail-group" role="group" aria-label="Australian operator evidence">${row.deployments.length ? deploymentDetails(row) : '<h3>Australian operator evidence</h3>'+deploymentDetails(row)}</div><p class="antenna-source-line">${sourceLink(row)}${(row.relatedSources||[]).map(url=>` · <a href="${esc(url)}" target="_blank" rel="noopener noreferrer">Compare source</a>`).join('')} · ${esc(row.id)}</p></div>`;
  }
  function render(alignSelection = false) {
    const frequency = $('antennaFrequency').value;
    const invalid = frequency !== '' && (!Number.isFinite(Number(frequency)) || Number(frequency) <= 0);
    $('antennaFrequency').setAttribute('aria-invalid',String(invalid));
    const extra = ['antennaOperator','antennaEvidence','antennaGeneration','antennaKind'].map(id=>$(id).value).filter(Boolean);
    if(frequency) extra.push(frequency+' MHz');
    $('antennaExtraSummary').textContent = 'More filters'+(extra.length ? ' · '+extra.map(value=>evidenceLabel[value] || (value==='any'?'Has Australian evidence':value)).join(' · ') : '');
    visible = lookup.sort(lookup.filter(data.records, {query:$('antennaSearch').value,brand:$('antennaBrand').value,kind:$('antennaKind').value,status:$('antennaStatus').value,operator:$('antennaOperator').value,evidence:$('antennaEvidence').value,generation:$('antennaGeneration').value,frequency}),$('antennaSort').value);
    if (!visible.some(row=>row.id===selectedId)) { selectedId = null; selectionOpen = false; }
    if (alignSelection && selectionOpen) pageIndex = Math.floor(visible.findIndex(row=>row.id===selectedId) / pageSize);
    const pages = Math.ceil(visible.length / pageSize);
    pageIndex = Math.max(0,Math.min(pageIndex,pages-1));
    const start = pageIndex * pageSize;
    pageRows = visible.slice(start,start+pageSize);
    $('antennaCount').textContent = invalid ? 'Enter a positive frequency in MHz.' : `${visible.length} of ${data.records.length} entries · ${visible.filter(r=>r.status==='datasheet').length} checked PDFs · ${visible.filter(r=>r.deployments.length).length} with Australian evidence`;
    $('antennaShown').textContent = visible.length.toLocaleString('en-AU');
    $('antennaTotal').textContent = data.records.length.toLocaleString('en-AU');
    $('antennaPDFCount').textContent = visible.filter(r=>r.status==='datasheet').length.toLocaleString('en-AU');
    $('antennaAUCount').textContent = visible.filter(r=>r.deployments.length).length.toLocaleString('en-AU');
    $('antennaMessage').textContent = invalid ? 'Enter a positive frequency in MHz.' : '';
    $('antennaMessage').hidden = !invalid;
    $('antennaChecked').textContent = 'Latest source intake '+data.checked;
    $('antennaExport').disabled = !visible.length;
    $('antennaPagination').hidden = visible.length <= pageSize;
    $('antennaPrevious').disabled = pageIndex === 0;
    $('antennaNext').disabled = !pages || pageIndex === pages-1;
    $('antennaPageInfo').textContent = visible.length ? `${start+1}–${start+pageRows.length} of ${visible.length.toLocaleString('en-AU')} · Page ${pageIndex+1} / ${pages}` : '';
    $('antennaRows').innerHTML = pageRows.map(row => {
      const selected = selectedId === row.id;
      const open = selected && selectionOpen;
      const fieldConflict = Object.values(row.fieldIssues || {}).some(Boolean);
      const dim = row.dimensionsMm ? metrics(['H','W','D'].map((name,i)=>[name,row.dimensionsMm[i]])) : row.sizeDescription ? metrics([['L',row.lengthMm],['Ø',row.diameterMm]]) : unavailable;
      const mass = row.massKg == null ? (row.fieldIssues?.mass ? '<span class="antenna-field-conflict" title="'+esc(row.fieldIssues.mass)+'">Source conflict<small>See Details</small></span>' : row.status==='datasheet' ? '<span class="antenna-missing-value">Not stated in PDF</span>' : unavailable) : `<span class="antenna-mass-value">${row.massKg}</span><small class="antenna-mass-basis" title="${esc(row.massBasis)}">${esc(massLabels[row.massBasis] || row.massBasis)}</small>`;
      const wind = row.windN ? `<div class="antenna-wind-basis">at ${row.windSpeedKmh} km/h · N</div>`+metrics([['F',row.windN.front],['S',row.windN.side],['R',row.windN.rear],...(row.windN.max == null ? [] : [['Max',row.windN.max]])]) : row.status==='datasheet' ? '<span class="antenna-missing-value">Not stated in PDF</span>' : unavailable;
      return `<tr class="antenna-data-row${selected?' antenna-selected-row':''}"><th scope="row"><button id="antenna-model-${esc(row.id)}" type="button" class="antenna-model-button" data-record="${esc(row.id)}" aria-expanded="${open}" aria-controls="antennaSelection" aria-label="${esc('View details for '+row.model)}"><b>${esc(row.model)}</b></button><small class="antenna-brand">${esc(row.brand)}</small><div class="antenna-model-meta"><span class="antenna-type">${esc(row.kind+(row.formFactor && row.formFactor!=='Panel' ? ' · '+row.formFactor : ''))}</span>${statusBadge(row)}${fieldConflict ? '<span class="antenna-status antenna-status-conflict">Field conflict</span>' : ''}</div></th><td data-label="Size (mm)">${dim}</td><td data-label="Mass (kg)">${mass}${row.kitMassKg != null ? `<small class="antenna-kit-mass">Separate kit: <b>${row.kitMassKg} kg</b></small>` : ''}</td><td data-label="Wind force (N)">${wind}</td><td class="antenna-source-cell" data-label="Documents">${specLinks(row)}</td></tr>`;
    }).join('');
    $('antennaEmpty').hidden = invalid || visible.length > 0;
    const selected = visible.find(row=>row.id===selectedId);
    $('antennaSelection').hidden = !selected || !selectionOpen;
    $('antennaSelectionTitle').textContent = selected ? selected.model : 'Model details';
    $('antennaSelectionMeta').textContent = selected ? [selected.brand,selected.kind,label[selected.status]].filter(Boolean).join(' · ') : '';
    $('antennaSelectionDocs').innerHTML = selected && selectionOpen ? specLinks(selected) : '';
    $('antennaSelectionBody').innerHTML = selected && selectionOpen ? details(selected) : '';
  }
  host.addEventListener('click',event => {
    const brandButton = event.target.closest('[data-brand]');
    if (brandButton) { controls.forEach(id=>$(id).value='');$('antennaBrand').value=brandButton.dataset.brand;pageIndex=0;render();$('antennaResults').scrollTop=0;$('antennaSearch').focus();return; }
    const operatorButton = event.target.closest('[data-operator]');
    if (operatorButton) { controls.forEach(id=>$(id).value='');$('antennaOperator').value=operatorButton.dataset.operator;pageIndex=0;render();$('antennaResults').scrollTop=0;$('antennaSearch').focus();return; }
    const button = event.target.closest('[data-record]');
    if (!button) return;
    const id=button.dataset.record;
    if (!pageRows.some(row=>row.id===id)) return;
    selectedId = id; selectionOpen = true;
    render();
    $('antennaSelectionTitle').focus({preventScroll:true});
    $('antennaSelection').scrollIntoView({block:'start'});
  });
  [...controls,'antennaSort'].forEach(id => $(id).addEventListener(id==='antennaSearch' || id==='antennaFrequency' ? 'input' : 'change', ()=>{pageIndex=0;render(id==='antennaSort');$('antennaResults').scrollTop=0;}));
  function changePage(delta) {
    const next = pageIndex + delta;
    if (next < 0 || next >= Math.ceil(visible.length / pageSize)) return;
    pageIndex = next; selectionOpen = false; render();
    $('antennaResults').scrollTop=0;
    $('antennaResults').focus({preventScroll:true});
    $('antennaResults').scrollIntoView({block:'start'});
  }
  $('antennaPrevious').addEventListener('click',()=>changePage(-1));
  $('antennaNext').addEventListener('click',()=>changePage(1));
  $('antennaBack').addEventListener('click',()=>{
    const selectedIndex = visible.findIndex(row=>row.id===selectedId);
    if (selectedIndex >= 0) pageIndex = Math.floor(selectedIndex/pageSize);
    selectionOpen = false; render();
    const button = document.getElementById('antenna-model-'+selectedId);
    if (button) { button.focus({preventScroll:true}); button.scrollIntoView({block:'nearest'}); }
    else $('antennaSearch').focus();
  });
  $('antennaReset').addEventListener('click',()=>{controls.forEach(id=>$(id).value='');$('antennaSort').value='documents';selectedId=null;selectionOpen=false;pageIndex=0;render();$('antennaResults').scrollTop=0;});
  $('antennaExport').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([lookup.csv(visible)],{type:'text/csv;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download='panel-antenna-specs-'+data.checked+'.csv';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  // Counts have their own column; the accompanying prose retains scope and gaps.
  const sourceNotes = text => text.replace(/^\d+ entries \/ \d+ checked PDF records\.\s*/,'').split(/(?<=\.)\s+(?=[A-Z])/);
  $('antennaDirectories').innerHTML='<table class="antenna-brand-table"><caption class="visually-hidden">Brand records, checked PDFs and original sources. Counts are catalogue records, not unique PDFs. Shared sheets can support several order codes; Argus / CommScope / ANDREW entries overlap.</caption><colgroup><col class="antenna-brand-name-col"><col class="antenna-brand-number-col"><col class="antenna-brand-number-col"><col class="antenna-brand-source-col"></colgroup><thead><tr><th scope="col">Brand</th><th scope="col" class="antenna-brand-count">Entries</th><th scope="col" class="antenna-brand-count">Checked PDFs</th><th scope="col">Source and coverage</th></tr></thead><tbody>'+data.directories.map(item=>{const rows=lookup.filter(data.records,{brand:item.filterBrand || item.brand});return `<tr><th scope="row"><button type="button" data-brand="${esc(item.filterBrand || item.brand)}" aria-label="${esc('Show '+item.brand+' models')}">${esc(item.brand)}</button></th><td class="antenna-brand-count" data-label="Entries">${rows.length}</td><td class="antenna-brand-count" data-label="Checked PDFs">${rows.filter(r=>r.status==='datasheet').length}</td><td class="antenna-brand-source"><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Official source ↗</a><details class="antenna-brand-scope"><summary>Coverage and gaps</summary><ul class="antenna-brand-notes">${sourceNotes(item.note).map(note=>`<li>${esc(note)}</li>`).join('')}</ul></details></td></tr>`;}).join('')+'</tbody></table>';
  $('antennaCoverage').textContent = `Non-exhaustive catalogue: ${data.records.length} entries · ${data.records.filter(r=>r.status==='datasheet').length} checked PDF records. See Brands for coverage gaps.`;
  $('antennaOperators').innerHTML=data.operatorOverview.map(item=>`<article><h3>${esc(item.operator)}</h3><ul class="antenna-operator-examples">${item.text.split(/(?<=\.)\s+(?=[A-Z])/).map(example=>`<li>${esc(example)}</li>`).join('')}</ul><p class="antenna-operator-sources">${item.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>`).join(' · ')}</p><button type="button" data-operator="${esc(item.operator)}">Show documented models</button></article>`).join('');
  render();
})();
