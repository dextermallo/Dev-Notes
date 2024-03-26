/*
 * @lc app=leetcode id=41 lang=typescript
 *
 * [41] First Missing Positive
 */

// @lc code=start
function firstMissingPositive(nums: number[]): number {
    let i = 0;
    
    while (i < nums.length) {
        let idx = nums[i] - 1;
        if (nums[i] > 0 && nums[i] <= nums.length && nums[i] !== nums[idx]) {
            [nums[i], nums[idx]] = [nums[idx], nums[i]];
        } else {
            ++i;
        }
    }

    for (let i = 0; i < nums.length; ++i) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    return nums.length + 1;
};
// @lc code=end