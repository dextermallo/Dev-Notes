/*
 * @lc app=leetcode id=2149 lang=typescript
 *
 * [2149] Rearrange Array Elements by Sign
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function rearrangeArray(nums: number[]): number[] {
    let res: number[] = new Array<number>(nums.length);
    let positiveIdx = 0, negativeIdx = 1;

    for (const n of nums) {
        if (n > 0) {
            res[positiveIdx] = n;
            positiveIdx += 2;
        } else {
            res[negativeIdx] = n;
            negativeIdx += 2;
        }
    }

    return res;
};
// @lc code=end