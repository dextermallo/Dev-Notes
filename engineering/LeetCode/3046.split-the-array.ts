/*
 * @lc app=leetcode id=3046 lang=typescript
 *
 * [3046] Split the Array
 */

// @lc code=start
function isPossibleToSplit(nums: number[]): boolean {
    const cnt: Record<number, number> = {};

    for (const n of nums) {
        cnt[n] = cnt[n] ? cnt[n] + 1 : 1;
        if (cnt[n] > 2) { return false; }
    }

    return true;
};
// @lc code=end

