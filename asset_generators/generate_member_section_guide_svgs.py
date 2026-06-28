from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "generated"


STYLE = """
  .panel { fill: #fbfdff; }
  .section { fill: #eef8ff; stroke: #263732; stroke-width: 2.4; stroke-linejoin: round; }
  .void { fill: #fbfdff; stroke: #263732; stroke-width: 2.4; }
  .guide { fill: none; stroke: #9aa9a3; stroke-width: 1.2; }
  .dim { fill: none; stroke: #58736b; stroke-width: 1.55; marker-start: url(#arrow); marker-end: url(#arrow); }
  .leader { fill: none; stroke: #58736b; stroke-width: 1.35; marker-end: url(#arrow); }
  .centre { fill: none; stroke: #9aa9a3; stroke-width: 1.1; stroke-dasharray: 5 5; }
  .label { font: 800 16px Aptos, Calibri, Arial, sans-serif; fill: #24352f; }
  .dim-label { font: 800 15px Aptos, Calibri, Arial, sans-serif; fill: #425c55; }
  .caption { font: 800 14px Aptos, Calibri, Arial, sans-serif; fill: #547067; letter-spacing: .02em; }
  .note { font: 600 11px Aptos, Calibri, Arial, sans-serif; fill: #78908a; }
"""


def sub_label(main: str, sub: str | None = None) -> str:
    if not sub:
        return main
    return f'{main}<tspan baseline-shift="sub" font-size="10">{sub}</tspan>'


def text(x: float, y: float, content: str, cls: str = "dim-label", anchor: str = "middle") -> str:
    return f'<text x="{x}" y="{y}" class="{cls}" text-anchor="{anchor}">{content}</text>'


def line(x1: float, y1: float, x2: float, y2: float, cls: str = "guide") -> str:
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" class="{cls}" />'


def svg_doc(title: str, body: str) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="360" height="240" viewBox="0 0 360 240" role="img" aria-labelledby="title desc">
  <title id="title">{title}</title>
  <desc id="desc">Dimension-labelled steel section guide generated for SC Handbook.</desc>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 8 4 L 0 8 z" fill="#58736b" />
    </marker>
    <style>{STYLE}</style>
  </defs>
  <rect class="panel" x="0" y="0" width="360" height="240" rx="14" />
{body}
</svg>
"""


def chs() -> str:
    cx, cy, ro, ri = 142, 108, 66, 43
    body = f"""
  {text(24, 30, "CHS", "caption", "start")}
  <circle cx="{cx}" cy="{cy}" r="{ro}" class="section" />
  <circle cx="{cx}" cy="{cy}" r="{ri}" class="void" />
  {line(cx - ro - 18, cy, cx + ro + 18, cy, "centre")}
  {line(cx, cy - ro - 18, cx, cy + ro + 18, "centre")}
  {line(cx - ro, cy + 88, cx + ro, cy + 88, "dim")}
  {line(cx - ro, cy + ro + 6, cx - ro, cy + 96)}
  {line(cx + ro, cy + ro + 6, cx + ro, cy + 96)}
  {text(cx, cy + 112, "D")}
  {line(cx + ri, cy - 3, cx + ro, cy - 3, "dim")}
  {text(cx + 55, cy - 14, "t")}
  {text(24, 214, "Catalogue notation: D = outside diameter, t = wall thickness", "note", "start")}
"""
    return svg_doc("CHS section guide", body)


def equal_angle() -> str:
    x, y, leg, thk = 86, 54, 150, 34
    body = f"""
  {text(24, 30, "Equal Angle", "caption", "start")}
  <path class="section" d="M {x} {y} L {x + leg} {y} L {x + leg} {y + thk} L {x + thk + 16} {y + thk} Q {x + thk} {y + thk} {x + thk} {y + thk + 16} L {x + thk} {y + leg} L {x} {y + leg} Z" />
  <path class="guide" d="M {x + thk + 16} {y + thk} Q {x + thk} {y + thk} {x + thk} {y + thk + 16}" />
  {line(x, y - 20, x + leg, y - 20, "dim")}
  {line(x, y - 6, x, y - 28)}
  {line(x + leg, y - 6, x + leg, y - 28)}
  {text(x + leg / 2, y - 30, "b")}
  {line(x - 22, y, x - 22, y + leg, "dim")}
  {line(x - 6, y, x - 30, y)}
  {line(x - 6, y + leg, x - 30, y + leg)}
  {text(x - 40, y + leg / 2 + 5, "b", "dim-label", "middle")}
  {line(x + leg + 20, y, x + leg + 20, y + thk, "dim")}
  {line(x + leg + 6, y, x + leg + 28, y)}
  {line(x + leg + 6, y + thk, x + leg + 28, y + thk)}
  {text(x + leg + 34, y + thk / 2 + 5, "t", "dim-label", "start")}
  <path class="leader" d="M {x + thk + 49} {y + thk + 45} L {x + thk + 13} {y + thk + 13}" />
  {text(x + thk + 58, y + thk + 52, "r", "dim-label", "start")}
  {text(24, 214, "Catalogue notation: b = leg length, t = thickness, r = root radius", "note", "start")}
"""
    return svg_doc("Equal angle section guide", body)


def pfc() -> str:
    x, y, d, bf, tw, tf = 92, 48, 148, 132, 30, 26
    body = f"""
  {text(24, 30, "PFC", "caption", "start")}
  <path class="section" d="M {x} {y} L {x + bf} {y} L {x + bf} {y + tf} L {x + tw + 12} {y + tf} Q {x + tw} {y + tf} {x + tw} {y + tf + 12} L {x + tw} {y + d - tf - 12} Q {x + tw} {y + d - tf} {x + tw + 12} {y + d - tf} L {x + bf} {y + d - tf} L {x + bf} {y + d} L {x} {y + d} Z" />
  <path class="guide" d="M {x + tw + 12} {y + tf} Q {x + tw} {y + tf} {x + tw} {y + tf + 12}" />
  <path class="guide" d="M {x + tw} {y + d - tf - 12} Q {x + tw} {y + d - tf} {x + tw + 12} {y + d - tf}" />
  {line(x - 24, y, x - 24, y + d, "dim")}
  {line(x - 8, y, x - 32, y)}
  {line(x - 8, y + d, x - 32, y + d)}
  {text(x - 42, y + d / 2 + 5, "d")}
  {line(x, y - 20, x + bf, y - 20, "dim")}
  {line(x, y - 6, x, y - 28)}
  {line(x + bf, y - 6, x + bf, y - 28)}
  {text(x + bf / 2, y - 31, sub_label("b", "f"))}
  {line(x, y + d + 20, x + tw, y + d + 20, "dim")}
  {line(x, y + d + 6, x, y + d + 28)}
  {line(x + tw, y + d + 6, x + tw, y + d + 28)}
  {text(x + tw / 2, y + d + 42, sub_label("t", "w"))}
  {line(x + bf + 18, y, x + bf + 18, y + tf, "dim")}
  {line(x + bf + 6, y, x + bf + 26, y)}
  {line(x + bf + 6, y + tf, x + bf + 26, y + tf)}
  {text(x + bf + 32, y + tf / 2 + 5, sub_label("t", "f"), "dim-label", "start")}
  <path class="leader" d="M {x + tw + 60} {y + tf + 48} L {x + tw + 10} {y + tf + 10}" />
  {text(x + tw + 69, y + tf + 55, "r", "dim-label", "start")}
  {text(24, 214, "Catalogue notation: d, b_f, t_w, t_f and root radius r", "note", "start")}
"""
    return svg_doc("PFC section guide", body)


def rod() -> str:
    cx, cy, r = 144, 108, 60
    body = f"""
  {text(24, 30, "Round Bar / Rod", "caption", "start")}
  <circle cx="{cx}" cy="{cy}" r="{r}" class="section" />
  {line(cx - r - 18, cy, cx + r + 18, cy, "centre")}
  {line(cx, cy - r - 18, cx, cy + r + 18, "centre")}
  {line(cx - r, cy, cx + r, cy, "dim")}
  {text(cx, cy - 14, "d")}
  {line(cx - r, cy + 74, cx + r, cy + 74, "dim")}
  {line(cx - r, cy + r + 6, cx - r, cy + 82)}
  {line(cx + r, cy + r + 6, cx + r, cy + 82)}
  {text(cx, cy + 98, "diameter")}
  {text(24, 214, "Catalogue notation: d = nominal round-bar diameter", "note", "start")}
"""
    return svg_doc("Round bar section guide", body)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    files = {
        "member-section-chs.svg": chs(),
        "member-section-equal-angle.svg": equal_angle(),
        "member-section-pfc.svg": pfc(),
        "member-section-rod.svg": rod(),
    }
    for name, content in files.items():
        (OUT / name).write_text(content, encoding="utf-8", newline="\n")
        print(f"wrote {OUT / name}")


if __name__ == "__main__":
    main()
