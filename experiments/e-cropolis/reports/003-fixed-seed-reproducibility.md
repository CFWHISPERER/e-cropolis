# E-Cropolis Experiment 003 — Fixed-Seed Landscape Reproducibility

**Date:** 11 October 2026  
**Seed:** `20261011`  
**Status:** PASS — exact tile-array reproducibility

## Objective

Determine whether the Micropolis terrain generator produces identical recorded landscapes when invoked repeatedly using the same seed.

## Method

1. Expose the C++ `generateSomeCity(seed)` function through the WebAssembly interface.
2. Provide an explicitly invoked browser command, with confirmation before replacing the existing city.
3. Generate an undeveloped landscape using seed `20261011`.
4. Capture the complete 120 × 100 map as a JSON snapshot.
5. Repeat generation using the same seed.
6. Compare all 12,000 raw tile values in their original array order.

## Landscape inventory

| Classification | Tiles | Percentage |
|---|---:|---:|
| Bare ground | 4,460 | 37.17% |
| Water | 3,482 | 29.02% |
| Woodland | 4,058 | 33.82% |
| **Total** | **12,000** | **100%** |

Percentages are rounded.

## Reproducibility results

- First snapshot: 12,000 tiles
- Second snapshot: 12,000 tiles
- Seed in both snapshots: `20261011`
- Differing tile positions: **0**
- Exact raw tile matches: **12,000 / 12,000**

**Result: PASS**

Both generated landscapes produced identical recorded raw tile arrays under the tested configuration.

## Preserved evidence

- `snapshots/e-cropolis-undeveloped-seed-20261011.json`
- `snapshots/e-cropolis-undeveloped-seed-20261011-run2.json`

Both files were independently downloaded and subsequently preserved. The second archived copy was verified against its downloaded original using `cmp`.

## Limitations

This test demonstrates repeatability for one seed in the current running engine configuration. It does not establish reproducibility across platforms, engine versions, or terrain-generation settings.

The snapshot records tile values, not complete ecological conditions. Soil properties, elevation, hydrological processes, habitat quality, and ecosystem dynamics are not measured by this inventory.

## Relevance to E-Cropolis

A reproducible starting landscape enables controlled comparisons between different settlement strategies.

Future experiments can begin from the same terrain and investigate how alternative land-use decisions affect simulated resources, infrastructure, and ecological indicators.

The guiding inquiry remains:

*What might people build here if they began by asking what was already here?*
