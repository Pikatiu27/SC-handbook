from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "generated"


STYLE = """
  .panel { fill: #fbfdff; }
  .section { fill: #eef4f2; stroke: #25312d; stroke-width: 2.2; stroke-linejoin: round; }
  .guide { fill: none; stroke: #9aa6a0; stroke-width: 1; }
  .dim { fill: none; stroke: #2f3840; stroke-width: 1.35; }
  .arrow { fill: #2f3840; stroke: none; }
  .axis { fill: none; stroke: #697870; stroke-width: 1; stroke-dasharray: 14 4 3 4; }
  .dim-label { font: 700 14px Aptos, Calibri, Arial, sans-serif; fill: #25312d; }
  .axis-label { font: 700 13px Aptos, Calibri, Arial, sans-serif; fill: #52625a; }
""".strip()


def arrow_up(x, y):
    return f'<path class="arrow" d="M {x} {y} L {x - 3.5} {y + 7} L {x + 3.5} {y + 7} Z" />'


def arrow_down(x, y):
    return f'<path class="arrow" d="M {x} {y} L {x - 3.5} {y - 7} L {x + 3.5} {y - 7} Z" />'


def arrow_left(x, y):
    return f'<path class="arrow" d="M {x} {y} L {x + 7} {y - 3.5} L {x + 7} {y + 3.5} Z" />'


def arrow_right(x, y):
    return f'<path class="arrow" d="M {x} {y} L {x - 7} {y - 3.5} L {x - 7} {y + 3.5} Z" />'


def section_path(cx, y0, depth, flange_width, flange_thickness, web_thickness):
    y1 = y0 + depth
    x0 = cx - flange_width / 2
    x1 = cx + flange_width / 2
    wx0 = cx - web_thickness / 2
    wx1 = cx + web_thickness / 2
    yt = y0 + flange_thickness
    yb = y1 - flange_thickness
    points = [
        (x0, y0), (x1, y0), (x1, yt), (wx1, yt), (wx1, yb),
        (x1, yb), (x1, y1), (x0, y1), (x0, yb), (wx0, yb),
        (wx0, yt), (x0, yt)
    ]
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in points)


def make_svg(title, desc, y0, depth, flange_width, flange_thickness, web_thickness):
    cx = 180
    y1 = y0 + depth
    x0 = cx - flange_width / 2
    x1 = cx + flange_width / 2
    wx0 = cx - web_thickness / 2
    wx1 = cx + web_thickness / 2
    y_mid = (y0 + y1) / 2
    x_dim = x0 - 38
    y_bf = y0 - 30
    y_tw = y0 + flange_thickness + 30
    x_tf = x1 + 29
    axis_x0 = x0 - 26
    axis_x1 = x1 + 26
    axis_y0 = y0 - 10
    axis_y1 = y1 + 10

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="360" height="240" viewBox="0 0 360 240" role="img" aria-labelledby="title desc">
  <title id="title">{title}</title>
  <desc id="desc">{desc}</desc>
  <defs>
    <style>
{STYLE}
    </style>
  </defs>
  <rect class="panel" x="0" y="0" width="360" height="240" rx="14" />

  <polygon class="section" points="{section_path(cx, y0, depth, flange_width, flange_thickness, web_thickness)}" />

  <line class="axis" x1="{axis_x0:.1f}" y1="{y_mid:.1f}" x2="{axis_x1:.1f}" y2="{y_mid:.1f}" />
  <line class="axis" x1="{cx:.1f}" y1="{axis_y0:.1f}" x2="{cx:.1f}" y2="{axis_y1:.1f}" />
  <text class="axis-label" x="{axis_x0 - 9:.1f}" y="{y_mid + 5:.1f}" text-anchor="middle">x</text>
  <text class="axis-label" x="{axis_x1 + 9:.1f}" y="{y_mid + 5:.1f}" text-anchor="middle">x</text>
  <text class="axis-label" x="{cx:.1f}" y="{axis_y0 - 7:.1f}" text-anchor="middle">y</text>
  <text class="axis-label" x="{cx:.1f}" y="{axis_y1 + 17:.1f}" text-anchor="middle">y</text>

  <line class="dim" x1="{x_dim:.1f}" y1="{y0:.1f}" x2="{x_dim:.1f}" y2="{y1:.1f}" />
  {arrow_up(x_dim, y0)}
  {arrow_down(x_dim, y1)}
  <line class="guide" x1="{x0 - 5:.1f}" y1="{y0:.1f}" x2="{x_dim - 8:.1f}" y2="{y0:.1f}" />
  <line class="guide" x1="{x0 - 5:.1f}" y1="{y1:.1f}" x2="{x_dim - 8:.1f}" y2="{y1:.1f}" />
  <text class="dim-label" x="{x_dim - 14:.1f}" y="{y_mid + 5:.1f}" text-anchor="middle">d</text>

  <line class="dim" x1="{x0:.1f}" y1="{y_bf:.1f}" x2="{x1:.1f}" y2="{y_bf:.1f}" />
  {arrow_left(x0, y_bf)}
  {arrow_right(x1, y_bf)}
  <line class="guide" x1="{x0:.1f}" y1="{y0 - 4:.1f}" x2="{x0:.1f}" y2="{y_bf - 6:.1f}" />
  <line class="guide" x1="{x1:.1f}" y1="{y0 - 4:.1f}" x2="{x1:.1f}" y2="{y_bf - 6:.1f}" />
  <text class="dim-label" x="{cx:.1f}" y="{y_bf - 8:.1f}" text-anchor="middle">bf</text>

  <line class="dim" x1="{wx0:.1f}" y1="{y_tw:.1f}" x2="{wx1:.1f}" y2="{y_tw:.1f}" />
  {arrow_left(wx0, y_tw)}
  {arrow_right(wx1, y_tw)}
  <line class="guide" x1="{wx0:.1f}" y1="{y0 + flange_thickness + 6:.1f}" x2="{wx0:.1f}" y2="{y_tw + 8:.1f}" />
  <line class="guide" x1="{wx1:.1f}" y1="{y0 + flange_thickness + 6:.1f}" x2="{wx1:.1f}" y2="{y_tw + 8:.1f}" />
  <text class="dim-label" x="{wx1 + 14:.1f}" y="{y_tw + 5:.1f}">tw</text>

  <line class="dim" x1="{x_tf:.1f}" y1="{y0:.1f}" x2="{x_tf:.1f}" y2="{y0 + flange_thickness:.1f}" />
  {arrow_up(x_tf, y0)}
  {arrow_down(x_tf, y0 + flange_thickness)}
  <line class="guide" x1="{x1 + 5:.1f}" y1="{y0:.1f}" x2="{x_tf + 8:.1f}" y2="{y0:.1f}" />
  <line class="guide" x1="{x1 + 5:.1f}" y1="{y0 + flange_thickness:.1f}" x2="{x_tf + 8:.1f}" y2="{y0 + flange_thickness:.1f}" />
  <text class="dim-label" x="{x_tf + 13:.1f}" y="{y0 + flange_thickness / 2 + 5:.1f}">tf</text>
</svg>
"""


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    files = {
        "beam-section-ub.svg": make_svg(
            "UB section guide",
            "Symbolic Universal Beam section guide generated for SC Handbook; not a source of numeric section properties.",
            y0=66,
            depth=136,
            flange_width=122,
            flange_thickness=20,
            web_thickness=24,
        ),
        "beam-section-uc.svg": make_svg(
            "UC section guide",
            "Symbolic Universal Column section guide generated for SC Handbook; not a source of numeric section properties.",
            y0=70,
            depth=124,
            flange_width=154,
            flange_thickness=24,
            web_thickness=32,
        ),
    }
    for name, svg in files.items():
        (OUT_DIR / name).write_text(svg, encoding="utf-8")
        print(f"wrote {OUT_DIR / name}")


if __name__ == "__main__":
    main()
