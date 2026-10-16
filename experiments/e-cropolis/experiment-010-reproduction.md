# E-Cropolis — Experiment 010
## Reproducible Native Engine Evolution

### Purpose

Investigate whether two independently initialized Micropolis
simulation engines produce identical observable results when
given the same random seed, city file, and simulation controls.

### Experimental configuration

- Random seed: 20261011
- Initial city: Haight
- Native engine instances: 2
- Controlled simulation ticks: 32
- Map dimensions: 120 × 100
- Total map tiles: 12,000

### Observed results

Both independently initialized engines produced identical
initial maps across all 12,000 tiles.

Selected simulation state variables were compared after
each of the 32 simulation ticks and remained identical.

After 32 ticks, the final maps were compared across all
12,000 tiles. No differences were detected.

### Scientific limitations

These results demonstrate reproducibility for the tested
configuration only.

They do not establish universal determinism across different
seeds, cities, engine versions, operating systems, or hardware.

They do not establish ecological regeneration or environmental
improvement.

### Building the experimental engine

From the MicropolisCore repository root, run:

```bash
PATH="$PWD/apps/micropolis/node_modules/.bin:$PATH" make -C packages/micropolis-engine all
```

This compiles the modified native engine into
`packages/micropolis-engine/build/`.

Do not run `make install`, because it overwrites engine
artifacts used by the existing Micropolis application.

### Preparing the experimental JavaScript module

From the repository root, run:

```bash
cp packages/micropolis-engine/build/micropolisengine.js apps/micropolis/src/lib/wasm/experimental/micropolisengine.mjs
```

The experimental loader uses this generated ES module
together with the WebAssembly and city-data files
in the engine's build directory.

The generated `.mjs` file is not part of the
Experiment 010 source archive.

### Running the verification tests

Change to the Micropolis application directory:

```bash
cd apps/micropolis
```

Run the experimental engine interface test:

```bash
./node_modules/.bin/vitest run src/lib/wasm/experimental/ECropolisExperimentalEngine.test.ts
```

Run the reproducible evolution test:

```bash
./node_modules/.bin/vitest run src/lib/ECropolisReproducibleEvolution.test.ts
```

### Preservation and provenance

Experiment 010 introduces optional deterministic initialization
in the native Micropolis engine.

When deterministic initialization is disabled, the original
random-seeding pathway remains in use.

The experiment does not modify the preserved undeveloped
E-Cropolis landscape snapshot:

`experiments/e-cropolis/snapshots/e-cropolis-undeveloped-seed-20261011.json`

Generated build artifacts are distinguished from experimental
source code and recorded observations.
