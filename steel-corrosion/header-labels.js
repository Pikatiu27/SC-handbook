'use strict';
(function(root){
  const widths={environment:[120,240,140,140,240],paint:[140,108,108,140,120,170,120],life:[140,108,136,150,120,240],coating:[140,150,170,140,120,120]};
  function presentation(view,column){
    let label=column.label,unit=column.unit||'',title=column.label+(unit?' · '+unit:'');
    if(column.key==='category'){label=view==='environment'?'Category':'Exposure';unit=view==='environment'?'AS 4312':'AS 2312';}
    if(view==='environment'&&column.key==='environment')label='Environment';
    if((view==='environment'||view==='life')&&column.key==='condition')label='Conditions';
    if(column.key==='life')label='First maint.';
    if(view==='life'&&column.key==='zinc'){label='Avg. zinc';title='Average zinc thickness · '+unit;}
    if(view==='paint'&&column.key==='total')title='Total nominal dry film thickness (NDFT) · '+unit;
    return {label,unit,title};
  }
  function layout(view,table){
    const sizes=widths[view];if(!sizes)throw Error('Unknown corrosion header view');
    const group=document.createElement('colgroup');group.dataset.schColumns=view;
    for(const width of sizes){const col=document.createElement('col');col.style.width=width+'px';group.append(col);}
    table.prepend(group);table.style.setProperty('--sch-min',sizes.reduce((a,b)=>a+b,0)+'px');
  }
  const api={presentation,layout,widths};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SCSteelCorrosionHeaders=api;
})(globalThis);
