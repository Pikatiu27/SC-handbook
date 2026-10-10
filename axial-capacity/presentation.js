/* Axial display adapter. Mirrors adopted outputs; performs no capacity calculations. */
"use strict";
(() => {
  const panel = document.getElementById('memberPanel');
  if (!panel) return;
  const find = selector => panel.querySelector(selector);
  const area = find('#memberAreaSummary');
  const factors = find('#memberSummaryCompressionFactors');
  const warning = find('#memberWarning');
  const propertyGroups = find('[data-axial-property-groups]');
  const pairs = text => Object.fromEntries(text.split(';').map(part => {
    const match = part.trim().match(/^(?:[xy]:\s*)?([^=]+)=\s*(.*)$/);
    return match ? [match[1].trim(), match[2].trim()] : [];
  }).filter(pair => pair.length === 2));
  const row = (label, value) => ({label, value:value || '—'});
  const writeValue = (cell, value) => {
    const match = value.match(/^(-?[\d,.]+)\s+(mm²|mm|m|MPa)$/);
    if (!match) { cell.textContent = value; return; }
    cell.append(document.createTextNode(match[1] + ' '));
    const unit = document.createElement('small'); unit.textContent = match[2]; cell.append(unit);
  };
  const renderProperties = type => {
    const geometry = pairs(find('#memberGeometrySummary').textContent);
    const areas = pairs(area.textContent);
    const material = pairs(find('#memberMaterialSummary').textContent);
    const compression = pairs(find('#memberCompressionSummary').textContent);
    const geometricKeys = {
      ub:[['Depth d','d'],['Width b<sub>f</sub>','bf'],['Web t<sub>w</sub>','tw'],['Flange t<sub>f</sub>','tf']],
      uc:[['Depth d','d'],['Width b<sub>f</sub>','bf'],['Web t<sub>w</sub>','tw'],['Flange t<sub>f</sub>','tf']],
      pfc:[['Depth d','d'],['Width b<sub>f</sub>','bf'],['Web t<sub>w</sub>','tw'],['Flange t<sub>f</sub>','tf']],
      chs:[['Diameter D','D'],['Wall t','t']], rhs:[['Depth d','d'],['Width b','b'],['Wall t','t']],
      shs:[['Width / depth b, d','b'],['Wall t','t']], ea:[['Leg b','b'],['Actual t','actual t']], rod:[['Diameter d','d']], custom:[]
    };
    const geometryRows = (geometricKeys[type] || []).map(([label,key]) => row(label, (geometry[key] || '').replace(/^d\s*=\s*/, '')));
    if (geometry['nominal t']) geometryRows.push(row('Nominal t', geometry['nominal t']));
    geometryRows.push(row('Gross area A<sub>g</sub>', (areas.Ag || '').replace(/\s*\(.*/, '')));
    const axis = find('#memberSummaryAxis').textContent.split('/')[0].trim();
    let compressionRows;
    if (type === 'custom') {
      compressionRows = [
        row('r<sub>x</sub>',compression.rx),row('r<sub>y</sub>',compression.ry),
        row('L<sub>ex</sub>',compression.Lex),row('L<sub>ey</sub>',compression.Ley),
        row('L<sub>ex</sub>/r<sub>x</sub>',compression['Lex/rx']),row('L<sub>ey</sub>/r<sub>y</sub>',compression['Ley/ry']),
        row('α<sub>b,x</sub>',compression['αb,x']),row('α<sub>b,y</sub>',compression['αb,y']),
        row('Form factor k<sub>f</sub>',factors.textContent.split('/')[0].trim())
      ];
    } else {
      compressionRows = [
        row('Gyration r',(compression['r used'] || '').replace(/\s*\(default.*/, '')),
        row('Length L<sub>e</sub>',compression.Le),
        row('Slenderness L<sub>e</sub>/r',find('#memberSummarySlenderness').textContent.split('/')[1]?.trim()),
        row('Form factor k<sub>f</sub>',factors.textContent.split('/')[0].trim()),
        row('Constant α<sub>b</sub>',factors.textContent.split('/')[1]?.trim())
      ];
    }
    const groups = [
      ['geometry','Geometry',geometryRows],
      ['material','Material',[row('Yield f<sub>y</sub>',material.fy),row('Tensile f<sub>u</sub>',material.fu)]],
      ['compression','Compression',compressionRows],
      ['tension','Tension / connection',[row('Net area A<sub>n</sub>',find('#memberSummaryNetArea').textContent),row('Connection k<sub>t</sub>',find('#memberSummaryKt').textContent)]]
    ];
    const content = document.createDocumentFragment();
    for (const [key,label,records] of groups) {
      const section=document.createElement('section'), heading=document.createElement('h3'), list=document.createElement('dl');
      section.className='axial-property-group'; section.dataset.axialGroup=key; heading.textContent=label;
      if (key === 'compression') {
        records.unshift(row(type==='custom' ? 'Governing axis' : 'Checked axis',axis));
      }
      for (const record of records) {
        const item=document.createElement('div'), term=document.createElement('dt'), value=document.createElement('dd');
        term.innerHTML=record.label; writeValue(value,record.value); item.append(term,value); list.append(item);
      }
      section.append(heading,list); content.append(section);
    }
    propertyGroups.replaceChildren(content);
    find('[data-axial-axis]').textContent = find('#memberSummaryAxis').textContent;
    find('[data-axial-slenderness]').textContent = find('#memberSummarySlenderness').textContent;
  };
  const refresh = () => {
    const type = find('.member-type.active')?.dataset.memberType;
    // Catalogue defaults are a useful recovery action even when entered strengths are invalid.
    if (type !== 'custom' && find('#memberMaterialStatus').textContent === 'Enter valid strengths') {
      find('#memberMaterialReset').hidden = false;
      find('#memberMaterialReset').disabled = false;
    }
    renderProperties(type);
    for (const row of panel.querySelectorAll('#memberFormulaSteps .calculation-trace-row')) {
      row.hidden = row.querySelector('.calculation-trace-heading b')?.textContent === 'Design action utilisation';
    }
    const original = warning.innerHTML;
    find('[data-axial-assumption]').innerHTML = find('#memberAssumption').innerHTML;
    find('[data-axial-full-scope]').innerHTML = original;
    const visibleScope = /^Input required:/i.test(warning.textContent)
      ? original
      : ['ub', 'uc', 'pfc'].includes(type)
        ? 'Centroidal compression / tension only.'
        : original
          .replace('Scope: centroidal axial compression and axial tension only.', 'Centroidal compression / tension only.')
          .replace(/; k<sub>f<\/sub> = [\d.]+, (?:&alpha;|α)<sub>b<\/sub> = -?[\d.]+\./, '.')
          .replace(/, k<sub>f<\/sub> = [\d.]+, (?:&alpha;|α)<sub>b<\/sub> = -?[\d.]+\./, '.')
          .replace(/ k<sub>f<\/sub> = [\d.]+, (?:&alpha;|α)<sub>b<\/sub> = -?[\d.]+\./, '')
          .replace(/ (?:EA|Round Bar) basis:/, '')
          .replace(/; (?:minor y-y axis|symmetric axes)\./, '.')
          .replace('Flexural buckling about the entered axes only.', 'Flexural buckling about both entered axes only.');
    find('[data-axial-scope]').innerHTML = visibleScope;
  };
  const observer = new MutationObserver(refresh);
  for (const selector of ['#memberFormulaSteps','#memberAreaSummary','#memberSummaryCompressionFactors','#memberWarning','#memberGeometrySummary','#memberMaterialSummary','#memberCompressionSummary','#memberSummaryAxis','#memberSummarySlenderness','#memberSummaryNetArea','#memberSummaryKt','#memberAssumption']) observer.observe(find(selector), {childList:true, subtree:true, characterData:true});
  refresh();
})();
