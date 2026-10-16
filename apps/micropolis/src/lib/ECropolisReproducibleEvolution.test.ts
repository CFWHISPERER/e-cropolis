import { describe, it, expect } from 'vitest';
import { loadMicropolisMainModule } from './wasm/experimental/node';
import { createMapMopViews } from './wasm/views';
import { micropolisReactive } from './MicropolisReactive.svelte';

describe('E-Cropolis-010: reproducible state evolution', () => {
    it('compares two independently initialized engines', async () => {
        const engine = await loadMicropolisMainModule();

        const cityA = new engine.Micropolis();
        const cityB = new engine.Micropolis();

        const callbackA = new engine.JSCallback(
            micropolisReactive.engineCallback
        );
        const callbackB = new engine.JSCallback(
            micropolisReactive.engineCallback
        );

        const seed = 20261011;
        const steps = 32;

        const initialize = (city: typeof cityA, callback: typeof callbackA) => {
            city.setCallback(callback, {});
            createMapMopViews(engine, city);
            city.deterministicSeedEnabled = true;
            city.deterministicSeed = seed;
            city.init();


            city.loadCity('/cities/haight.cty');
            city.simSpeed = 3;
            city.simPasses = 1;
           city.heatSteps = 0;
        };

        const observe = (city: typeof cityA) => ({
            phaseCycle: city.phaseCycle,
            simCycle: city.simCycle,
            simLoops: city.simLoops,
            cityTime: city.cityTime,
            cityScore: city.cityScore,
            resPop: city.resPop,
            comPop: city.comPop,
            indPop: city.indPop,
        });

        try {
    initialize(cityA, callbackA);

    const mapABefore = createMapMopViews(engine, cityA);
    expect(mapABefore).not.toBeNull();
    const tilesABefore = Array.from(mapABefore!.mapData);

    initialize(cityB, callbackB);


    const mapAAfter = createMapMopViews(engine, cityA);
    expect(mapAAfter).not.toBeNull();
    const tilesAAfter = Array.from(mapAAfter!.mapData);

    const changedInA = tilesABefore.reduce(
        (count, value, index) =>
            count + (value !== tilesAAfter[index] ? 1 : 0),
        0
    );

    console.log(
        'E-Cropolis-010: changes to A while initializing B:',
        changedInA
    );

    expect(changedInA).toBe(0);

      const mapA = createMapMopViews(engine, cityA);
      const mapB = createMapMopViews(engine, cityB);

      expect(mapA).not.toBeNull();
     expect(mapB).not.toBeNull();

     const tilesA = Array.from(mapA!.mapData);
const tilesB = Array.from(mapB! .mapData);

const differences = tilesA.flatMap((value, index) =>
    value === tilesB[index]
        ? []
        : [{
            index,
            x: Math.floor(index / 100),
            y: index % 100,
            engineA: value,
            engineB: tilesB[index],
        }]
);

console.log('E-Cropolis-010 initial map comparison:', {
    tilesA: tilesA.length,
    tilesB: tilesB.length,
    differentTiles: differences.length,
    firstDifferences: differences.slice(0, 10),
});

expect(
    differences.length,
    'Native maps differ immediately after initialization'
).toBe(0);


            // Verify the observable starting states.
            expect(observe(cityA)).toEqual(observe(cityB));

            // Compare both engines after every explicit tick.
            for (let step = 1; step <= steps; step++) {
                cityA.simTick();
                cityB.simTick();

                expect(
                    observe(cityA),
                    `Observable states diverged at step ${step}`
                ).toEqual(observe(cityB));
            }
            // Compare all native map tiles after 32 simulation ticks.
            const finalMapA = createMapMopViews(engine, cityA);
            const finalMapB = createMapMopViews(engine, cityB);

            expect(finalMapA).not.toBeNull();
            expect(finalMapB).not.toBeNull();

            const finalTilesA = Array.from(finalMapA!.mapData);
            const finalTilesB = Array.from(finalMapB!.mapData);

            const finalDifferences = finalTilesA.reduce(
                (count, tile, index) =>
                    count + (tile !== finalTilesB[index] ? 1 : 0),
                0
            );

            console.log('E-Cropolis-010 final map comparison:', {
                steps,
                tilesCompared: finalTilesA.length,
                differentTiles: finalDifferences,
            });

            expect(finalTilesA.length).toBe(12000);
            expect(finalTilesB.length).toBe(12000);
            expect(finalDifferences).toBe(0);
        } finally {
            cityA.delete();
            cityB.delete();
            // Native instances own their registered callbacks.
        }
    });
});
