#!/usr/bin/env python3
"""Compare two E-Cropolis landscape snapshots."""

import json
import sys
from pathlib import Path


def load_snapshot(filename):
    with Path(filename).open(encoding="utf-8") as f:
        snapshot = json.load(f)

    if snapshot.get("schema") != "e-cropolis-landscape-snapshot-v1":
        raise ValueError(f"Unsupported snapshot schema: {filename}")

    width = snapshot["width"]
    height = snapshot["height"]
    tiles = snapshot["tiles"]

    if len(tiles) != width * height:
        raise ValueError(f"Invalid tile count: {filename}")

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

    differences = [
        index
        for index, (before, after) in enumerate(
            zip(baseline["tiles"], working["tiles"])
        )
        if before != after
    ]

    total = len(baseline["tiles"])

    print("E-Cropolis 004 — Landscape Comparison")
    print(f"Baseline: {sys.argv[1]}")
    print(f"Working:  {sys.argv[2]}")
    print(f"Total tiles: {total}")
    print(f"Changed raw tile positions: {len(differences)}")
    print(f"Unchanged raw tile positions: {total - len(differences)}")
    print(f"Change percentage: {100 * len(differences) / total:.4f}%")

    if not differences:
        print("PASS: Landscapes are identical")
    else:
        print("First changed positions:", differences[:10])

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)
