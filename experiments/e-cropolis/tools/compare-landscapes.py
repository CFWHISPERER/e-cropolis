#!/usr/bin/env python3
"""Compare E-Cropolis landscape snapshots at three levels."""

import json
import sys
from pathlib import Path

TILE_MASK = 0x03FF
SCHEMA = "e-cropolis-landscape-snapshot-v1"


def classify_tile(raw):
    """Mirror the Experiment 001 JavaScript classification."""
    tile = raw & TILE_MASK

    if tile == 0:
        return "bare_ground"
    if 2 <= tile <= 20:
        return "water"
    if 21 <= tile <= 37 or 40 <= tile <= 43:
        return "woodland"
    if tile in (38, 39):
        return "ambiguous_woodland"
    if 44 <= tile <= 47:
        return "rubble"
    if 48 <= tile <= 51:
        return "flood"
    if tile == 52:
        return "contamination"
    if 56 <= tile <= 63:
        return "fire"

    return "other_or_unclassified"


def load_snapshot(filename):
    with Path(filename).open(encoding="utf-8") as f:
        snapshot = json.load(f)

    if snapshot.get("schema") != SCHEMA:
        raise ValueError(f"Unsupported snapshot schema: {filename}")

    width = snapshot["width"]
    height = snapshot["height"]
    tiles = snapshot["tiles"]

    if (not isinstance(width, int) or isinstance(width, bool)
            or not isinstance(height, int) or isinstance(height, bool)
            or width <= 0 or height <= 0):
        raise ValueError(f"Invalid dimensions: {filename}")

    if not isinstance(tiles, list) or len(tiles) != width * height:
        raise ValueError(f"Invalid tile count: {filename}")

    if any(type(tile) is not int or not 0 <= tile <= 65535
           for tile in tiles):
        raise ValueError(f"Invalid raw tile value: {filename}")

    if snapshot.get("tileMask") != "0x03ff":
        raise ValueError(f"Unexpected tile mask: {filename}")

    return snapshot


def main():
    if len(sys.argv) != 3:
        print("Usage: compare-landscapes.py BASELINE WORKING")
        return 2

    baseline = load_snapshot(sys.argv[1])
    working = load_snapshot(sys.argv[2])

    for field in ("width", "height", "layout", "tileMask"):
        if baseline[field] != working[field]:
            raise ValueError(f"Incompatible snapshots: {field}")

    raw_changes = []
    id_changes = []
    category_changes = []
    transitions = {}

    for index, (before, after) in enumerate(
        zip(baseline["tiles"], working["tiles"])
    ):
        if before != after:
            raw_changes.append(index)

        if (before & TILE_MASK) != (after & TILE_MASK):
            id_changes.append(index)

        old_category = classify_tile(before)
        new_category = classify_tile(after)

        if old_category != new_category:
            category_changes.append(index)
            transition = (old_category, new_category)
            transitions[transition] = transitions.get(transition, 0) + 1

    total = len(baseline["tiles"])

    print("E-Cropolis 004 — Landscape Comparison")
    print(f"Baseline: {sys.argv[1]}")
    print(f"Working:  {sys.argv[2]}")
    print(f"Total tiles: {total}")
    print(f"Changed raw tile positions: {len(raw_changes)}")
    print(f"Changed tile identifiers: {len(id_changes)}")
    print(f"Changed landscape categories: {len(category_changes)}")
    print(f"Raw change percentage: {100 * len(raw_changes) / total:.4f}%")

    if transitions:
        print("Category transitions:")
        for (before, after), count in sorted(transitions.items()):
            print(f"  {before} -> {after}: {count}")

    print("First raw changes:", raw_changes[:10])
    print("First tile-ID changes:", id_changes[:10])
    print("First category changes:", category_changes[:10])

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)
