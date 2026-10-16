import { describe, it, expect } from 'vitest';
import { loadMicropolisMainModule } from './node';

describe('E-Cropolis-010: experimental native engine', () => {
    it('exposes deterministic initialization controls', async () => {
        const engine = await loadMicropolisMainModule();
        const city = new engine.Micropolis();

        try {
            city.deterministicSeedEnabled = true;
            city.deterministicSeed = 20261011;

            expect(city.deterministicSeedEnabled).toBe(true);
            expect(city.deterministicSeed).toBe(20261011);
        } finally {
            city.delete();
        }
    });
});
