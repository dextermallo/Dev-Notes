/*
 * @lc app=leetcode id=2148 lang=typescript
 *
 * [2148] Count Elements With Strictly Smaller and Greater Elements 
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function countElements(nums: number[]): number {
    let min = 10 ** 5 + 1, max = -(10 ** 5 + 1);
    let mp: Record<number, number> = {};

    for (const n of nums) {
        if (mp[n] === undefined) { mp[n] = 0; }
        ++mp[n];
        if (n > max) { max = n; }
        if (n < min) { min = n; }
    }

    return nums.length - mp[max] - mp[min] < 0 ? 0 : nums.length - mp[max] - mp[min];
};
// @lc code=end

