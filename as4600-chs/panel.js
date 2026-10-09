"use strict";

(function () {
  const $ = id => document.getElementById(id);
  const panel = $("chs4600Panel");
  if (!panel) return;
  const fields = ["chs4600Diameter", "chs4600Thickness", "chs4600Fy"];
  const products = As4600ChsProducts;
  let calculated = null;
  const format = (value, digits = 2) => new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);

  function resetCopy() {
    $("chs4600CopyStatus").textContent = "";
    $("chs4600CopyFallback").hidden = true;
    $("chs4600CopyText").value = "";
  }

  function resultText(answer) {
    const product = products.rows.find(row => row.id === $("chs4600Product").value);
    const provenance = product
      ? `Orrcon July 2024 §1.1.4, printed p. ${product.printedPage}; nominal dimensions; ${$("chs4600Grade").value}; fy from AS/NZS 1163:2016 Table 7`
      : "Manual inputs";
    return [
      "SC Handbook — Cold-formed CHS pure bending — For Review",
      `Inputs: D = ${answer.diameterMm} mm; t = ${answer.thicknessMm} mm; fy = ${answer.yieldStressMpa} MPa`,
      `Input source: ${provenance}`,
      `Method: AS/NZS 4600:2018 Cl. ${answer.branch}; φb = ${answer.phiB}`,
      `D/t = ${format(answer.ratio, 3)}; maximum D/t = ${format(answer.limits.applicability, 3)}; governing branch: Cl. ${answer.branch}`,
      `Design φbMb = ${format(answer.designMomentKNm, 4)} kN·m; nominal Mb = ${format(answer.nominalMomentKNm, 4)} kN·m`,
      "Pure bending only; demand and combined actions require separate checks."
    ].join("\n");
  }

  function clear(message) {
    calculated = null;
    $("chs4600Copy").disabled = true;
    resetCopy();
    $("chs4600Design").textContent = "Not evaluated";
    $("chs4600Nominal").textContent = "—";
    $("chs4600DesignUnit").hidden = true;
    $("chs4600NominalUnit").hidden = true;
    $("chs4600Branch").textContent = "—";
    $("chs4600Ratio").textContent = "—";
    $("chs4600RatioLimit").textContent = "—";
    $("chs4600Trace").replaceChildren();
    $("chs4600Issues").textContent = "";
    $("chs4600Issues").hidden = true;
    $("chs4600Status").textContent = message;
  }

  function trace(label, value) {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    // Only authored formula markup and formatted numeric values enter this field.
    // Any source-description text is escaped before it is included below.
    description.innerHTML = value;
    row.append(term, description);
    $("chs4600Trace").append(row);
  }

  const escapeText = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"}[char]));
  const fraction = (top, bottom) => `<span class="chs4600-fraction"><span>${top}</span><span class="chs4600-fraction-divider">/</span><span>${bottom}</span></span>`;
  const equation = value => `<span class="chs4600-equation">${value}</span>`;

  function selectProduct(id, gradeName) {
    const product = products.rows.find(row => row.id === id);
    const grade = $("chs4600Grade");
    grade.replaceChildren();
    $("chs4600Product").value = product ? product.id : "";
    grade.disabled = !product;
    if (!product) {
      grade.add(new Option("Select size first", ""));
      fields.forEach(field => { $(field).readOnly = false; });
      grade.value = "";
      $("chs4600ProductSource").textContent = "Manual inputs · values retained and editable.";
      $("chs4600InputMode").textContent = "Manual inputs · edit D, t and fy as required.";
      $("chs4600BasisConfirmed").checked = false;
      clear("Values retained. Confirm the design basis, then calculate.");
      return;
    }
    grade.add(new Option("Select the supplied grade", ""));
    product.grades.forEach(name => grade.add(new Option(name, name)));
    grade.value = product.grades.includes(gradeName) ? gradeName : "";
    $("chs4600Diameter").value = String(product.outsideDiameterMm);
    $("chs4600Thickness").value = String(product.nominalThicknessMm);
    $("chs4600Fy").value = grade.value ? String(products.grades[grade.value]) : "";
    fields.forEach(field => { $(field).readOnly = true; });
    $("chs4600InputMode").textContent = `Catalogue: ${product.outsideDiameterMm} × ${product.nominalThicknessMm} CHS · ${grade.value || "grade required"}. Select Manual inputs to edit.`;
    $("chs4600ProductSource").textContent = `Orrcon July 2024 §1.1.4, p. ${product.printedPage} · nominal mass ${product.nominalMassKgM.toFixed(2)} kg/m. ` + (grade.value ? `${grade.value}: minimum fy ${products.grades[grade.value]} MPa (AS/NZS 1163:2016 Table 7). Confirm supply.` : "Select the supplied grade to load fy.");
    $("chs4600BasisConfirmed").checked = false;
    clear(grade.value ? "Inputs loaded. Confirm the design basis, then calculate." : "Select the supplied grade to continue.");
  }

  const productSelect = $("chs4600Product");
  products.rows.forEach(product => productSelect.add(new Option(`${product.outsideDiameterMm} × ${product.nominalThicknessMm} CHS · Orrcon 2024`, product.id)));
  productSelect.addEventListener("change", () => selectProduct(productSelect.value));
  $("chs4600Grade").addEventListener("change", () => selectProduct(productSelect.value, $("chs4600Grade").value));

  fields.forEach(id => $(id).addEventListener("input", () => {
    $("chs4600BasisConfirmed").checked = false;
    clear("Inputs changed. Reconfirm and calculate.");
  }));
  $("chs4600Copy").addEventListener("click", async () => {
    if (!calculated) return;
    const answer = calculated;
    const text = resultText(answer);
    resetCopy();
    try {
      await navigator.clipboard.writeText(text);
      if (calculated === answer && resultText(answer) === text) $("chs4600CopyStatus").textContent = "Result copied.";
    } catch {
      if (calculated !== answer || resultText(answer) !== text) return;
      $("chs4600CopyText").value = text;
      $("chs4600CopyFallback").hidden = false;
      $("chs4600CopyText").focus();
      $("chs4600CopyText").select();
      $("chs4600CopyStatus").textContent = "Select and copy the text below.";
    }
  });
  $("chs4600BasisConfirmed").addEventListener("change", () => clear("Confirmation changed. Recalculate."));
  $("chs4600Calculate").addEventListener("click", () => {
    const selectedProduct = products.rows.find(row => row.id === productSelect.value);
    if (selectedProduct && !selectedProduct.grades.includes($("chs4600Grade").value)) {
      clear("Not evaluated");
      $("chs4600Issues").textContent = "Select the supplied grade to establish fy.";
      $("chs4600Issues").hidden = false;
      return;
    }
    if (!$("chs4600BasisConfirmed").checked) {
      clear("Not evaluated");
      $("chs4600Issues").textContent = "Confirm dimensions, grade, cold-formed CHS and AS/NZS 4600 design basis.";
      $("chs4600Issues").hidden = false;
      return;
    }
    const answer = As4600ChsBending.calculate({
      diameterMm: $("chs4600Diameter").value,
      thicknessMm: $("chs4600Thickness").value,
      yieldStressMpa: $("chs4600Fy").value
    });
    clear(answer.status === "Calculated" ? "Calculated · For Review" : answer.status);
    if (answer.status !== "Calculated") {
      const ratioNote = answer.ratio && answer.limits
        ? ` D/t = ${format(answer.ratio, 3)}; maximum = ${format(answer.limits.applicability, 3)}.`
        : "";
      $("chs4600Issues").textContent = answer.issues.join(" ") + ratioNote;
      $("chs4600Issues").hidden = false;
      return;
    }
    $("chs4600Design").textContent = format(answer.designMomentKNm);
    $("chs4600Nominal").textContent = format(answer.nominalMomentKNm);
    $("chs4600DesignUnit").hidden = false;
    $("chs4600NominalUnit").hidden = false;
    $("chs4600Branch").textContent = `AS/NZS 4600:2018 Cl. ${answer.branch}`;
    $("chs4600Ratio").textContent = format(answer.ratio, 3);
    $("chs4600RatioLimit").textContent = format(answer.limits.applicability, 3);
    calculated = answer;
    $("chs4600Copy").disabled = false;
    const D = "<var>D</var>", t = "<var>t</var>", di = "<var>d<sub>i</sub></var>";
    const I = "<var>I</var>", Zf = "<var>Z<sub>f</sub></var>", fy = "<var>f<sub>y</sub></var>";
    const E = "<var>E</var>", Mb = "<var>M<sub>b</sub></var>", phiB = "<var>φ<sub>b</sub></var>";
    const ratio = fraction(D, t), eFy = fraction(E, fy);
    const provenance = productSelect.value
      ? `Orrcon nominal ${productSelect.value} CHS, ${$("chs4600Grade").value}.`
      : "Manual project values.";
    trace("1 · Adopted inputs", escapeText(provenance) + equation(`${D} = ${format(answer.diameterMm, 3)}&nbsp;mm; ${t} = ${format(answer.thicknessMm, 3)}&nbsp;mm; ${fy} = ${format(answer.yieldStressMpa, 3)}&nbsp;MPa; ${E} = ${format(answer.elasticModulusMpa, 0)}&nbsp;MPa; ${phiB} = ${format(answer.phiB, 2)}.`));
    trace("2 · Inside diameter", equation(`${di} = ${D} − 2${t} = ${format(answer.diameterMm, 3)} − 2 × ${format(answer.thicknessMm, 3)} = ${format(answer.insideDiameterMm, 3)}&nbsp;mm.`));
    trace("3 · Second moment of area", equation(`${I} = ${fraction(`π(${D}<sup>4</sup> − ${di}<sup>4</sup>)`, "64")} = ${fraction(`π(${format(answer.diameterMm, 3)}<sup>4</sup> − ${format(answer.insideDiameterMm, 3)}<sup>4</sup>)`, "64")} ≈ ${format(answer.momentOfInertiaMm4, 3)}&nbsp;mm<sup>4</sup>.`));
    trace("4 · Full section modulus", equation(`${Zf} = ${fraction(I, `${D}/2`)} = ${fraction(`2${I}`, D)} = ${fraction(`2 × ${format(answer.momentOfInertiaMm4, 3)}`, format(answer.diameterMm, 3))} ≈ ${format(answer.sectionModulusMm3, 3)}&nbsp;mm<sup>3</sup>.`));
    trace("5 · Diameter ratio", equation(`${ratio} = ${fraction(format(answer.diameterMm, 3), format(answer.thicknessMm, 3))} = ${format(answer.ratio, 3)}.`));
    trace("6 · Branch limits", [
      equation(`0.0714${eFy} = ${format(answer.limits.compact, 3)}`),
      equation(`0.318${eFy} = ${format(answer.limits.intermediate, 3)}`),
      equation(`Applicability: ${ratio} ≤ 0.441${eFy} = ${format(answer.limits.applicability, 3)}`)
    ].join(""));
    const branchCheck = answer.branch === "3.6.2(1)"
      ? `${ratio} = ${format(answer.ratio, 3)} ≤ ${format(answer.limits.compact, 3)}`
      : answer.branch === "3.6.2(2)"
        ? `${format(answer.limits.compact, 3)} < ${format(answer.ratio, 3)} ≤ ${format(answer.limits.intermediate, 3)}`
        : `${format(answer.limits.intermediate, 3)} < ${format(answer.ratio, 3)} ≤ ${format(answer.limits.applicability, 3)}`;
    const branchFormula = answer.branch === "3.6.2(1)"
      ? `${Mb} = 1.25${fy}${Zf}`
      : answer.branch === "3.6.2(2)"
        ? `${Mb} = [0.970 + 0.020${fraction(`${E}/${fy}`, `${D}/${t}`)}]${fy}${Zf}`
        : `${Mb} = ${fraction(`0.328${E}${Zf}`, `${D}/${t}`)}`;
    const substitution = answer.branch === "3.6.2(1)"
      ? `1.25 × ${format(answer.yieldStressMpa, 3)}`
      : answer.branch === "3.6.2(2)"
        ? `[0.970 + 0.020 × ${fraction(`${format(answer.elasticModulusMpa, 0)}/${format(answer.yieldStressMpa, 3)}`, format(answer.ratio, 3))}] × ${format(answer.yieldStressMpa, 3)}`
        : fraction(`0.328 × ${format(answer.elasticModulusMpa, 0)}`, format(answer.ratio, 3));
    trace("7 · Governing expression", `AS/NZS 4600:2018 Cl. ${answer.branch}` + equation(`${branchCheck}.`) + equation(branchFormula));
    trace("8 · Nominal capacity", equation(`${Mb} = ${substitution} × ${format(answer.sectionModulusMm3, 3)} ≈ ${format(answer.nominalMomentKNm * 1e6, 3)}&nbsp;N·mm`) + equation(`${Mb} ≈ ${fraction(format(answer.nominalMomentKNm * 1e6, 3), "10<sup>6</sup>")} ≈ ${format(answer.nominalMomentKNm, 4)}&nbsp;kN·m.`));
    trace("9 · Design capacity", equation(`${phiB}${Mb} = ${format(answer.phiB, 2)} × ${format(answer.nominalMomentKNm, 4)} ≈ ${format(answer.designMomentKNm, 4)}&nbsp;kN·m.`));
    trace("Demand comparison", equation(`<var>M<sup>*</sup></var> ≤ ${phiB}${Mb}`) + "Check the design moment separately.");
  });
})();
