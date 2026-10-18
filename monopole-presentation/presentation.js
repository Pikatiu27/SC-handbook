/* Display adapter for the accepted Monopole trace contract. No evaluation,
 * resistance calculation, input mutation, or source-status promotion. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MonopoleTracePresentation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const decode = value => String(value ?? "").replace(/&(?:amp|lt|gt|quot|#39);/g,
    s => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }[s]));
  const mrow = value => "<mrow>" + value + "</mrow>";
  const mi = value => "<mi>" + escape(value) + "</mi>";
  const mn = value => "<mn>" + escape(value) + "</mn>";
  const mo = value => "<mo>" + escape(value) + "</mo>";
  const mtext = value => "<mtext>" + escape(value) + "</mtext>";
  const sup = (base, exponent) => "<msup>" + base + exponent + "</msup>";
  const sub = (base, index) => "<msub>" + base + index + "</msub>";
  const frac = (a, b) => "<mfrac>" + mrow(a) + mrow(b) + "</mfrac>";
  const space = '<mspace width="0.22em"/>';
  const superscripts = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const subscripts = "₀₁₂₃₄₅₆₇₈₉";
  const numberPattern = /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+−-]?\d+)?/gi;
  const functions = new Set(["sin", "cos", "tan", "min", "max"]);
  const units = new Set(["mm", "m", "kg", "kN", "MPa", "N", "s"]);
  const descriptive = new Set(["ratio", "shell", "guide", "Volume"]);
  const notationWords = new Set([...functions, ...units, ...descriptive,
    "nom", "min", "mean", "start", "inside", "outside", "upper", "lower",
    "bottom", "top", "max", "guidance", "entered", "constructed", "ins", "Dd", "mg"]);

  function numberMarkup(source, format) {
    const shown = format ? format(source) : source;
    const parts = shown.split(/e/i);
    if (parts.length === 1) return mn(shown);
    return mrow(mn(parts[0]) + mo("×") + sup(mn("10"), mrow(
      (/^[-−]/.test(parts[1]) ? mo("−") : "") + mn(parts[1].replace(/^[+−-]/, ""))
    )));
  }

  function symbolMarkup(source) {
    const [base, ...rest] = source.split("_");
    const baseMarkup = base.length === 1 ? mi(base)
      : functions.has(base) || units.has(base) || descriptive.has(base) ? mtext(base)
      : mi(base);
    if (!rest.length) return baseMarkup;
    const label = rest.join("_");
    const index = label.split(",").map(part => /^\d+$/.test(part) ? mn(part)
      : part.length === 1 ? mi(part) : mtext(part)).join(mo(","));
    return sub(baseMarkup, mrow(index));
  }

  function tokens(source) {
    const result = [];
    let position = 0;
    while (position < source.length) {
      const c = source[position];
      if (/\s/.test(c)) { position++; continue; }
      const number = source.slice(position).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+−-]?\d+)?/i);
      if (number) { result.push({ type: "number", value: number[0] }); position += number[0].length; continue; }
      const identifier = source.slice(position).match(/^(?:[A-Za-z]+|[α-ωΑ-Ωφϕρπλθδ])(?:_[A-Za-z0-9]+(?:,[A-Za-z0-9]+)*)?/);
      if (identifier) {
        const value = identifier[0];
        // These two accepted formulas use juxtaposed Latin variables.
        if (value === "mg" || value === "Dd") {
          result.push(...value.split("").map(letter => ({ type: "identifier", value: letter })));
        } else {
          const previous = result.at(-1), previous2 = result.at(-2);
          const unit = units.has(value) && (/\s/.test(source[position - 1] || "")
            && (previous?.type === "number" || [")", "]"].includes(previous?.value))
            || previous?.value === "/" && previous2?.unit);
          result.push({ type: "identifier", value, unit });
        }
        position += value.length; continue;
      }
      if (superscripts.includes(c) || subscripts.includes(c)) {
        const isSub = subscripts.includes(c), alphabet = isSub ? subscripts : superscripts;
        let digits = "";
        while (position < source.length && alphabet.includes(source[position])) digits += alphabet.indexOf(source[position++]);
        result.push({ type: isSub ? "subscript" : "superscript", value: digits }); continue;
      }
      result.push({ type: "operator", value: c === "-" ? "−" : c === "·" ? "×" : c });
      position++;
    }
    return result;
  }

  // A small notation grammar. Products are formed before a following division,
  // so a*b/c is one fraction with the complete a*b numerator. It never evals.
  function expression(source, format, options = {}) {
    if (format && typeof format === "object") { options = format; format = undefined; }
    const requestedThreshold = options.continuationThreshold ?? options.threshold ?? 22;
    const continuationThreshold = typeof requestedThreshold === "number" && requestedThreshold > 0 ? requestedThreshold : 22;
    const list = tokens(source);
    let index = 0;
    const peek = () => list[index];
    const is = value => peek()?.value === value;
    const consume = () => list[index++];
    const node = (kind, fields) => ({ kind, ...fields });
    const atomicStart = token => token && (token.type === "number" || token.type === "identifier" || ["(", "[", "{", "√", "Σ", "∑"].includes(token.value));
    function atom() {
      const token = consume();
      if (!token) throw new Error("Missing notation operand");
      if (["+", "−"].includes(token.value)) return node("unary", { sign: token.value, body: atom() });
      if (token.value === "√") return node("sqrt", { body: power() });
      if (token.value === "Σ" || token.value === "∑") return node("sum", { body: power() });
      if (["(", "[", "{"].includes(token.value)) {
        const close = { "(": ")", "[": "]", "{": "}" }[token.value];
        const body = relation();
        if (!is(close)) throw new Error("Unclosed notation group");
        consume();
        return node("group", { open: token.value, close, body });
      }
      if (token.type === "number") return node("number", { source: token.value });
      if (token.type !== "identifier") throw new Error("Unsupported notation token: " + token.value);
      if (functions.has(token.value)) {
        if (["(", "["].includes(peek()?.value)) {
          const open = consume().value, close = open === "(" ? ")" : "]", args = [];
          do { args.push(relation()); if (!is(",")) break; consume(); } while (peek());
          if (!is(close)) throw new Error("Unclosed notation function");
          consume(); return node("function", { name: token.value, args });
        }
        return node("function", { name: token.value, args: [power()], unbracketed: true });
      }
      let value = node("identifier", { source: token.value, unit: token.unit });
      // D(s), R(z_i,shell_j) are functions; L_i(...) is a product.
      const stationFunction = token.value === "D" && is("(")
        && list[index + 1]?.value === "s" && list[index + 2]?.value === ")";
      if ((stationFunction || token.value === "R") && is("(")) {
        consume(); const args = [];
        do { args.push(relation()); if (!is(",")) break; consume(); } while (peek());
        if (!is(")")) throw new Error("Unclosed station function");
        consume(); value = node("function", { name: token.value, args });
      }
      return value;
    }
    function power() {
      let base = atom();
      while (peek()?.type === "superscript" || peek()?.type === "subscript" || is("^")) {
        const token = consume();
        const exponent = token.value === "^" ? atom() : node("number", { source: token.value });
        base = node(token.type === "subscript" ? "subscript" : "power", { base, exponent });
      }
      return base;
    }
    function product() {
      let left = power();
      while (peek()) {
        if (is("/") || is("×")) {
          const operation = consume().value, right = power();
          left = node(operation === "/" ? "fraction" : "product", { left, right, explicit: true });
        } else if (atomicStart(peek())) left = node("product", { left, right: power(), explicit: false });
        else break;
      }
      return left;
    }
    function addition() {
      let left = product();
      while (is("+") || is("−")) {
        const operation = consume().value;
        left = node("add", { left, right: product(), operation });
      }
      return left;
    }
    function relation() {
      const terms = [addition()], operations = [];
      while (["=", "≤", "≥", "<", ">", "≈"].includes(peek()?.value)) {
        operations.push(consume().value); terms.push(addition());
      }
      return operations.length ? node("relation", { terms, operations }) : terms[0];
    }
    const result = relation();
    if (index !== list.length) throw new Error("Unconsumed notation token: " + peek()?.value);
    const bare = value => value.kind === "group" ? render(value.body) : render(value);
    function weight(value) {
      if (value.kind === "number") return (format ? format(value.source) : value.source).length;
      if (value.kind === "identifier") return value.source.length;
      if (value.kind === "function") return value.name.length + value.args.reduce((sum, v) => sum + weight(v), 0);
      if (value.terms) return value.terms.reduce((sum, v) => sum + weight(v), 0);
      if (value.left) return weight(value.left) + weight(value.right) + 2;
      if (value.base) return weight(value.base) + weight(value.exponent);
      return value.body ? weight(value.body) + 2 : 1;
    }
    function continuation(kind, terms) {
      return '<mtable columnalign="left" rowspacing="0.18em" data-mono-continuation="' + kind + '">'
        + terms.map((term, i) => "<mtr><mtd>" + (i ? mo(term.operation) : "") + render(term.value) + "</mtd></mtr>").join("")
        + "</mtable>";
    }
    function additiveTerms(value, operation = "+") {
      return value.kind === "add" ? [...additiveTerms(value.left, operation), { value: value.right, operation: value.operation }]
        : [{ value, operation }];
    }
    function productTerms(value) {
      if (value.kind !== "product") return [{ value, operation: "×" }];
      const terms = productTerms(value.left);
      if (isUnit(value.right)) {
        const previous = terms.pop();
        terms.push({ ...previous, value: node("quantity", { body: previous.value, unit: value.right }) });
      } else terms.push({ value: value.right, operation: "×" });
      return terms;
    }
    function isUnit(value) {
      return value.kind === "identifier" && value.unit || value.kind === "power" && isUnit(value.base);
    }
    const positiveScalar = value => value.kind === "number" || value.kind === "group" && positiveScalar(value.body);
    function render(value) {
      if (value.kind === "number") return numberMarkup(value.source, format);
      if (value.kind === "identifier") return value.unit ? mtext(value.source) : symbolMarkup(value.source);
      if (value.kind === "quantity") return mrow(render(value.body) + space + render(value.unit));
      if (value.kind === "unary") return mrow(mo(value.sign) + render(value.body));
      if (value.kind === "sqrt") return "<msqrt>" + bare(value.body) + "</msqrt>";
      if (value.kind === "sum") return mrow(mo("∑") + render(value.body));
      if (value.kind === "group") return positiveScalar(value.body) ? render(value.body)
        : mrow(mo(value.open) + render(value.body) + mo(value.close));
      if (value.kind === "function" && continuationThreshold === 22 && ["min", "max"].includes(value.name) && weight(value) > 22) {
        const argumentsTable = '<mtable columnalign="left" rowspacing="0.18em" data-mono-arguments="' + value.name + '">'
          + value.args.map((arg, i) => '<mtr><mtd>' + render(arg) + (i < value.args.length - 1 ? mo(",") : "") + '</mtd></mtr>').join("") + '</mtable>';
        return mrow(mtext(value.name) + mo("(") + argumentsTable + mo(")"));
      }
      if (value.kind === "function") return mrow((functions.has(value.name) ? mtext(value.name) : mi(value.name))
        + (value.unbracketed ? render(value.args[0]) : mo("(") + value.args.map(render).join(mo(",")) + mo(")")));
      if (value.kind === "power" || value.kind === "subscript") return (value.kind === "power" ? sup : sub)(render(value.base), render(value.exponent));
      if (value.kind === "fraction") return frac(bare(value.left), bare(value.right));
      if (value.kind === "product") return weight(value) > continuationThreshold
        ? continuation("product", productTerms(value))
        : mrow(render(value.left) + (isUnit(value.right) ? space : value.explicit ? mo("×") : "") + render(value.right));
      if (value.kind === "add") return weight(value) > continuationThreshold
        ? continuation("sum", additiveTerms(value))
        : mrow(render(value.left) + mo(value.operation) + render(value.right));
      if (value.kind === "relation") return mrow(value.terms.map((term, i) => (i ? mo(value.operations[i - 1]) : "") + render(term)).join(""));
      throw new Error("Unknown notation node");
    }
    return { node: result, render, html: render(result) };
  }

  function math(content, source, inline = false) {
    return '<math xmlns="http://www.w3.org/1998/Math/MathML" display="' + (inline ? "inline" : "block")
      + '" class="mono-math" data-mono-exact="' + escape(source) + '">' + mrow(content) + "</math>";
  }
  function unitMarkup(source) {
    const parts = source.split("/");
    const unit = value => {
      const match = value.match(/^([^⁰¹²³⁴⁵⁶⁷⁸⁹]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]*)$/);
      const base = mtext(match?.[1] || value);
      return match?.[2] ? sup(base, mn([...match[2]].map(c => superscripts.indexOf(c)).join(""))) : base;
    };
    if (parts.length === 2) return frac(unit(parts[0]), unit(parts[1]));
    return source.split("·").map(unit).join(mo("·"));
  }

  function precisionPolicy(row, options) {
    const significantDigits = Math.min(17, Math.max(6, options.significantDigits ?? 10));
    const fields = ["formula", "substitution", "result", "selection", "adopted"].map(key => decode(row[key] || ""));
    const sources = fields.join(" ").match(numberPattern) || [];
    const values = sources.map(s => Number(s.replace("−", "-"))).filter(Number.isFinite);
    const rounded = value => Number(value.toPrecision(significantDigits));
    // These rows disclose adopted inputs and selected boundaries, not only
    // computed results. Do not round away an explicitly entered distinction.
    const boundary = /(?:pole-thickness|-(?:position|inside|class|flat|effective)$)/.test(row.id || "");
    let exact = options.exact === true || boundary;
    for (let i = 0; !exact && i < values.length; i++) {
      for (let j = 0; j < i; j++) {
        const difference = values[i] - values[j];
        if (difference && Math.abs((rounded(values[i]) - rounded(values[j])) - difference) > Math.abs(difference) * 1e-7) {
          exact = true; break;
        }
      }
    }
    let changed = false;
    const format = source => {
      const value = Number(source.replace("−", "-"));
      if (exact || !Number.isFinite(value)) return source;
      const display = String(rounded(value));
      if (Number(display) !== value) changed = true;
      return display;
    };
    return { format, exact, significantDigits, changed: () => changed };
  }

  const inlineVariables = /(?:φM_s|φN_s|φ|λ_[spy]|λ|ρ|δ_[A-Za-z]+(?:,[A-Za-z]+)*|δ|θ|A_[0-9gen]|I|Z_(?:min|e|c|f)|Z|S|D_(?:inside,upper|outside,lower|ins,max|mean|o|b|t)|D|d_e|f_y|F_a|M_s|N_[sc]|P|t_(?:nom|d)|r_(?:i|b)|a_[oi]|R_[oi]|L_(?:o,i|i|guidance|entered|constructed,guide)|z_(?:start|c,i|c|G)|s_c)(?![A-Za-z0-9_])/g;
  function prose(source) {
    const plain = decode(source).replace(/<br\s*\/?\s*>/gi, "\n");
    const pieces = [];
    let start = 0;
    for (const match of plain.matchAll(inlineVariables)) {
      const at = match.index;
      if (at > 0 && /[A-Za-z0-9_]/.test(plain[at - 1])) continue;
      pieces.push(escape(plain.slice(start, at)).replace(/\n/g, "<br>"));
      pieces.push(math(symbolMarkup(match[0]), match[0], true));
      start = at + match[0].length;
    }
    pieces.push(escape(plain.slice(start)).replace(/\n/g, "<br>"));
    return '<span class="mono-trace-prose">' + pieces.join("") + "</span>";
  }

  function splitClauses(source) {
    return decode(source).replace(/<br\s*\/?\s*>/gi, "; ").split(";").map(s => s.trim()).filter(Boolean);
  }
  function equation(source, format, inline = false) {
    // Numeric substitution units belong to the whole RHS, not its last term.
    const unit = source.match(/\s+(kN·m|kg\/m³|kg\/m|m\/s²|mm[²³⁴]?|m[²³⁴]?|kg|kN|MPa)$/);
    const body = unit ? source.slice(0, unit.index).trim() : source;
    const variant = continuationThreshold => {
      const parsed = expression(body, format, { continuationThreshold });
      let content = parsed.html;
      const withUnit = term => {
        const value = parsed.render(term);
        return (term.kind === "add" ? mrow(mo("(") + value + mo(")")) : value) + (unit ? space + unitMarkup(unit[1]) : "");
      };
      if (unit) {
        if (parsed.node.kind === "relation") {
          content = parsed.node.terms.map((term, i) => i
            ? mo(parsed.node.operations[i - 1]) + withUnit(term) : parsed.render(term)).join("");
        } else content = withUnit(parsed.node);
      }
      if (!inline && continuationThreshold === 22 && parsed.node.kind === "relation" && (parsed.node.terms.length > 2 || body.length > 45)) {
        // Wrap a chain at relation signs without splitting a fraction or min argument.
        return parsed.node.terms.map((term, i) => math(i === 0
          ? parsed.render(term) + mo(parsed.node.operations[0])
          : (i > 1 ? mo(parsed.node.operations[i - 1]) : "") + withUnit(term), source, inline)).join("");
      }
      return math(content, source, inline);
    };
    const narrow = variant(22), wide = variant(90);
    // Responsive wrappers live in HTML, never inside MathML. Short equations
    // share one representation; long equations differ only in continuation.
    return narrow === wide ? narrow : '<span class="mono-math-wide">' + wide
      + '</span><span class="mono-math-narrow">' + narrow + "</span>";
  }

  function clause(source, format, failures) {
    if (!source || source === "—") return prose(source || "—");
    // Preserve descriptive prefixes as prose. Only the following expression is
    // parsed, so headings such as 'Theoretical shell mass' never become symbols.
    const prefix = source.match(/^(Assembled |Nominal |Design |Effective |Equivalent |Permitted |Local |Installed |conservative |Manual\/project |Entered |guide |Guide )(?=[A-Za-zφρλδθ\d])/);
    let label = prefix?.[0] || "", body = prefix ? source.slice(label.length) : source;
    const location = body.match(/^([^:=]+):\s*(.+)$/);
    if (location) { label += location[1] + ": "; body = location[2]; }
    const labelled = body.match(/^([^=]+?)\s*=\s*(.+)$/);
    const hasEnglishLabel = labelled && (labelled[1].match(/[A-Za-z]+/g) || [])
      .some(word => word.length > 1 && !notationWords.has(word) && !/^e$/i.test(word));
    if (hasEnglishLabel) {
      // A written result label is not a physical variable.
      label += labelled[1].trim() + " = "; body = labelled[2];
    }
    // These clauses are explanatory English or segment labels, not algebra.
    if (/^(?:Capacity uses |mass uses |f_y follows |Minimum of |Plate grade |Manual\/project|actual installed comparison |at or above|below )/.test(source)
      || !/[=+−×/√Σ∑²³⁴]|\d/.test(body) || /^[A-Za-z]+\d+$/.test(body)) return prose(source);
    // Unknown words indicate prose, except the explicit mathematical vocabulary.
    const unknown = (body.match(/[A-Za-z]+/g) || []).some(word => word.length > 1
      && !notationWords.has(word)
      && !/^e$/i.test(word));
    if (unknown) return prose(source);
    try {
      return '<span class="mono-math-line">' + (label ? '<span class="mono-math-label">' + escape(label) + "</span>" : "")
        + equation(body, format) + "</span>";
    } catch (error) {
      failures.push({ source, message: error.message });
      return prose(source);
    }
  }

  function equations(source, format, failures) {
    return '<span class="mono-math-stack">' + splitClauses(source).map(s => clause(s, format, failures)).join("") + "</span>";
  }

  function reference(source) {
    const plain = decode(source)
      .replace(/\b(AS(?:\/NZS)?\s+\d+(?:\.\d+)?):\d{4}\b/g, "$1")
      .replace(/\b(ASCE\/SEI\s+\d+)-\d{2}\b/g, "$1");
    let current = "";
    return plain.split(";").map(part => {
      const item = part.trim();
      const sourceName = item.match(/^(AS(?:\/NZS)?\s+\d+(?:\.\d+)?|ASCE\/SEI\s+\d+)\b/);
      if (sourceName) current = sourceName[1];
      return current && /^(?:Cl\.|Cls\b|Table\b|Appendix\b|Eq\.|Eqs\.|Fig\.|Figs\.)/.test(item) ? current + " " + item : item;
    }).join("; ");
  }

  function presentRow(source, options = {}) {
    const row = { ...source }, failures = [], policy = precisionPolicy(source, options);
    const originals = {}, annotations = [];
    for (const key of ["formula", "substitution", "result", "lookup", "selection", "adopted", "applicability", "reference"]) originals[key] = source[key];
    row.reference = reference(source.reference || "");
    for (const key of ["formula", "substitution", "result", "selection", "adopted"]) {
      if (source[key] === undefined) continue;
      let written = source[key];
      // The shared CHS trace calls its thickness t. In this Monopole view the
      // adopted resistance thickness is t_d, distinct from mass thickness t_nom.
      if (key === "formula" && /-(?:inside|moduli|class)$/.test(source.id || "")) {
        written = written.replace(/(?<![A-Za-z_])t(?![A-Za-z_])/g, "t_d");
        if (written !== source[key]) annotations.push("Circular resistance thickness t is written t_d; original formula retained.");
      }
      if (key === "substitution" && /-polygon$/.test(source.id || "")) {
        written = written.split(";").map(part => {
          if (/^\s*I\s*=/.test(part) && !/mm⁴/.test(part)) return part + " mm⁴";
          if (/^\s*Z_min\s*=/.test(part) && !/mm³/.test(part)) return part + " mm³";
          return part;
        }).join(";");
        if (written !== source[key]) annotations.push("Polygon numerical I and Z_min substitutions show their previously implicit mm⁴ and mm³ units.");
      }
      row[key] = source.result === "Not evaluated"
        || source.id === "pole-thickness" && ["formula", "result", "adopted"].includes(key)
        ? prose(written) : equations(written, policy.format, failures);
    }
    if (source.lookup !== undefined) row.lookup = prose(source.lookup);
    row.applicability = prose(source.applicability || "");
    row.presentation = Object.freeze({
      exact: policy.exact, significantDigits: policy.exact ? 17 : policy.significantDigits,
      rounded: policy.changed(), failures: Object.freeze(failures), original: Object.freeze(originals),
      annotations: Object.freeze(annotations),
      precisionNote: "Displayed operands use up to 10 significant figures; exact operands are retained for boundary or cancellation-sensitive rows. Calculations and comparisons use the original unrounded values."
    });
    return row;
  }

  function presentGroups(groups, options = {}) {
    const result = { ...groups };
    for (const [key, items] of Object.entries(groups)) {
      if (!Array.isArray(items)) continue;
      const stationTitle = /^(.* · z = )([+−\d.e-]+)( m)(?: · ([+−\d.e-]+)( kN·m)| · (Not evaluated))?$/i;
      const coordinates = items.map(item => String(item?.title || "").match(stationTitle))
        .filter(Boolean).map(match => Number(match[2].replace("−", "-")));
      const compact = source => String(Number(Number(source.replace("−", "-")).toPrecision(8)));
      const coordinateExact = coordinates.some((a, i) => coordinates.some((b, j) => i < j && a !== b
        && Math.abs((Number(compact(String(a))) - Number(compact(String(b)))) - (a - b)) > Math.abs(a - b) * 1e-7));
      const title = source => String(source).replace(stationTitle, (all, prefix, z, unit, capacity, momentUnit, unavailable) =>
        prefix + (coordinateExact ? z : compact(z)) + unit + (capacity ? " · " + compact(capacity) + momentUnit : unavailable ? " · " + unavailable : ""));
      result[key] = items.map(item => Array.isArray(item?.rows)
        ? { ...item, title: title(item.title), originalTitle: item.title, rows: item.rows.map(row => presentRow(row, options)) }
        : presentRow(item, options));
    }
    return result;
  }

  return Object.freeze({ presentRow, presentGroups, expression, equations, prose, reference });
});
