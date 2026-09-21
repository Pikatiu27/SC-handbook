"use strict";
const assert=require("node:assert/strict");
const query=require("../geo-parameters/geo-parameters.js");
// Independent arithmetic fixtures from Look Table 21.17, PDF345 / printed320.
assert.deepEqual(query.sandShaftBenchmarks(100).rows,[
 ["Loose","Not recommended","15 kPa","30 kPa"],
 ["Medium dense","10 kPa","25 kPa","50 kPa"],
 ["Dense","20 kPa","40 kPa","80 kPa"],
 ["Very dense","30 kPa","60 kPa","120 kPa"]
]);
assert.deepEqual(query.sandShaftBenchmarks(50).rows[3],["Very dense","15 kPa","30 kPa","60 kPa"]);
assert.deepEqual(query.sandShaftBenchmarks(200).rows[3],["Very dense","60 kPa","120 kPa","240 kPa"]);
for(const invalid of [0,-1,NaN,Infinity,75,"100"])assert.throws(()=>query.sandShaftBenchmarks(invalid),RangeError);
const clay=query.foundationQuickReferences("clay")[0];
assert.deepEqual(clay.rows[3],["Stiff","≈ 15–30 kPa","≈ 23–45 kPa"]);
assert.deepEqual(clay.rows[5],["Hard","≈ 60–100 kPa (cap)","≈ 90–100 kPa (cap)"]);
assert.match(clay.note,/classification bands/);
const gravel=query.foundationQuickReferences("gravel");
assert.equal(gravel.length,1);
assert.deepEqual(gravel[0].rows.map(row=>row[1]),["0.55–0.60","0.45–0.55"]);
assert.doesNotMatch(JSON.stringify(gravel),/pile shaft|120 kPa/i);
const rock=query.foundationQuickReferences("rock")[0];
assert.equal(rock.rows.length,6);
assert.deepEqual(rock.rows[0],["Sandstone","825–1725"]);
assert.match(rock.note,/not pile socket resistance/);
assert.deepEqual(query.foundationQuickReferences("silt"),[]);
console.log("Material-specific quick references and conditional shaft benchmarks passed.");

assert.deepEqual(query.overviewShaft("sand","very-dense",100).parts.map(p=>p.value),["30 kPa","120 kPa"]);
assert.deepEqual(query.overviewShaft("sand","very-dense",50).parts.map(p=>p.value),["15 kPa","60 kPa"]);
assert.equal(query.overviewShaft("sand","very-loose").role,"project");
assert.equal(query.overviewShaft("gravel","dense").role,"project");
assert.deepEqual(query.overviewShaft("clay","stiff").parts.map(p=>p.value),["≈ 15–30 kPa","≈ 23–45 kPa"]);

assert.deepEqual(query.overviewShaft("clay","very-soft").parts.map(p=>p.value),["Up to about 4 kPa","Up to about 5 kPa"]);
