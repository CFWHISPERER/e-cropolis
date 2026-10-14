# E-Cropolis Experiment 006 — Single-Tile Woodland Intervention

**Date:** 12 October 2026  
**Status:** Snapshot comparison verified  
**Commit:** `d6015e2`  
**Baseline:** `e-cropolis-undeveloped-seed-20261011.json`  
**Intervention snapshot:** `e-cropolis-006-single-tree.json`

## 1. Objective

Determine whether a single woodland-tile intervention can be recorded and distinguished from an otherwise unchanged, reproducible landscape.

The experiment builds upon the fixed-seed landscape generation and comparison methods established in Experiments 003 and 004.

## 2. Experimental method

The preserved baseline represents a 120 × 100 tile landscape generated using seed `20261011`.

A separate snapshot records the proposed single-tile woodland intervention. The baseline and intervention snapshots were compared using the existing `compare-landscapes.py` utility.

The comparison examines three distinct properties:

- Raw 16-bit tile values.
- Tile identifiers after applying the `0x03ff` mask.
- Landscape categories assigned by the experiment's classification rules.

This is a comparison of saved landscape representations, not a measurement of biological growth or ecological function.

## 3. Verified results

The comparison examined all 12,000 tile positions and produced the following results:

| Measurement | Result |
|---|---:|
| Total tiles compared | 12,000 |
| Changed raw tile positions | 1 |
| Changed tile identifiers | 1 |
| Changed landscape categories | 1 |
| Unchanged tile positions | 11,999 |
| Percentage of raw tiles changed | 0.0083% |

The sole change occurred at zero-based array index `5750`.

Because the snapshot uses column-major layout with height 100, this corresponds to coordinates `(57, 50)`.

| Property | Baseline | Intervention |
|---|---|---|
| Raw tile value | `0` | `37` |
| Masked tile identifier | `0` | `37` |
| Classified category | `bare_ground` | `woodland` |

The comparison found no other changes to the stored tile array.

## 4. Reproducibility and verification

The comparison was performed using:

`experiments/e-cropolis/tools/compare-landscapes.py`

The baseline snapshot was:

`experiments/e-cropolis/snapshots/e-cropolis-undeveloped-seed-20261011.json`

The intervention snapshot was:

`experiments/e-cropolis/snapshots/e-cropolis-006-single-tree.json`

The utility reported one raw change, one tile-ID change, and one category change, all at index `5750`.

These results establish a precisely localized change in the saved landscape representation. They do not independently establish the mechanism by which the tile was changed.

## 5. Interpretation

Experiment 006 demonstrates that a single localized change can be recorded within a reproducible landscape while preserving the other 11,999 tile values.

The transition from bare ground (`0`) to woodland (`37`) is unambiguous under the classification rules used by the E-Cropolis landscape comparison utility.

This provides a useful foundation for controlled simulation experiments: a known baseline, a deliberately limited intervention, and an explicit record of the resulting difference.

The experiment establishes representational precision, not ecological effectiveness.

## 6. Limitations

The following distinctions must be preserved:

- A woodland tile is a simulation category, not direct evidence of a living tree.
- The snapshot comparison does not establish biological growth, survival, reproduction, soil improvement, or biodiversity effects.
- The comparison verifies saved tile values, not the complete internal state of the simulation engine.
- The exact procedure used to produce the intervention snapshot is not independently reconstructed by this comparison.
- A single intervention does not establish how the simulated landscape would respond over time.
- The result has not been tested across multiple seeds, locations, or environmental conditions.

These limitations do not invalidate the experiment. They define the boundary of its demonstrated findings.

## 7. Relationship to Experiment 007

Experiment 007 produced a later working-landscape snapshot:

`experiments/e-cropolis/snapshots/e-cropolis-working-1791826750506.json`

A direct comparison of the Experiment 006 and 007 snapshots found zero differences across all 12,000 raw tile values.

The working snapshot was captured using a mechanism that synchronizes a JavaScript map view with the native Micropolis WebAssembly memory region.

Experiment 007 should be documented separately because verifying a subsequent native-memory capture is a distinct experimental objective from recording the original intervention.

## 8. Relevance to E-Cropolis and Project Lichen

The significance of this experiment is methodological.

Before attempting to evaluate ecological consequences, E-Cropolis must be able to identify interventions precisely, preserve unchanged conditions, and distinguish observations from interpretations.

A single woodland tile is a minimal example of that capability.

Future investigations can build upon this foundation by introducing explicit simulation-time controls, repeated observations, and measurable indicators of ecological or regenerative capability.

Such indicators must be defined and validated rather than inferred merely from the presence of a woodland tile.

## 9. Conclusion

Experiment 006 successfully verified a single recorded landscape-category transition at coordinates `(57, 50)`, with all remaining tile values unchanged.

It establishes a reproducible representation-level intervention against a preserved baseline.

It does not establish an ecological outcome.

**Guiding question:** How can a precisely recorded change in a simulated landscape become the beginning of a meaningful investigation into living-system capabilities, rather than an assumption about them?
