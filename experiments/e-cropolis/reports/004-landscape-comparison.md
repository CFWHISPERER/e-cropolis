# E-Cropolis Experiment 004 — Landscape Comparison

**Date:** 11 October 2026
**Status:** Four controlled tests passed

## Objective

Develop and validate a comparison utility capable of distinguishing
changes in raw tile values, tile identifiers, and landscape categories.

## Baseline

The preserved undeveloped landscape generated using seed 20261011.

Dimensions: 120 × 100
Total tiles: 12,000
Tile-ID mask: 0x03ff

## Method

A standalone Python comparison utility was developed using the
landscape categories established in Experiment 001.

The original comparison utility was preserved as
compare-landscapes-v1.py.

All controlled alterations were made to temporary JSON snapshots.
The original baseline snapshots were not modified.

## Results

| Test | Raw changes | ID changes | Category changes |
|---|---:|---:|---:|
| Identical snapshots | 0 | 0 | 0 |
| Upper-bit flag alteration | 1 | 0 | 0 |
| Woodland ID substitution | 1 | 1 | 0 |
| Woodland to bare ground | 1 | 1 | 1 |

All four tests produced the expected results.

The category-transition test reported:

woodland -> bare_ground: 1

Changed tile-array position: 5

## Interpretation

The comparison utility can distinguish three levels of change:

1. Changes to the complete 16-bit tile representation.
2. Changes to the masked tile identifier.
3. Changes between landscape classifications.

These distinctions help prevent changes in simulation representation
from being confused with changes in the classified landscape.

## Limitations

The tests use controlled alterations to stored tile arrays rather
than actual settlement interventions.

Landscape classifications are based on Micropolis tile identifiers,
not direct ecological measurements.

A change in landscape category does not, by itself, establish
ecological improvement or degradation.

The baseline snapshot is preserved separately, but a complete
baseline-versus-working simulation-state architecture has not yet
been implemented.

## Next Steps

- Preserve the comparison utility and experimental documentation.
- Establish explicit baseline and working-state management.
- Compare snapshots following actual simulated interventions.
- Investigate ecological indicators beyond tile classifications.

## Guiding Question

What might people build here if they began by asking what was
already here?
