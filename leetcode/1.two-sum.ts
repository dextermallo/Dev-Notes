/*
 * @lc app=leetcode id=1 lang=typescript
 *
 * [1] Two Sum
 */

// @lc code=start

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function twoSum(nums: number[], target: number): number[] {
    let mp: Record<number, number> = {};
    for (let i = 0; i < nums.length; ++i) {
        if (mp[target - nums[i]] !== undefined) { return [i, mp[target - nums[i]]]; }
        mp[nums[i]] = i;
    }
    return [-1, -1];
};
// @lc code=end