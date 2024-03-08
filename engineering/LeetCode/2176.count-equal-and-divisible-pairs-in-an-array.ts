/*
 * @lc app=leetcode id=2176 lang=typescript
 *
 * [2176] Count Equal and Divisible Pairs in an Array
 */

// @lc code=start
/**
 * Time complexity: O(n^2)
 * Space complexity: O(1)
 */
function countPairs(nums: number[], k: number): number {
    let res = 0;

    for (let i = 0; i < nums.length; ++i) {
        for (let j = i + 1; j < nums.length; ++j) {
            if (nums[i] === nums[j] && i * j % k === 0) {
                ++res;
            }
        }
    }

    return res;
};
// @lc code=end

