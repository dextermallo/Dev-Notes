/*
 * @lc app=leetcode id=1007 lang=typescript
 *
 * [1007] Minimum Domino Rotations For Equal Row
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
function minDominoRotations(tops: number[], bottoms: number[]): number {
    let up: number[] = new Array<number>(7).fill(0);
    let down: number[] = new Array<number>(7).fill(0);

    let shared: Set<number> = new Set<number>([tops[0], bottoms[0]]);
    ++up[tops[0]];
    ++down[bottoms[0]];

    for (let i = 1; i < tops.length; ++i) {

        if (tops[i] === bottoms[i]) {
            if (!shared.has(tops[i])) { return -1; }
            shared = new Set<number>([tops[i]]);
        } else {
            if (!shared.has(tops[i]) && !shared.has(bottoms[i])) { return -1; }
            if (!shared.has(tops[i])) { shared = new Set<number>([bottoms[i]]); }
            if (!shared.has(bottoms[i])) { shared = new Set<number>([tops[i]]); }
        }

        ++up[tops[i]];
        ++down[bottoms[i]];
    }

    let res = 2 * 10 ** 4 + 1;

    for (let i = 1; i < 7; ++i) {
        if (up[i] + down[i] >= tops.length) {
            res = Math.min(res, tops.length - Math.max(up[i], down[i]));
        }
    }

    return res === 2 * 10 ** 4 + 1 ? -1 : res;
};
// @lc code=end