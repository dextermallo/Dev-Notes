/*
 * @lc app=leetcode id=238 lang=typescript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
function productExceptSelf(nums: number[]): number[] {
    const res: number[] = new Array<number>(nums.length).fill(1);

    let prod: number = 1;

    for (let i = 0, prod = 1; i < nums.length; ++i) {
        res[i] *= prod;
        prod *= nums[i];
    }

    for (let i = nums.length - 1, prod = 1; i > -1; --i) {
        res[i] *= prod;
        prod *= nums[i];
    }

    return res;

};
// @lc code=end

