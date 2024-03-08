/*
 * @lc app=leetcode id=2094 lang=typescript
 *
 * [2094] Finding 3-Digit Even Numbers
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
function findEvenNumbers(digits: number[]): number[] {
    const cnt: number[] = new Array<number>(10).fill(0);
    for (const d of digits) { ++cnt[d]; }

    if (!cnt[0] && !cnt[2] && !cnt[4] && !cnt[6] && !cnt[8]) { return []; }

    const i1: number[] = [];
    const i2: number[] = [];
    const i3: number[] = [];

    for (let i = 0; i < cnt.length; ++i) {
        if (i !== 0 && cnt[i] > 0) { i1.push(i); }
        if (cnt[i] > 0) { i2.push(i); }
        if (i % 2 === 0 && cnt[i] > 0) {i3.push(i); }
    }

    const res: Set<number> = new Set<number>();

    for (const v1 of i1) {
        --cnt[v1];
        for (const v2 of i2) {
            --cnt[v2];
            for (const v3 of i3) {
                --cnt[v3];
                if (cnt[v1] > -1 && cnt[v2] > -1 && cnt[v3] > -1) {
                    res.add(v1 * 100 + v2 * 10 + v3);
                }
                ++cnt[v3];
            }
            ++cnt[v2];
        }
        ++cnt[v1];
    }

    return Array.from(res);
};
// @lc code=end