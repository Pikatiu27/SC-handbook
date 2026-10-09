/* BOLT-DIM-20261009. Public beta / For Review. */
(function(root){
"use strict";
const data={
  "sources": {
    "hobsonStructural": {
      "name": "Hobson Structural Product Guide",
      "kind": "Catalogue · manufacturer-stated standards",
      "url": "https://content.hobson.com.au/category/structural/hobson-structural-product-guide.pdf",
      "locator": "PDF p.2 / printed p.14 (K0); PDF p.3 / printed p.15 (K2 HR)",
      "checked": "2026-10-09"
    },
    "hobsonK0Install": {
      "name": "Hobson K0 Structural Bolt Installation · 210520TA",
      "kind": "Catalogue installation · preload-table scope differs",
      "url": "https://content.hobson.com.au/category/structural/tech-k0-structural-bolt-installation-210520.pdf",
      "locator": "PDF pp.1–2; Table 2 adds sizes absent from AS 4100:2020 Table 15.2.2.2",
      "checked": "2026-10-09"
    },
    "hobsonK0Example": {
      "name": "Hobson KBHK0GCM240180 · M24 × 180 · K0 class 8.8 HDG",
      "kind": "Catalogue · exact product example",
      "url": "https://www.hobson.com.au/part/KBHK0GCM240180",
      "locator": "Specification, dimensions and linked documents; example only",
      "checked": "2026-10-09"
    },
    "hobsonCertificates": {
      "name": "Hobson test certificates",
      "kind": "Catalogue · batch-document search",
      "url": "https://www.hobson.com.au/testcert",
      "locator": "Search using the supplied packet trace number; no specific lot assessed",
      "checked": "2026-10-09"
    },
    "bremickStructural": {
      "name": "Bremick K0 Structural · 2025 Introductions",
      "kind": "Catalogue · manufacturer-stated standards",
      "url": "https://www.bremick.com.au/wp-content/uploads/2025/03/K0-Structural-2025-Introductions-compressed.pdf",
      "locator": "PDF pp.1–2 / printed pp.2–3: AS/NZS 1252.1/.2:2016 statement and traceability",
      "checked": "2026-10-09"
    },
    "bremickCertificates": {
      "name": "Bremick K0 certificates",
      "kind": "Catalogue · batch-document search",
      "url": "https://www.bremick.com.au/certificates/",
      "locator": "Live browser: search using bolt head number or box job number; no specific lot assessed",
      "checked": "2026-10-09"
    },
    "allfastenersK0": {
      "name": "Allfasteners K0 class 8.8 assembly · 6HCUGAK0",
      "kind": "Catalogue · manufacturer-stated standard",
      "url": "https://www.allfasteners.com.au/k0-structural-bolt-assembly-as1252-2016-cl8-8",
      "locator": "Live product description and SKU list; AS1252:2016 K0 / HDG",
      "checked": "2026-10-09"
    },
    "structural": {
      "name": "AS/NZS 1252.1:2016 · incorporating Amd 1:2018",
      "kind": "Normative",
      "url": "https://www.standards.govt.nz/shop/asnzs-1252-12016",
      "locator": "Cl.1.5–1.6 p.9; Table 2.1 p.17; Figure 3.1 p.25; Table 3.2 p.26; Figure 4.1 p.28",
      "checked": "2026-10-09"
    },
    "holes": {
      "name": "AS 4100:2020 · incorporating Amd 1:2021",
      "kind": "Derived from normative limits",
      "url": "https://store.standards.org.au/product/as-4100-2020",
      "locator": "Cl.14.3.2, pp.174–175",
      "checked": "2026-10-09"
    },
    "ezy": {
      "name": "EzyStrut E14 Heavy Duty U-bolts",
      "kind": "Catalogue",
      "url": "https://www.ezystrut.com.au/assets/Datasheets/Heavy-Duty-U-Bolt-DataSheet.pdf",
      "locator": "PDF p.1 / catalogue p.111, dimensional table",
      "checked": "2026-10-09"
    },
    "hobsonU": {
      "name": "Hobson U-bolts · 230426TD",
      "kind": "Catalogue",
      "url": "https://cdn.hobson.com.au/documents/tech-ubolts-230426.pdf",
      "locator": "PDF p.2, metric round and square kit tables",
      "checked": "2026-10-09"
    },
    "hollo": {
      "name": "Lindapter Hollo-Bolt hexagonal · LindUKJul25",
      "kind": "Catalogue",
      "url": "https://www.lindapter.com/assets/media/lindapter-type-hbhex-datasheet.pdf",
      "locator": "PDF p.1 / catalogue p.46, hexagonal head data",
      "checked": "2026-10-09"
    },
    "holloInstall": {
      "name": "Lindapter HB installation · HB_MAR24",
      "kind": "Catalogue installation",
      "url": "https://www.lindapter.com/assets/media/lindapter-type-hb-installation-guide.pdf",
      "locator": "PDF pp.1–2, metric drilling/preparation and clamping tables",
      "checked": "2026-10-09"
    },
    "hbs": {
      "name": "Hobson HBS Bolt · 200806DS",
      "kind": "Catalogue",
      "url": "https://content.hobson.com.au/category/high-tensile/hsd-hbs-bolt-data-sheet.pdf",
      "locator": "PDF pp.2–3, hole/spacing and dimensions",
      "checked": "2026-10-09"
    },
    "uni": {
      "name": "ICCONS UNI-BOLT · TDS 1053.1 · 2025",
      "kind": "Catalogue",
      "url": "https://www.iccons.com.au/storage/products/1057200020001/ICCONS_TDS_Uni-Bolt_1053.1.pdf",
      "locator": "PDF p.3, galvanised ordering table",
      "checked": "2026-10-09"
    },
    "blind": {
      "name": "Blind Bolt Company · Metric Technical Data · March 2026",
      "kind": "Catalogue",
      "url": "https://www.blindbolt.co.uk/wp-content/uploads/2023/01/Blind-Bolt-Tech-Data-Metric.pdf",
      "locator": "PDF p.1 (ZF/HDG fixing dimensions), p.2 (torque)",
      "checked": "2026-10-09"
    },
    "nexgen": {
      "name": "Allfasteners NexGen2 · 10/07/19",
      "kind": "Catalogue + inch conversion",
      "url": "https://www.allfasteners.com.au/pub/media/ResourceGallery/n/e/nexgen2_tds_allfasteners_.pdf",
      "locator": "PDF p.3 (30 mm hole), p.5 (standard grip), p.17 (bolt lengths)",
      "checked": "2026-10-09"
    },
    "blindWeb": {
      "name": "Blind Bolt Company · current product page",
      "kind": "Catalogue · conflicting fields",
      "url": "https://www.blindbolt.co.uk/the-blind-bolt/",
      "locator": "HDG GBB1690HDG minimum thickness; M14 tightening torque tables",
      "checked": "2026-10-09"
    }
  },
  "structuralDocuments": [
    {
      "manufacturer": "Hobson Engineering",
      "family": "K0 · class 8.8 · HDG",
      "basis": "AS/NZS 1252:2016",
      "documents": [{"source":"hobsonStructural","label":"Product guide","page":2},{"source":"hobsonK0Install","label":"Installation guide"},{"source":"hobsonK0Example","label":"Example M24 × 180"}],
      "certificates": "hobsonCertificates",
      "trace": "Packet trace number"
    },
    {
      "manufacturer": "Bremick",
      "family": "K0 · class 8.8 · HDG",
      "basis": "AS/NZS 1252.1 / .2:2016",
      "documents": [{"source":"bremickStructural","label":"Product guide · 2025"}],
      "certificates": "bremickCertificates",
      "trace": "Bolt head / box job number"
    },
    {
      "manufacturer": "Allfasteners",
      "family": "K0 · class 8.8 · HDG",
      "basis": "AS1252:2016",
      "documents": [{"source":"allfastenersK0","label":"Product range"}],
      "trace": "Request supplied-lot documents"
    }
  ],
  "structural": [
    {
      "id": "M12",
      "d": 12,
      "pitch": 1.75,
      "af": [
        20.16,
        21
      ],
      "head": [
        7.05,
        7.95
      ],
      "nut": [
        12,
        13.1
      ],
      "washerID": [
        14,
        14.43
      ],
      "washerOD": [
        25.7,
        27
      ],
      "washerT": [
        3.1,
        4.6
      ],
      "As": 84.3,
      "nonpreferred": false
    },
    {
      "id": "M16",
      "d": 16,
      "pitch": 2,
      "af": [
        26.16,
        27
      ],
      "head": [
        9.25,
        10.75
      ],
      "nut": [
        16.4,
        17.1
      ],
      "washerID": [
        18,
        18.43
      ],
      "washerOD": [
        32.4,
        34
      ],
      "washerT": [
        3.1,
        4.6
      ],
      "As": 157,
      "nonpreferred": false
    },
    {
      "id": "M20",
      "d": 20,
      "pitch": 2.5,
      "af": [
        31,
        32
      ],
      "head": [
        12.1,
        13.9
      ],
      "nut": [
        20,
        21.3
      ],
      "washerID": [
        21,
        21.33
      ],
      "washerOD": [
        37.4,
        39
      ],
      "washerT": [
        3.1,
        4.6
      ],
      "As": 245,
      "nonpreferred": false
    },
    {
      "id": "M22",
      "d": 22,
      "pitch": 2.5,
      "af": [
        35,
        36
      ],
      "head": [
        13.1,
        14.9
      ],
      "nut": [
        22.3,
        23.6
      ],
      "washerID": [
        24,
        24.52
      ],
      "washerOD": [
        42.4,
        44
      ],
      "washerT": [
        3.4,
        4.6
      ],
      "As": 303,
      "nonpreferred": true
    },
    {
      "id": "M24",
      "d": 24,
      "pitch": 3,
      "af": [
        40,
        41
      ],
      "head": [
        14.1,
        15.9
      ],
      "nut": [
        22.9,
        24.2
      ],
      "washerID": [
        26,
        26.52
      ],
      "washerOD": [
        48.4,
        50
      ],
      "washerT": [
        3.4,
        4.6
      ],
      "As": 353,
      "nonpreferred": false
    },
    {
      "id": "M27",
      "d": 27,
      "pitch": 3,
      "af": [
        45,
        46
      ],
      "head": [
        16.1,
        17.9
      ],
      "nut": [
        26.3,
        27.6
      ],
      "washerID": [
        30,
        30.52
      ],
      "washerOD": [
        54.1,
        56
      ],
      "washerT": [
        3.4,
        4.6
      ],
      "As": 459,
      "nonpreferred": true
    },
    {
      "id": "M30",
      "d": 30,
      "pitch": 3.5,
      "af": [
        49,
        50
      ],
      "head": [
        17.65,
        19.75
      ],
      "nut": [
        29.1,
        30.7
      ],
      "washerID": [
        33,
        33.62
      ],
      "washerOD": [
        58.1,
        60
      ],
      "washerT": [
        3.4,
        4.6
      ],
      "As": 561,
      "nonpreferred": false
    },
    {
      "id": "M36",
      "d": 36,
      "pitch": 4,
      "af": [
        58.8,
        60
      ],
      "head": [
        21.45,
        23.55
      ],
      "nut": [
        35,
        36.6
      ],
      "washerID": [
        39,
        39.62
      ],
      "washerOD": [
        70.1,
        72
      ],
      "washerT": [
        3.4,
        4.6
      ],
      "As": 817,
      "nonpreferred": false
    }
  ],
  "ubolts": [
    {
      "id": "E14-021H",
      "code": "E14-021H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 21,
      "length": 65,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM100021",
      "code": "KURMSGCM100021",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 21,
      "length": 65,
      "threadLength": 40,
      "nominalBore": 15,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-027H",
      "code": "E14-027H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 27,
      "length": 77,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM100027",
      "code": "KURMSGCM100027",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 27,
      "length": 77,
      "threadLength": 50,
      "nominalBore": 20,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-034H",
      "code": "E14-034H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 34,
      "length": 85,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM100034",
      "code": "KURMSGCM100034",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 34,
      "length": 85,
      "threadLength": 50,
      "nominalBore": 25,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-043H",
      "code": "E14-043H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 43,
      "length": 93,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM100043",
      "code": "KURMSGCM100043",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 43,
      "length": 93,
      "threadLength": 50,
      "nominalBore": 32,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-048H",
      "code": "E14-048H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 48,
      "length": 100,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM100048",
      "code": "KURMSGCM100048",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 48,
      "length": 100,
      "threadLength": 50,
      "nominalBore": 40,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-051H",
      "code": "E14-051H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 51,
      "length": 103,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM100051",
      "code": "KURMSGCM100051",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 51,
      "length": 103,
      "threadLength": 50,
      "nominalBore": 40,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-060H",
      "code": "E14-060H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 60,
      "length": 110,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM100060",
      "code": "KURMSGCM100060",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M10",
      "d": 10,
      "width": 60,
      "length": 110,
      "threadLength": 50,
      "nominalBore": 50,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-076H",
      "code": "E14-076H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 76,
      "length": 127,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM120076",
      "code": "KURMSGCM120076",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 76,
      "length": 127,
      "threadLength": 50,
      "nominalBore": 65,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-089H",
      "code": "E14-089H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 89,
      "length": 140,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM120089",
      "code": "KURMSGCM120089",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 89,
      "length": 140,
      "threadLength": 50,
      "nominalBore": 80,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-102H",
      "code": "E14-102H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 102,
      "length": 152,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM120102",
      "code": "KURMSGCM120102",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 102,
      "length": 152,
      "threadLength": 50,
      "nominalBore": 90,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-114H",
      "code": "E14-114H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 114,
      "length": 165,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM120114",
      "code": "KURMSGCM120114",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 114,
      "length": 165,
      "threadLength": 50,
      "nominalBore": 100,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-140H",
      "code": "E14-140H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 140,
      "length": 190,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM120140",
      "code": "KURMSGCM120140",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 140,
      "length": 190,
      "threadLength": 50,
      "nominalBore": 125,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-165H",
      "code": "E14-165H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 165,
      "length": 215,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM120165",
      "code": "KURMSGCM120165",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 165,
      "length": 215,
      "threadLength": 50,
      "nominalBore": 150,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-168H",
      "code": "E14-168H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 168,
      "length": 220,
      "threadLength": 50,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM120168",
      "code": "KURMSGCM120168",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M12",
      "d": 12,
      "width": 168,
      "length": 220,
      "threadLength": 50,
      "nominalBore": 150,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-219H",
      "code": "E14-219H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M16",
      "d": 16,
      "width": 219,
      "length": 295,
      "threadLength": 75,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM160219",
      "code": "KURMSGCM160219",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M16",
      "d": 16,
      "width": 219,
      "length": 295,
      "threadLength": 75,
      "nominalBore": 200,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-273H",
      "code": "E14-273H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M20",
      "d": 20,
      "width": 273,
      "length": 370,
      "threadLength": 100,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM200273",
      "code": "KURMSGCM200273",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M20",
      "d": 20,
      "width": 273,
      "length": 370,
      "threadLength": 100,
      "nominalBore": 250,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-324H",
      "code": "E14-324H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M20",
      "d": 20,
      "width": 324,
      "length": 420,
      "threadLength": 100,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM200324",
      "code": "KURMSGCM200324",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M20",
      "d": 20,
      "width": 324,
      "length": 420,
      "threadLength": 100,
      "nominalBore": 300,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-356H",
      "code": "E14-356H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M20",
      "d": 20,
      "width": 356,
      "length": 455,
      "threadLength": 100,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM200356",
      "code": "KURMSGCM200356",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M20",
      "d": 20,
      "width": 356,
      "length": 455,
      "threadLength": 100,
      "nominalBore": 350,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-406H",
      "code": "E14-406H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M20",
      "d": 20,
      "width": 406,
      "length": 505,
      "threadLength": 100,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM200406",
      "code": "KURMSGCM200406",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M20",
      "d": 20,
      "width": 406,
      "length": 505,
      "threadLength": 100,
      "nominalBore": 400,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-457H",
      "code": "E14-457H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M24",
      "d": 24,
      "width": 457,
      "length": 555,
      "threadLength": 100,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM240457",
      "code": "KURMSGCM240457",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M24",
      "d": 24,
      "width": 457,
      "length": 555,
      "threadLength": 100,
      "nominalBore": 450,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-508H",
      "code": "E14-508H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M24",
      "d": 24,
      "width": 508,
      "length": 605,
      "threadLength": 100,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM240508",
      "code": "KURMSGCM240508",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M24",
      "d": 24,
      "width": 508,
      "length": 605,
      "threadLength": 100,
      "nominalBore": 500,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "E14-610H",
      "code": "E14-610H",
      "manufacturer": "EzyStrut",
      "family": "E14 Heavy Duty",
      "shape": "Round",
      "size": "M24",
      "d": 24,
      "width": 610,
      "length": 710,
      "threadLength": 100,
      "finish": "Hot-dip galvanised",
      "widthSymbol": "D",
      "lengthSymbol": "A",
      "threadSymbol": "B",
      "rodSymbol": "C",
      "source": "ezy",
      "note": "Published inside diameter D. Two hex nuts included. Dimensions do not establish pipe fit or support capacity."
    },
    {
      "id": "KURMSGCM240610",
      "code": "KURMSGCM240610",
      "manufacturer": "Hobson Engineering",
      "family": "Metric round U-bolt kit",
      "shape": "Round",
      "size": "M24",
      "d": 24,
      "width": 610,
      "length": 710,
      "threadLength": 100,
      "nominalBore": 600,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "W is published inside width; nominal bore is a separate pipe designation. Two nuts included. Confirm actual fit and installation with the manufacturer."
    },
    {
      "id": "KUSMSGCM10042086",
      "code": "KUSMSGCM10042086",
      "manufacturer": "Hobson Engineering",
      "family": "Metric square U-bolt kit",
      "shape": "Square",
      "size": "M10",
      "d": 10,
      "width": 42,
      "length": 86,
      "threadLength": 55,
      "finish": "Hot-dip galvanised · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "Square kit; published inside width W. Two nuts included. No pipe-fit or strength check."
    },
    {
      "id": "KUSMSZCM10042086",
      "code": "KUSMSZCM10042086",
      "manufacturer": "Hobson Engineering",
      "family": "Metric square U-bolt kit",
      "shape": "Square",
      "size": "M10",
      "d": 10,
      "width": 42,
      "length": 86,
      "threadLength": 55,
      "finish": "Zinc plated · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "Square kit; published inside width W. Two nuts included. No pipe-fit or strength check."
    },
    {
      "id": "KUSMSZCM10042127",
      "code": "KUSMSZCM10042127",
      "manufacturer": "Hobson Engineering",
      "family": "Metric square U-bolt kit",
      "shape": "Square",
      "size": "M10",
      "d": 10,
      "width": 42,
      "length": 127,
      "threadLength": 55,
      "finish": "Zinc plated · mild steel",
      "widthSymbol": "W",
      "lengthSymbol": "L",
      "threadSymbol": "T",
      "rodSymbol": "A",
      "source": "hobsonU",
      "note": "Square kit; published inside width W. Two nuts included. No pipe-fit or strength check."
    }
  ],
  "blind": [
    {
      "id": "lindapter-hb08-1",
      "code": "HB08-1",
      "size": "M8",
      "d": 8,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 14,
      "grip": [
        3,
        22
      ],
      "torque": 23,
      "length": 45,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 35,
      "collarAF": 19,
      "outerMin": null
    },
    {
      "id": "lindapter-hb08-2",
      "code": "HB08-2",
      "size": "M8",
      "d": 8,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 14,
      "grip": [
        22,
        41
      ],
      "torque": 23,
      "length": 65,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 35,
      "collarAF": 19,
      "outerMin": null
    },
    {
      "id": "lindapter-hb08-3",
      "code": "HB08-3",
      "size": "M8",
      "d": 8,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 14,
      "grip": [
        41,
        60
      ],
      "torque": 23,
      "length": 85,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 35,
      "collarAF": 19,
      "outerMin": null
    },
    {
      "id": "lindapter-hb10-1",
      "code": "HB10-1",
      "size": "M10",
      "d": 10,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 18,
      "grip": [
        3,
        22
      ],
      "torque": 45,
      "length": 49,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 40,
      "collarAF": 24,
      "outerMin": null
    },
    {
      "id": "lindapter-hb10-2",
      "code": "HB10-2",
      "size": "M10",
      "d": 10,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 18,
      "grip": [
        22,
        41
      ],
      "torque": 45,
      "length": 64,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 40,
      "collarAF": 24,
      "outerMin": null
    },
    {
      "id": "lindapter-hb10-3",
      "code": "HB10-3",
      "size": "M10",
      "d": 10,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 18,
      "grip": [
        41,
        60
      ],
      "torque": 45,
      "length": 84,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 40,
      "collarAF": 24,
      "outerMin": null
    },
    {
      "id": "lindapter-hb12-1",
      "code": "HB12-1",
      "size": "M12",
      "d": 12,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 20,
      "grip": [
        3,
        25
      ],
      "torque": 80,
      "length": 53,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 50,
      "collarAF": 30,
      "outerMin": null
    },
    {
      "id": "lindapter-hb12-2",
      "code": "HB12-2",
      "size": "M12",
      "d": 12,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 20,
      "grip": [
        25,
        47
      ],
      "torque": 80,
      "length": 73,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 50,
      "collarAF": 30,
      "outerMin": null
    },
    {
      "id": "lindapter-hb12-3",
      "code": "HB12-3",
      "size": "M12",
      "d": 12,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 20,
      "grip": [
        47,
        69
      ],
      "torque": 80,
      "length": 93,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        1
      ],
      "centres": 50,
      "collarAF": 30,
      "outerMin": null
    },
    {
      "id": "lindapter-hb16-1",
      "code": "HB16-1",
      "size": "M16",
      "d": 16,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 26,
      "grip": [
        12,
        29
      ],
      "torque": 190,
      "length": 67,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        2
      ],
      "centres": 55,
      "collarAF": 36,
      "outerMin": 8
    },
    {
      "id": "lindapter-hb16-2",
      "code": "HB16-2",
      "size": "M16",
      "d": 16,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 26,
      "grip": [
        29,
        50
      ],
      "torque": 190,
      "length": 92,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        2
      ],
      "centres": 55,
      "collarAF": 36,
      "outerMin": 8
    },
    {
      "id": "lindapter-hb16-3",
      "code": "HB16-3",
      "size": "M16",
      "d": 16,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 26,
      "grip": [
        50,
        71
      ],
      "torque": 190,
      "length": 112,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        2
      ],
      "centres": 55,
      "collarAF": 36,
      "outerMin": 8
    },
    {
      "id": "lindapter-hb20-1",
      "code": "HB20-1",
      "size": "M20",
      "d": 20,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 33,
      "grip": [
        12,
        34
      ],
      "torque": 300,
      "length": 80,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        2
      ],
      "centres": 70,
      "collarAF": 46,
      "outerMin": 8
    },
    {
      "id": "lindapter-hb20-2",
      "code": "HB20-2",
      "size": "M20",
      "d": 20,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 33,
      "grip": [
        34,
        60
      ],
      "torque": 300,
      "length": 110,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        2
      ],
      "centres": 70,
      "collarAF": 46,
      "outerMin": 8
    },
    {
      "id": "lindapter-hb20-3",
      "code": "HB20-3",
      "size": "M20",
      "d": 20,
      "manufacturer": "Lindapter",
      "family": "Hollo-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hollo",
      "hole": 33,
      "grip": [
        60,
        86
      ],
      "torque": 300,
      "length": 140,
      "lengthLabel": "Length B (max)",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Metric manufacturer clamping range. ICC-required ply/clamping conditions are separate; do not substitute the metric range for an ICC installation specification. Hole excludes tube corner radius; For HDG finish, drill to the top clearance-hole tolerance per HB_MAR24 p.1.",
      "secondarySource": "holloInstall",
      "holeTolerance": [
        -0.2,
        2
      ],
      "centres": 70,
      "collarAF": 46,
      "outerMin": 8
    },
    {
      "id": "hobson-kbb88ghm080050",
      "code": "KBB88GHM080050",
      "size": "M8",
      "d": 8,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 14,
      "grip": [
        3,
        22
      ],
      "torque": 25,
      "length": 50,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        14,
        15
      ],
      "centres": 35,
      "collarAF": 20,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm080070",
      "code": "KBB88GHM080070",
      "size": "M8",
      "d": 8,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 14,
      "grip": [
        22,
        41
      ],
      "torque": 25,
      "length": 70,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        14,
        15
      ],
      "centres": 35,
      "collarAF": 20,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm080090",
      "code": "KBB88GHM080090",
      "size": "M8",
      "d": 8,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 14,
      "grip": [
        41,
        60
      ],
      "torque": 25,
      "length": 90,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        14,
        15
      ],
      "centres": 35,
      "collarAF": 20,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm100055",
      "code": "KBB88GHM100055",
      "size": "M10",
      "d": 10,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 18,
      "grip": [
        3,
        22
      ],
      "torque": 45,
      "length": 55,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        18,
        19
      ],
      "centres": 40,
      "collarAF": 24,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm100070",
      "code": "KBB88GHM100070",
      "size": "M10",
      "d": 10,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 18,
      "grip": [
        22,
        41
      ],
      "torque": 45,
      "length": 70,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        18,
        19
      ],
      "centres": 40,
      "collarAF": 24,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm100090",
      "code": "KBB88GHM100090",
      "size": "M10",
      "d": 10,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 18,
      "grip": [
        41,
        60
      ],
      "torque": 45,
      "length": 90,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        18,
        19
      ],
      "centres": 40,
      "collarAF": 24,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm120060",
      "code": "KBB88GHM120060",
      "size": "M12",
      "d": 12,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 20,
      "grip": [
        3,
        25
      ],
      "torque": 80,
      "length": 60,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        20,
        21
      ],
      "centres": 50,
      "collarAF": 30,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm120080",
      "code": "KBB88GHM120080",
      "size": "M12",
      "d": 12,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 20,
      "grip": [
        25,
        47
      ],
      "torque": 80,
      "length": 80,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        20,
        21
      ],
      "centres": 50,
      "collarAF": 30,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm120110",
      "code": "KBB88GHM120110",
      "size": "M12",
      "d": 12,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 20,
      "grip": [
        47,
        69
      ],
      "torque": 80,
      "length": 110,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        20,
        21
      ],
      "centres": 50,
      "collarAF": 30,
      "outerMin": 1
    },
    {
      "id": "hobson-kbb88ghm160080",
      "code": "KBB88GHM160080",
      "size": "M16",
      "d": 16,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 26,
      "grip": [
        12,
        29
      ],
      "torque": 190,
      "length": 80,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        26,
        28
      ],
      "centres": 55,
      "collarAF": 36,
      "outerMin": 8
    },
    {
      "id": "hobson-kbb88ghm160100",
      "code": "KBB88GHM160100",
      "size": "M16",
      "d": 16,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 26,
      "grip": [
        29,
        50
      ],
      "torque": 190,
      "length": 100,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        26,
        28
      ],
      "centres": 55,
      "collarAF": 36,
      "outerMin": 8
    },
    {
      "id": "hobson-kbb88ghm160120",
      "code": "KBB88GHM160120",
      "size": "M16",
      "d": 16,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 26,
      "grip": [
        50,
        71
      ],
      "torque": 190,
      "length": 120,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        26,
        28
      ],
      "centres": 55,
      "collarAF": 36,
      "outerMin": 8
    },
    {
      "id": "hobson-kbb88ghm200090",
      "code": "KBB88GHM200090",
      "size": "M20",
      "d": 20,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 33,
      "grip": [
        12,
        34
      ],
      "torque": 300,
      "length": 90,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        33,
        35
      ],
      "centres": 70,
      "collarAF": 46,
      "outerMin": 8
    },
    {
      "id": "hobson-kbb88ghm200120",
      "code": "KBB88GHM200120",
      "size": "M20",
      "d": 20,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 33,
      "grip": [
        34,
        60
      ],
      "torque": 300,
      "length": 120,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        33,
        35
      ],
      "centres": 70,
      "collarAF": 46,
      "outerMin": 8
    },
    {
      "id": "hobson-kbb88ghm200140",
      "code": "KBB88GHM200140",
      "size": "M20",
      "d": 20,
      "manufacturer": "Hobson Engineering",
      "family": "HBS-Bolt",
      "finish": "Hot-dip galvanised",
      "source": "hbs",
      "hole": 33,
      "grip": [
        60,
        86
      ],
      "torque": 300,
      "length": 140,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. For M8–M12 at grip within minimum +2 mm, manufacturer recommends the minimum hole diameter for maximum performance.",
      "holeRange": [
        33,
        35
      ],
      "centres": 70,
      "collarAF": 46,
      "outerMin": 8
    },
    {
      "id": "iccons-unibh-m08050g",
      "code": "UNIBH-M08050G",
      "size": "M8",
      "d": 8,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 14,
      "grip": [
        5,
        26
      ],
      "torque": null,
      "torqueConflict": "ICCONS TDS 1053.1 (2025): ordering table p.3 states 25 Nm; installation/performance table p.4 states 23 Nm. Confirm with ICCONS before installation.",
      "length": 50,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m08070g",
      "code": "UNIBH-M08070G",
      "size": "M8",
      "d": 8,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 14,
      "grip": [
        26,
        46
      ],
      "torque": null,
      "torqueConflict": "ICCONS TDS 1053.1 (2025): ordering table p.3 states 25 Nm; installation/performance table p.4 states 23 Nm. Confirm with ICCONS before installation.",
      "length": 70,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m08090g",
      "code": "UNIBH-M08090G",
      "size": "M8",
      "d": 8,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 14,
      "grip": [
        46,
        66
      ],
      "torque": null,
      "torqueConflict": "ICCONS TDS 1053.1 (2025): ordering table p.3 states 25 Nm; installation/performance table p.4 states 23 Nm. Confirm with ICCONS before installation.",
      "length": 90,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m10050g",
      "code": "UNIBH-M10050G",
      "size": "M10",
      "d": 10,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 18,
      "grip": [
        5,
        22
      ],
      "torque": 45,
      "length": 50,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m10070g",
      "code": "UNIBH-M10070G",
      "size": "M10",
      "d": 10,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 18,
      "grip": [
        22,
        42
      ],
      "torque": 45,
      "length": 70,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m10090g",
      "code": "UNIBH-M10090G",
      "size": "M10",
      "d": 10,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 18,
      "grip": [
        42,
        62
      ],
      "torque": 45,
      "length": 90,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m12055g",
      "code": "UNIBH-M12055G",
      "size": "M12",
      "d": 12,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 20,
      "grip": [
        5,
        25
      ],
      "torque": 80,
      "length": 55,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m12080g",
      "code": "UNIBH-M12080G",
      "size": "M12",
      "d": 12,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 20,
      "grip": [
        23,
        50
      ],
      "torque": 80,
      "length": 80,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m12100g",
      "code": "UNIBH-M12100G",
      "size": "M12",
      "d": 12,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 20,
      "grip": [
        48,
        70
      ],
      "torque": 80,
      "length": 100,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m16075g",
      "code": "UNIBH-M16075G",
      "size": "M16",
      "d": 16,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 26,
      "grip": [
        8,
        35
      ],
      "torque": 190,
      "length": 75,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m16100g",
      "code": "UNIBH-M16100G",
      "size": "M16",
      "d": 16,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 26,
      "grip": [
        35,
        60
      ],
      "torque": 190,
      "length": 100,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m16120g",
      "code": "UNIBH-M16120G",
      "size": "M16",
      "d": 16,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 26,
      "grip": [
        60,
        80
      ],
      "torque": 190,
      "length": 120,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m20100g",
      "code": "UNIBH-M20100G",
      "size": "M20",
      "d": 20,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 33,
      "grip": [
        12,
        43
      ],
      "torque": 300,
      "length": 100,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m20120g",
      "code": "UNIBH-M20120G",
      "size": "M20",
      "d": 20,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 33,
      "grip": [
        43,
        63
      ],
      "torque": 300,
      "length": 120,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "iccons-unibh-m20150g",
      "code": "UNIBH-M20150G",
      "size": "M20",
      "d": 20,
      "manufacturer": "ICCONS",
      "family": "UNI-BOLT",
      "finish": "Hot-dip galvanised",
      "source": "uni",
      "hole": 33,
      "grip": [
        63,
        93
      ],
      "torque": 300,
      "length": 150,
      "lengthLabel": "Set screw length",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip ranges may overlap; no automatic variant recommendation."
    },
    {
      "id": "blindbolt-bb0850zf",
      "code": "BB0850ZF",
      "size": "M8",
      "d": 8,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Zinc flake 1000 hr SSP",
      "source": "blind",
      "hole": 9,
      "grip": [
        9,
        24
      ],
      "torque": 15,
      "length": 50,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 19,
      "depth": 25,
      "centres": 20
    },
    {
      "id": "blindbolt-bb1060zf",
      "code": "BB1060ZF",
      "size": "M10",
      "d": 10,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Zinc flake 1000 hr SSP",
      "source": "blind",
      "hole": 11,
      "grip": [
        10,
        29
      ],
      "torque": 24,
      "length": 60,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 23,
      "depth": 30,
      "centres": 20
    },
    {
      "id": "blindbolt-bb1095zf",
      "code": "BB1095ZF",
      "size": "M10",
      "d": 10,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Zinc flake 1000 hr SSP",
      "source": "blind",
      "hole": 11,
      "grip": [
        25,
        64
      ],
      "torque": 24,
      "length": 95,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 23,
      "depth": 30,
      "centres": 20
    },
    {
      "id": "blindbolt-bb10130zf",
      "code": "BB10130ZF",
      "size": "M10",
      "d": 10,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Zinc flake 1000 hr SSP",
      "source": "blind",
      "hole": 11,
      "grip": [
        55,
        100
      ],
      "torque": 24,
      "length": 130,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 23,
      "depth": 30,
      "centres": 20
    },
    {
      "id": "blindbolt-bb1270zf",
      "code": "BB1270ZF",
      "size": "M12",
      "d": 12,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Zinc flake 1000 hr SSP",
      "source": "blind",
      "hole": 13,
      "grip": [
        12,
        35
      ],
      "torque": 30,
      "length": 70,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 26,
      "depth": 35,
      "centres": 25
    },
    {
      "id": "blindbolt-bb1270hdg",
      "code": "BB1270HDG",
      "size": "M12",
      "d": 12,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 13,
      "grip": [
        12,
        33
      ],
      "torque": 30,
      "length": 70,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 26,
      "depth": 35,
      "centres": 25
    },
    {
      "id": "blindbolt-bb12120hdg",
      "code": "BB12120HDG",
      "size": "M12",
      "d": 12,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 13,
      "grip": [
        30,
        84
      ],
      "torque": 30,
      "length": 120,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 26,
      "depth": 35,
      "centres": 25
    },
    {
      "id": "blindbolt-bb12180hdg",
      "code": "BB12180HDG",
      "size": "M12",
      "d": 12,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 13,
      "grip": [
        80,
        143
      ],
      "torque": 30,
      "length": 180,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 26,
      "depth": 35,
      "centres": 25
    },
    {
      "id": "blindbolt-gbb1475hdg",
      "code": "GBB1475HDG",
      "size": "M14",
      "d": 14,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 15,
      "grip": [
        14,
        35
      ],
      "torque": null,
      "length": 75,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 32,
      "depth": 38,
      "centres": 32,
      "secondarySource": "blindWeb",
      "torqueConflict": "March 2026 PDF: 34 Nm; current manufacturer product page: 40 Nm. Confirm with manufacturer."
    },
    {
      "id": "blindbolt-gbb14125hdg",
      "code": "GBB14125HDG",
      "size": "M14",
      "d": 14,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 15,
      "grip": [
        28,
        82
      ],
      "torque": null,
      "length": 125,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 32,
      "depth": 38,
      "centres": 32,
      "secondarySource": "blindWeb",
      "torqueConflict": "March 2026 PDF: 34 Nm; current manufacturer product page: 40 Nm. Confirm with manufacturer."
    },
    {
      "id": "blindbolt-gbb14185hdg",
      "code": "GBB14185HDG",
      "size": "M14",
      "d": 14,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 15,
      "grip": [
        75,
        142
      ],
      "torque": null,
      "length": 185,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 32,
      "depth": 38,
      "centres": 32,
      "secondarySource": "blindWeb",
      "torqueConflict": "March 2026 PDF: 34 Nm; current manufacturer product page: 40 Nm. Confirm with manufacturer."
    },
    {
      "id": "blindbolt-gbb1690hdg",
      "code": "GBB1690HDG",
      "size": "M16",
      "d": 16,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 17,
      "grip": null,
      "torque": 50,
      "length": 90,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 36,
      "depth": 43,
      "centres": 35,
      "secondarySource": "blindWeb",
      "gripConflict": "March 2026 technical-data PDF states 13 mm minimum; the current manufacturer product page states 16 mm. Confirm the minimum with the manufacturer; no range is adopted here."
    },
    {
      "id": "blindbolt-gbb16130hdg",
      "code": "GBB16130HDG",
      "size": "M16",
      "d": 16,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 17,
      "grip": [
        40,
        75
      ],
      "torque": 50,
      "length": 130,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 36,
      "depth": 43,
      "centres": 35
    },
    {
      "id": "blindbolt-gbb16180hdg",
      "code": "GBB16180HDG",
      "size": "M16",
      "d": 16,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 17,
      "grip": [
        55,
        132
      ],
      "torque": 50,
      "length": 180,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 36,
      "depth": 43,
      "centres": 35
    },
    {
      "id": "blindbolt-gbb20110hdg",
      "code": "GBB20110HDG",
      "size": "M20",
      "d": 20,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 22,
      "grip": [
        21,
        52
      ],
      "torque": 65,
      "length": 110,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 44,
      "depth": 56,
      "centres": 48
    },
    {
      "id": "blindbolt-gbb20140hdg",
      "code": "GBB20140HDG",
      "size": "M20",
      "d": 20,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 22,
      "grip": [
        21,
        82
      ],
      "torque": 65,
      "length": 140,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 44,
      "depth": 56,
      "centres": 48
    },
    {
      "id": "blindbolt-gbb20180hdg",
      "code": "GBB20180HDG",
      "size": "M20",
      "d": 20,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 22,
      "grip": [
        80,
        120
      ],
      "torque": 65,
      "length": 180,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 44,
      "depth": 56,
      "centres": 48
    },
    {
      "id": "blindbolt-gbb20250hdg",
      "code": "GBB20250HDG",
      "size": "M20",
      "d": 20,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 22,
      "grip": [
        130,
        190
      ],
      "torque": 65,
      "length": 250,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 44,
      "depth": 56,
      "centres": 48
    },
    {
      "id": "blindbolt-gbb24130hdg",
      "code": "GBB24130HDG",
      "size": "M24",
      "d": 24,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 26,
      "grip": [
        21,
        62
      ],
      "torque": 75,
      "length": 130,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 53,
      "depth": 64,
      "centres": 60
    },
    {
      "id": "blindbolt-gbb24160hdg",
      "code": "GBB24160HDG",
      "size": "M24",
      "d": 24,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 26,
      "grip": [
        21,
        92
      ],
      "torque": 75,
      "length": 160,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 53,
      "depth": 64,
      "centres": 60
    },
    {
      "id": "blindbolt-gbb30140hdg",
      "code": "GBB30140HDG",
      "size": "M30",
      "d": 30,
      "manufacturer": "Blind Bolt Company",
      "family": "Blind Bolt",
      "finish": "Hot-dip galvanised",
      "source": "blind",
      "hole": 32,
      "grip": [
        27,
        56
      ],
      "torque": 85,
      "length": 140,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup.",
      "clearance": 65,
      "depth": 72,
      "centres": 75
    },
    {
      "id": "allfasteners-2ng2060",
      "code": "2NG2060",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        15.875,
        22.224999999999998
      ],
      "torque": null,
      "length": 60,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        0.625,
        0.875
      ],
      "torqueText": "Tension-control spline"
    },
    {
      "id": "allfasteners-2ng2032",
      "code": "2NG2032",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        15.875,
        34.925
      ],
      "torque": null,
      "length": 75,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        0.625,
        1.375
      ],
      "torqueText": "Tension-control spline"
    },
    {
      "id": "allfasteners-2ng2036",
      "code": "2NG2036",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        23.8125,
        36.512499999999996
      ],
      "torque": null,
      "length": 95,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        0.9375,
        1.4375
      ],
      "torqueText": "Tension-control spline"
    },
    {
      "id": "allfasteners-2ng2048",
      "code": "2NG2048",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        36.512499999999996,
        47.625
      ],
      "torque": null,
      "length": 95,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        1.4375,
        1.875
      ],
      "torqueText": "Tension-control spline"
    },
    {
      "id": "allfasteners-2ng2057",
      "code": "2NG2057",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        47.625,
        53.974999999999994
      ],
      "torque": null,
      "length": 95,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        1.875,
        2.125
      ],
      "torqueText": "Tension-control spline"
    },
    {
      "id": "allfasteners-2ng2068",
      "code": "2NG2068",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        53.974999999999994,
        68.2625
      ],
      "torque": null,
      "length": 135,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        2.125,
        2.6875
      ],
      "torqueText": "Tension-control spline"
    },
    {
      "id": "allfasteners-2ng2096",
      "code": "2NG2096",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        68.2625,
        95.25
      ],
      "torque": null,
      "length": 135,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        2.6875,
        3.75
      ],
      "torqueText": "Tension-control spline"
    },
    {
      "id": "allfasteners-2ng2127",
      "code": "2NG2127",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        95.25,
        130.17499999999998
      ],
      "torque": null,
      "length": 175,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        3.75,
        5.125
      ],
      "torqueText": "Tension-control spline"
    },
    {
      "id": "allfasteners-2ng2212",
      "code": "2NG2212",
      "size": "M20",
      "d": 20,
      "manufacturer": "Allfasteners",
      "family": "NexGen2",
      "finish": "Magni 554 duplex",
      "source": "nexgen",
      "hole": 30,
      "grip": [
        127,
        211.1375
      ],
      "torque": null,
      "length": 250,
      "lengthLabel": "Bolt length L",
      "note": "Catalogue dimensions only. Confirm the exact supplied product and full installation instructions; connected steel and resistance are outside this lookup. Grip in mm is converted from published inches (25.4 mm/in), not a rounded manufacturer metric range. 2NG2060 uses the standard washer configuration; special-order extended grip is excluded. No sleeve length adopted where PDF tables differ.",
      "gripInches": [
        5,
        8.3125
      ],
      "torqueText": "Tension-control spline"
    }
  ]
};
if(typeof module!=="undefined"&&module.exports)module.exports=data;else root.BoltDimensionsData=data;
})(typeof globalThis!=="undefined"?globalThis:this);
