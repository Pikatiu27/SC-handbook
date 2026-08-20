(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BoltIntegrity = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const positive = (value, name) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) throw new RangeError(`${name} must be greater than zero.`);
    return number;
  };

  const bounded = (value, name, minimum, maximum) => {
    const number = positive(value, name);
    if (number < minimum || number > maximum) {
      throw new RangeError(`${name} must be between ${minimum} and ${maximum}.`);
    }
    return number;
  };

  function straightLineNetArea(values) {
    const width = positive(values.width, "width");
    const thickness = positive(values.thickness, "thickness");
    const holeCount = Number(values.holeCount);
    const holeDiameter = Number(values.holeDiameter);
    if (!Number.isInteger(holeCount) || holeCount < 0 || holeCount > 20) {
      throw new RangeError("holeCount must be a whole number from 0 to 20.");
    }
    if (!Number.isFinite(holeDiameter) || holeDiameter < 0 || (holeCount > 0 && holeDiameter <= 0)) {
      throw new RangeError("holeDiameter must be positive when the critical section crosses a hole.");
    }
    const grossArea = width * thickness;
    const holeDeduction = holeCount * holeDiameter * thickness;
    const netArea = grossArea - holeDeduction;
    if (netArea <= 0) throw new RangeError("The straight-line net area must be greater than zero.");
    return Object.freeze({ grossArea, holeDeduction, netArea });
  }

  function netSectionTension(values) {
    const Ag = positive(values.Ag, "Ag");
    const An = positive(values.An, "An");
    const fy = positive(values.fy, "fy");
    const fu = positive(values.fu, "fu");
    const kt = bounded(values.kt, "kt", 0.01, 1);
    const phi = bounded(values.phi ?? 0.9, "phi", 0.01, 1);
    if (An > Ag) throw new RangeError("An must not exceed Ag.");
    if (fy > fu) throw new RangeError("fy must not exceed fu.");

    const grossYield = Ag * fy / 1000;
    const netFracture = 0.85 * kt * An * fu / 1000;
    const nominal = Math.min(grossYield, netFracture);
    return Object.freeze({
      grossYield,
      netFracture,
      nominal,
      design: phi * nominal,
      control: grossYield <= netFracture ? "Gross-section yielding" : "Net-section fracture"
    });
  }

  function blockShear(values) {
    const Agv = positive(values.Agv, "Agv");
    const Anv = positive(values.Anv, "Anv");
    const Ant = positive(values.Ant, "Ant");
    const fy = positive(values.fy, "fy");
    const fu = positive(values.fu, "fu");
    const kbs = bounded(values.kbs, "kbs", 0.5, 1);
    const phi = bounded(values.phi ?? 0.75, "phi", 0.01, 1);
    if (kbs !== 0.5 && kbs !== 1) throw new RangeError("kbs must be 0.5 or 1.0.");
    if (Anv > Agv) throw new RangeError("Anv must not exceed Agv.");
    if (fy > fu) throw new RangeError("fy must not exceed fu.");

    const ruptureLimit = 0.6 * fu * Anv / 1000 + kbs * fu * Ant / 1000;
    const yieldLimit = 0.6 * fy * Agv / 1000 + kbs * fu * Ant / 1000;
    const nominal = Math.min(ruptureLimit, yieldLimit);
    return Object.freeze({
      ruptureLimit,
      yieldLimit,
      nominal,
      design: phi * nominal,
      control: ruptureLimit <= yieldLimit ? "Net-shear rupture limit" : "Gross-shear yielding limit"
    });
  }

  return Object.freeze({ straightLineNetArea, netSectionTension, blockShear });
});
