# E-Cropolis — Experiment 001: Landscape Inventory

**Status:** Initial implementation and live observation completed; exact-state reproducibility pending  
**Project:** E-Cropolis / Project Lichen  
**Observation date:** 10 October 2026 (local session date; system timestamps not independently captured)  
**Source:** Local checkout of `SimHacker/MicropolisCore`, modified with an experimental read-only inventory  
**Suggested repository location:** `experiments/e-cropolis/EXPERIMENT-001-landscape-inventory.md`

## 1. Purpose

Establish a small, auditable method for observing what is represented in a Micropolis landscape **before proposing interventions**. The immediate objective is a census of tile identifiers and a deliberately conservative first-pass classification, not an ecological health assessment.

The experiment supports E-Cropolis's guiding inquiry: *What might people build here if they began by asking what was already here?*

## 2. Environment and source interfaces

The experiment was run locally in the Micropolis browser application (`localhost:5177/play/micropolis`) using a Windows 11 host and WSL Ubuntu development environment. The observed map was an **already developed Micropolis city**, not the proposed fictional Monroe-area E-Cropolis property.

Relevant inspected source files:

- `packages/micropolis-engine/src/map_type.h`: `WORLD_W = 120`, `WORLD_H = 100`; documents column-major map storage.
- `packages/micropolis-engine/src/micropolis.h`: tile identifiers, including water, woodland, rubble, flood and fire ranges.
- `packages/micropolis-engine/src/tool.h`: `LOMASK = 0x03ff`, isolating the lower ten bits used for tile identity.
- `packages/micropolis-engine/src/micropolis.cpp`: `getMapAddress()` returns `mapBase`; `getMapSize()` returns `WORLD_W * WORLD_H * sizeof(short)`.
- `packages/micropolis-engine/src/emscripten.cpp`: exposes the map address and size methods to the browser.
- `apps/micropolis/src/lib/wasm/views.ts`: obtains a `Uint16Array` view over the WASM map memory.
- `apps/micropolis/src/lib/MicropolisView.svelte`: obtains the shared simulator and provides the point at which the inventory was run.

The map contains **120 × 100 = 12,000 tiles**, with **24,000 bytes** of 16-bit tile storage. The inventory iterates over the map values without modifying them. It does not require a C++ engine change.

**Version information still needed:** exact Git commit (`git rev-parse HEAD`), status/diff of local modifications, runtime versions and an archived map state.

## 3. Method

An experimental module, `experiments/e-cropolis/landscape-inventory.mjs`, was created and then copied into `apps/micropolis/src/lib/landscape-inventory.mjs` for import by the Svelte application. Its core steps are:

1. Require a `Uint16Array` containing exactly 12,000 elements.
2. Extract each tile identifier with `rawValue & 0x03ff`.
3. Count each distinct identifier in `tileIds`.
4. Assign a provisional category and count the category totals.
5. Report counts and percentages, rounded independently to two decimal places.

### Initial classification rules

| Category | Tile identifier(s) | Qualification |
|---|---|---|
| `bare_ground` | `0` | `DIRT` / clear tile |
| `water` | `2–20` | Water/river/channel range; tile `1` remains unclassified |
| `woodland` | `21–37`, `40–43` | Tree and woodland variants, not ecological forest classes |
| `ambiguous_woodland` | `38–39` | Listed within a woodland boundary but named `UNUSED_TRASH1/2` |
| `rubble` | `44–47` | Rubble variants |
| `flood` | `48–51` | Flood-related tiles |
| `contamination` | `52` | `RADTILE` |
| `fire` | `56–63` | Fire animation tiles |
| `other_or_unclassified` | All remaining values | Includes roads, buildings, infrastructure and other identifiers not yet classified |

The current rules deliberately do **not** treat every unclassified tile as development. They also do not assign ecological meaning to sprite variations.

## 4. Validation: synthetic map

A Node.js test constructed a 12,000-element `Uint16Array`, initialized to zero, then set five elements:

| Example | Raw value | Expected category |
|---|---|---|
| River | `2` | Water |
| Woodland | `37` | Woodland |
| Flagged tree | `0x8000 \| 21` | Woodland (mask strips upper flag) |
| Ambiguous woodland | `38` | Ambiguous woodland |
| Road | `66` | Other/unclassified |

**Observed synthetic results:**

| Category | Count |
|---|---:|
| Bare ground | 11,995 |
| Water | 1 |
| Woodland | 2 |
| Ambiguous woodland | 1 |
| Other/unclassified | 1 |
| **Total** | **12,000** |

The test printed: **`PASS: 12,000 tiles classified correctly`**. This establishes basic counting, masking and category behavior for the tested examples; it is **not** a comprehensive test of all 1,024 possible tile identifiers or the actual spatial layout.

## 5. Live observation: developed Micropolis city

The inventory ran in the browser when the Micropolis City view initialized. The developer console displayed the landscape inventory and full report, with no experiment error visible in the supplied screenshots.

### Category census

| Category | Count | Share of map |
|---|---:|---:|
| `other_or_unclassified` | 8,833 | 73.61% |
| `woodland` | 3,160 | 26.33% |
| `bare_ground` | 6 | 0.05% |
| `rubble` | 1 | 0.01% |
| **Total** | **12,000** | **100.00%** |

No other categories appeared in the console's nonzero category summary. This means **none were reported by the current classifier in that observation**; it does not prove the rendered scene lacks water-related imagery or ecological water features.

### Twenty most frequent tile identifiers

Transcribed from the browser console screenshot:

| Rank | Tile ID | Count |
|---:|---:|---:|
| 1 | 66 | 677 |
| 2 | 841 | 558 |
| 3 | 43 | 548 |
| 4 | 42 | 537 |
| 5 | 40 | 528 |
| 6 | 41 | 527 |
| 7 | 67 | 520 |
| 8 | 37 | 201 |
| 9 | 98 | 183 |
| 10 | 78 | 142 |
| 11 | 211 | 142 |
| 12 | 77 | 136 |
| 13 | 210 | 132 |
| 14 | 244 | 127 |
| 15 | 99 | 126 |
| 16 | 255 | 120 |
| 17 | 256 | 114 |
| 18 | 252 | 106 |
| 19 | 253 | 105 |
| 20 | 257 | 91 |

Identifiers `40–43` together account for **2,140 tiles**, or **17.83%** of the map. The close frequencies of these woodland sprite variants are an observation to investigate, not evidence of four distinct forest types.

## 6. Interpretation and limitations

**Confirmed:** The browser application can read its WASM-backed map and produce a complete census of 12,000 tile values; the classifier handles upper-bit flags in the synthetic test; the live report identifies substantial frequencies of both woodland-coded and currently unclassified tiles.

**Not yet confirmed:**

- Whether the high woodland share is an accurate characterization of the displayed city's land cover. Sprite/tile semantics and any map-rendering transformations warrant further verification.
- A complete mapping of the remaining tile identifiers into roads, rail, power, buildings, zoning and other land-use categories.
- An exact reproducible city state: the simulation was running, and no fixed map snapshot, random seed or save-state checksum was archived.
- Spatial correctness of coordinate-to-buffer indexing in a tested readout; the inventory so far is an order-independent census.
- Any inference about soil health, hydrology, biodiversity, carbon, regeneration or ecological capability. Micropolis tile classes are **representations**, not field measurements.

The report's percentages are rounded individually; rounding may produce totals slightly different from 100% in other observations.

## 7. Reproducibility record — pending items

To make the *exact live result* independently repeatable, archive the following together:

1. Git commit hash and working-tree diff or committed experiment source.
2. Full JSON inventory, including all `tileIds`, rather than only the top twenty.
3. Identified city/save file or a snapshot of all 12,000 raw tile values, plus a cryptographic checksum.
4. Whether the simulator was paused, the simulation tick/date and the precise capture point.
5. Node/pnpm/browser versions and a command to rerun the synthetic test.
6. A simple automated assertion that category totals sum to 12,000, plus tests for representative tile ranges.

**Do not describe this experiment as an exact-state reproduction until those artifacts exist.** At present it is a successful, documented first observation with a reproducible classification method.

## 8. Proposed next steps

1. **Preserve the baseline:** export the complete live JSON and a fixed raw-map snapshot while paused, along with Git provenance.
2. **Improve semantics:** inspect the engine's full tile enumeration and distinguish infrastructure, zoning and unknown values without speculative ecological labels.
3. **Check spatial indexing:** verify buffer offsets against known `(x, y)` tiles and the renderer.
4. **Compare states:** inventory an undeveloped generated terrain map and a developed city using the same rules and clearly identified save states.
5. **Extend cautiously:** introduce ecological indicators only where their definitions, data sources, uncertainty and validation can be documented.

## 9. Significance for Project Lichen

This experiment separates four levels of knowledge:

- **Representation:** a stored tile identifier and flags.
- **Observation:** a measured frequency in a particular simulated state.
- **Interpretation:** a justified account of what that identifier represents in the modeled landscape.
- **Capability:** what the landscape can actually sustain or regenerate, requiring models and evidence beyond the existing engine.

The inventory is a modest first instrument for asking *what is already here*. Its principal result is not an ecological score, but a verified path from simulation memory to inspectable observations—and a record of what remains unknown.

---

**Evidence basis:** source-code excerpts, terminal outputs, synthetic-test output and browser console screenshots shared during the October 2026 E-Cropolis development session. The complete live JSON, exact source commit and map snapshot were not supplied for this report.
