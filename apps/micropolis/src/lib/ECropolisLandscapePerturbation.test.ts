import { describe, it, expect } from 'vitest';
import { loadMicropolisMainModule } from './wasm/experimental/node';
import { createMapMopViews } from './wasm/views';
import { micropolisReactive } from './MicropolisReactive.svelte';

describe('E-Cropolis-011: controlled landscape perturbation', () => {
    it('changes exactly one dirt tile into woods', async () => {
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
        const dirt = 0;
        const woodsWithFlags = 37 | 0x1000 | 0x2000;

        const initialize = (
            city: typeof cityA,
            callback: typeof callbackA
        ) => {
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

        try {
            initialize(cityA, callbackA);
            initialize(cityB, callbackB);

            const mapA = createMapMopViews(engine, cityA);
            const mapB = createMapMopViews(engine, cityB);

            expect(mapA).not.toBeNull();
            expect(mapB).not.toBeNull();

            expect(Array.from(mapA!.mapData)).toEqual(
                Array.from(mapB!.mapData)
            );

            let selected: { x: number; y: number } | null = null;

            for (let x = 0; x < 120 && !selected; x++) {
                for (let y = 0; y < 100; y++) {
                    if (cityA.getTile(x, y) === dirt) {
                        selected = { x, y };
                        break;
                    }
                }
            }

            expect(selected).not.toBeNull();

            const { x, y } = selected!;
            expect(cityB.getTile(x, y)).toBe(dirt);

            cityB.setTile(x, y, woodsWithFlags);

            expect(cityA.getTile(x, y)).toBe(dirt);
            expect(cityB.getTile(x, y)).toBe(woodsWithFlags);

            const afterA = Array.from(mapA!.mapData);
            const afterB = Array.from(mapB!.mapData);

            const changedTiles = afterA.reduce(
                (count, tile, index) =>
                    count + (tile !== afterB[index] ? 1 : 0),
                0
            );

            console.log('E-Cropolis-011 initial intervention:', {
                seed,
                coordinate: { x, y },
                originalTile: dirt,
                interventionTile: woodsWithFlags,
                differentTiles: changedTiles,
            });

            expect(changedTiles).toBe(1);


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

            const observations = [];

            for (let tick = 1; tick <= 32; tick++) {
                cityA.simTick();
                cityB.simTick();

                expect(
                    cityA.getTile(x, y),
                    `E-Cropolis-011 control tile at tick ${tick}`
                ).toBe(dirt);

                expect(
                    cityB.getTile(x, y),
                    `E-Cropolis-011 intervention tile at tick ${tick}`
                ).toBe(woodsWithFlags);

                const tilesA = Array.from(mapA!.mapData);
                const tilesB = Array.from(mapB!.mapData);

                const differentTiles = tilesA.reduce(
                    (count, tile, index) =>
                        count + (tile !== tilesB[index] ? 1 : 0),
                    0
                );

                observations.push({
                    tick,
                    differentTiles,
                    stateA: observe(cityA),
                    stateB: observe(cityB),
                });
            }

            console.log(
                'E-Cropolis-011 evolution:',
                JSON.stringify(observations, null, 2)
            );

            expect(observations).toHaveLength(32);

            for (const observation of observations) {
                expect(
                    observation.differentTiles,
                    `E-Cropolis-011 map divergence at tick ${observation.tick}`
                ).toBe(1);

                expect(
                    observation.stateB,
                    `E-Cropolis-011 selected state divergence at tick ${observation.tick}`
                ).toEqual(observation.stateA);
            }
        } finally {
            cityA.delete();
            cityB.delete();
        }
    });
});
