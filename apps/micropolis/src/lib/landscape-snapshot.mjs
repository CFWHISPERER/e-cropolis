/**
 * @param {Uint16Array} mapData
 * @param {Record<string, string>} [metadata]
 */

export function createLandscapeSnapshot(mapData, metadata = {}) {
  const width = 120;
  const height = 100;
  const expected = width * height;

  if (!(mapData instanceof Uint16Array) || mapData.length !== expected) {
    throw new Error(`Expected ${expected} Uint16Array tile values`);
  }

  return {
    schema: 'e-cropolis-landscape-snapshot-v1',
    width,
    height,
    layout: 'column-major',
    tileMask: '0x03ff',
    sourceCommit: '2bfe12a',
    capturedAt: new Date().toISOString(),
    ...metadata,
    tiles: Array.from(mapData)
  };
}

/**
 * @param {ReturnType<typeof createLandscapeSnapshot>} snapshot
 * @param {string} filename
 */
export function downloadLandscapeSnapshot(snapshot, filename) {
  const blob = new Blob(
    [JSON.stringify(snapshot, null, 2)],
    { type: 'application/json' }
  );

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}
