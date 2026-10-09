(function (root) {
  "use strict";
  // AU supplier routes checked separately from the original numerical source.
  // Evidence register: REFERENCE_TRACEABILITY.md, FOUNDATION-AU-20261009.
  const checked = "9 Oct 2026";
  const rock = {
    freyssinet: { url: "https://www.freyssinet.com.au/solution/build/dams-refurbishment/", label: "AU service", scope: "Australian anchor services; confirm exact tendon and assembly." },
    dywidag: { url: "https://dywidag.com/projects/sydney-fish-market", label: "AU project", scope: "Australian strand-anchor project. US Grade 150 rows need separate local acceptance." },
    williams: { url: "https://www.ancorloc.com.au/products/williams/", label: "AU distributor", scope: "AncorLoc Australian distributor; confirm exact Spin-Lock/MCP model and sheet." },
    bbr: { url: "https://www.bbrnetwork.com/downloads/specialist-certificates/", label: "AU directory", scope: "Directory lists SRG Australia through March 2027; exact CMG certificate scope pending." },
    vsl: { url: "https://vsl.com/australia", label: "AU service", scope: "Australian anchor services; obtain project tendon schedule." },
    keller: { url: "https://www.keller.com.au/expertise/techniques/anchors", label: "AU service", scope: "Project-designed bar and strand anchors; no rated SKU schedule." },
    srg: { url: "https://srgglobal.com.au/what-we-do/technology/dam-anchoring-and-monitoring/", label: "AU service", scope: "Australian dam anchors; select exact assembly and protection." },
    sas: { url: "https://www.annahuette.com/wp-content/uploads/jet-form-builder/92318035927aef6da0d49b1ae1807088/2026/01/808011-2026-3.pdf", label: "AU material cert", scope: "ACRS 808011 v3, valid to 31 Dec 2026: threaded bars 26.5–47 / 57–75 mm. Supply traceability and complete assembly need confirmation; 18 mm is outside this scope." }
  };
  const screw = {
    katana: { url: "https://katanafoundations.com.au/technical/", label: "AU library", scope: "CM30096 Rev6 lists 80/100/150/200 kN series. Current guide Rev AC / Catalogue v4 pending; geometry and loads withheld. Other series are historical identities." },
    ideal: { url: "https://www.idealfoundations.com.au/screw-technical-information/", label: "AU library", scope: "Seven selected system SWL rows; confirm exact option and project directions." },
    solidity: { url: "https://www.solidity.com.au/technical/", label: "AU library", scope: "14 selected codes cover drawings SP01–SP14, not every SKU. Ultimate maximum loads; supplier review and lateral testing apply." },
    madewell: { url: "https://www.madewellproducts.com/collections/madewell-screw-piles", label: "AU range", scope: "Two galvanised series; other lengths, finishes and extensions in the shop. Load basis unstated." },
    blade: { url: "https://bladepile.com.au/screw-piles/", label: "AU range", scope: "Supplier ratings; confirm exact geometry, ground and installation." },
    piletech: { url: "https://www.piletech.com.au/screw-piling", label: "AU range", scope: "Project-engineered range; obtain a specific pile schedule." },
    driven: { url: "https://drivenengineering.com.au/product-category/screw-piles/", label: "AU range", scope: "Five selected geometry rows; shop includes more lengths and extensions." },
    keller: { url: "https://www.keller.com/expertise/techniques/helical-screw-piles", label: "Global guide", status: "Global technique", scope: "Global technique benchmark; Australian pile supply and capacity pending." },
    minmetals: { url: "https://minmetals.com.au/screw-piles/", label: "AU page", status: "Testing pending", scope: "Helicast component family. Testing in progress; no verified numerical capacity admitted." },
    surefoot: { url: "https://surefootwa.com.au/", label: "AU range", status: "Product link only", scope: "Driven micro-pile footing alternative. Product identities and official links only; restricted-sheet ratings and geometry removed." },
    stopdigging: { url: "https://stopdigging.com.au/products/product-sheets/", label: "AU sheets", scope: "Four exact models plus SGU / SGS family links. Use the current sheet for each model and ground condition." },
    groundscrews: { url: "https://groundscrews.com.au/products/", label: "AU range", scope: "U / OS / FR / FM / FCA families represented; vineyard product linked in the range. Exact dimensions and capacities by supplier." },
    hpa: { url: "https://helicalpilesaustralia.com.au/technical/", label: "AU library", scope: "Project pathway with official assembly and tieback library; exact assembly data by supplier." }
  };
  const api = { checked, rock, screw };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SCFoundationReview = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
