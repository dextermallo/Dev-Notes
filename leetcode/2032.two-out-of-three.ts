/*
 * @lc app=leetcode id=2032 lang=typescript
 *
 * [2032] Two Out of Three
 */

/**
 * Time complexity: O(n)
 * Space complexity: O(n) (depends on the num range of the array)
 * Tags: Array, Hash Table
 */
// @lc code=start
function twoOutOfThree(nums1: number[], nums2: number[], nums3: number[]): number[] {
    const cnt: number[] = new Array<number>(101).fill(0);

    new Set(nums1).forEach(n => ++cnt[n]);
    new Set(nums2).forEach(n => ++cnt[n]);
    new Set(nums3).forEach(n => ++cnt[n]);

    const res: number[] = [];

    for (let i = 1; i <= 100; ++i) {
        if (cnt[i] > 1) { res.push(i); }
    }
    return res;
};
// @lc code=end

