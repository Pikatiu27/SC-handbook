from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
from matplotlib.patches import Circle, FancyArrowPatch, Rectangle


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "generated"
ARCHIVE_DIR = ROOT / "archive" / "generated"

INK = "#202825"
MUTED = "#5b6862"
FILL = "#edf2f0"
LINE = 1.5
LABEL_SIZE = 15.5
TITLE_SIZE = 15.5


def setup_axis(ax):
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.set_aspect("equal", adjustable="box")
    ax.axis("off")


def arrow(ax, start, end, *, style="->", linewidth=LINE, mutation_scale=10):
    patch = FancyArrowPatch(
        start,
        end,
        arrowstyle=style,
        mutation_scale=mutation_scale,
        linewidth=linewidth,
        color=INK,
        shrinkA=0,
        shrinkB=0,
    )
    ax.add_patch(patch)
    return patch


def label(ax, x, y, text, *, ha="center", va="center", size=LABEL_SIZE, weight="semibold", color=INK):
    ax.text(x, y, text, ha=ha, va=va, fontsize=size, fontweight=weight, color=color)


def panel_title(ax, text, *, y=-0.04):
    label(ax, 0.5, y, text, va="bottom", size=TITLE_SIZE, weight="bold")


def draw_cross_section(ax):
    setup_axis(ax)
    x0, x1 = 0.34, 0.70
    y0, y1 = 0.15, 0.88
    y_na = 0.68
    y_steel = 0.23

    ax.add_patch(Rectangle((x0, y0), x1 - x0, y1 - y0, facecolor="white", edgecolor=INK, linewidth=LINE))
    ax.add_patch(
        Rectangle(
            (x0, y_na),
            x1 - x0,
            y1 - y_na,
            facecolor=FILL,
            edgecolor=INK,
            linewidth=LINE,
            hatch="///",
        )
    )
    ax.plot([x0, x1], [y_na, y_na], color=INK, linewidth=1.05, linestyle=(0, (5, 4)))

    for x_bar in (0.42, 0.52, 0.62):
        ax.add_patch(Circle((x_bar, y_steel), 0.018, facecolor=INK, edgecolor=INK))

    label(ax, 0.52, y_na - 0.045, "N.A.", va="top", weight="bold")
    label(ax, 0.52, y_steel + 0.055, r"$A_s$", weight="bold")

    arrow(ax, (0.18, y0), (0.18, y1), style="<->")
    label(ax, 0.135, (y0 + y1) / 2, r"$D$")
    arrow(ax, (0.26, y_steel), (0.26, y1), style="<->")
    label(ax, 0.225, (y_steel + y1) / 2, r"$d$")
    arrow(ax, (x0, 0.115), (x1, 0.115), style="<->")
    label(ax, (x0 + x1) / 2, 0.065, r"$b$")

    panel_title(ax, "(a) Cross-section")


def draw_strain(ax):
    setup_axis(ax)
    x_zero = 0.51
    y_top = 0.88
    y_na = 0.68
    y_steel = 0.23
    x_top = 0.64
    x_steel = 0.22

    ax.plot([x_zero, x_zero], [y_steel, y_top], color=MUTED, linewidth=1.0)
    ax.plot([x_steel, x_top], [y_steel, y_top], color=INK, linewidth=LINE)
    ax.plot([0.12, 0.90], [y_na, y_na], color=INK, linewidth=1.0, linestyle=(0, (5, 4)))

    arrow(ax, (x_zero, 0.94), (x_top, 0.94), style="<->")
    label(ax, (x_zero + x_top) / 2, 0.975, r"$\varepsilon_{cu}=0.003$", va="bottom")
    arrow(ax, (0.37, y_na), (0.37, y_top), style="<->")
    label(ax, 0.325, (y_na + y_top) / 2, r"$x$")
    label(ax, x_steel, y_steel - 0.05, r"$\varepsilon_s$", va="top")
    label(ax, x_zero + 0.025, y_na - 0.025, "0", ha="left", va="top", color=MUTED)

    panel_title(ax, "(b) Strain distribution")


def draw_stress_block(ax):
    setup_axis(ax)
    x_axis = 0.38
    x_block = 0.60
    y_top = 0.88
    y_block = 0.72
    y_cc = (y_top + y_block) / 2
    y_na = 0.68
    y_steel = 0.23

    ax.plot([x_axis, x_axis], [y_steel, y_top], color=INK, linewidth=LINE)
    ax.add_patch(
        Rectangle(
            (x_axis, y_block),
            x_block - x_axis,
            y_top - y_block,
            facecolor=FILL,
            edgecolor=INK,
            linewidth=LINE,
        )
    )
    for y in (0.745, 0.775, 0.805, 0.835, 0.865):
        ax.plot([x_axis, x_block], [y, y], color=MUTED, linewidth=0.7)
    ax.plot([0.10, 0.96], [y_na, y_na], color=INK, linewidth=1.0, linestyle=(0, (5, 4)))

    arrow(ax, (x_axis, 0.94), (x_block, 0.94), style="<->")
    label(ax, (x_axis + x_block) / 2, 0.975, r"$\alpha_2 f'_c$", va="bottom")

    arrow(ax, (0.18, y_block), (0.18, y_top), style="<->")
    label(ax, 0.135, (y_block + y_top) / 2, r"$a=\gamma x$", ha="right")
    arrow(ax, (0.31, y_cc), (0.31, y_top), style="<->", mutation_scale=8)
    label(ax, 0.28, (y_cc + y_top) / 2, r"$a/2$", ha="right", size=14.0)

    arrow(ax, (x_block, y_cc), (0.90, y_cc), style="->", mutation_scale=11)
    label(ax, 0.925, y_cc, r"$C_c$", ha="left", weight="bold")
    label(ax, 0.93, y_na - 0.02, "N.A.", ha="right", va="top", color=MUTED)

    arrow(ax, (x_axis, y_steel), (0.77, y_steel), style="->", mutation_scale=11)
    label(ax, 0.80, y_steel, r"$T=A_s f_s$", ha="left")

    panel_title(ax, "(c) Equivalent stress block")


def make_figure(layout):
    if layout == "horizontal":
        fig, axes = plt.subplots(1, 3, figsize=(12.6, 4.15), gridspec_kw={"wspace": 0.22})
    else:
        fig, axes = plt.subplots(3, 1, figsize=(4.4, 10.6), gridspec_kw={"hspace": 0.18})

    draw_cross_section(axes[0])
    draw_strain(axes[1])
    draw_stress_block(axes[2])
    fig.patch.set_facecolor("white")
    fig.subplots_adjust(left=0.025, right=0.975, top=0.975, bottom=0.075)
    return fig


def normalise_svg(path):
    content = path.read_text(encoding="utf-8")
    path.write_text("\n".join(line.rstrip() for line in content.splitlines()) + "\n", encoding="utf-8")


def main():
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)

    plt.rcParams.update(
        {
            "font.family": "DejaVu Sans",
            "mathtext.fontset": "dejavusans",
            "svg.fonttype": "none",
            "axes.unicode_minus": False,
        }
    )

    horizontal = make_figure("horizontal")
    horizontal_svg = ASSET_DIR / "concrete-pad-publication-style.svg"
    horizontal.savefig(
        horizontal_svg,
        format="svg",
        metadata={"Title": "Concrete section strain and equivalent stress-block notation"},
    )
    normalise_svg(horizontal_svg)
    horizontal.savefig(ARCHIVE_DIR / "concrete-pad-publication-style.png", dpi=180, facecolor="white")
    horizontal.savefig(
        ARCHIVE_DIR / "concrete-pad-publication-style.jpg",
        dpi=180,
        facecolor="white",
        pil_kwargs={"quality": 92, "optimize": True},
    )
    plt.close(horizontal)

    mobile = make_figure("vertical")
    mobile_svg = ASSET_DIR / "concrete-pad-publication-style-mobile.svg"
    mobile.savefig(
        mobile_svg,
        format="svg",
        metadata={"Title": "Mobile concrete section strain and equivalent stress-block notation"},
    )
    normalise_svg(mobile_svg)
    plt.close(mobile)

    print("Generated concrete pad section-analysis figures")


if __name__ == "__main__":
    main()
