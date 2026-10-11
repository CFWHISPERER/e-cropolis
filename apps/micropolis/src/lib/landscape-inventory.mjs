const WORLD_W = 120;
const WORLD_H = 100;
const TILE_MASK = 0x03ff;

/**
 * @typedef {'bare_ground' | 'water' | 'woodland' |
 * 'ambiguous_woodland' | 'rubble' | 'flood' |
 * 'contamination' | 'fire' |
 * 'other_or_unclassified'} LandscapeCategory
 */

/**
 * @param {number} rawValue
 * @returns {LandscapeCategory}
 */

export function classifyTile(rawValue) {
  const tile = rawValue & TILE_MASK;

  if (tile === 0) return 'bare_ground';
  if (tile >= 2 && tile <= 20) return 'water';
  if ((tile >= 21 && tile <= 37) ||
      (tile >= 40 && tile <= 43)) return 'woodland';
  if (tile === 38 || tile === 39) return 'ambiguous_woodland';
  if (tile >= 44 && tile <= 47) return 'rubble';
  if (tile >= 48 && tile <= 51) return 'flood';
  if (tile === 52) return 'contamination';
  if (tile >= 56 && tile <= 63) return 'fire';

  return 'other_or_unclassified';
}

/** @param {Uint16Array} mapData */

export function inventoryLandscape(mapData) {
  const expected = WORLD_W * WORLD_H;

  if (!(mapData instanceof Uint16Array)) {
    throw new TypeError('Expected Uint16Array');
  }
  if (mapData.length !== expected) {
    throw new Error(
      `Expected ${expected} tiles, received ${mapData.length}`
    );
  }

  /** @type {Partial<Record<LandscapeCategory, number>>} */
  const counts = {};

  /** @type {Record<number, number>} */
  const tileIds = {};

  for (const rawValue of mapData) {
    const tileId = rawValue & TILE_MASK;
    const category = classifyTile(rawValue);

    counts[category] = (counts[category] ?? 0) + 1;
    tileIds[tileId] = (tileIds[tileId] ?? 0) + 1;
  }

  const categories = Object.fromEntries(
    Object.entries(counts).sort().map(([name, count]) => [
      name,
      {
        count,
        percent: Number((count * 100 / expected).toFixed(2))
      }
    ])
  );

  return {
    experiment: 'E-Cropolis-001',
    dimensions: { width: WORLD_W, height: WORLD_H },
    totalTiles: expected,
    tileMask: '0x03ff',
    categories,
    tileIds
  };
}
