/*
 * @lc app=leetcode id=118 lang=typescript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
/**
 * Time complexity: O(numRows!)
 * Space complexity: O(numRows!)
 * Tags: Array, Dynamic Programming
 */
function generate(numRows: number): number[][] {
    const res: number[][] = [[], [1]];

    for (let i = 2; i <= numRows; ++i) {
        const cur = new Array<number>(i).fill(0);
        cur[0] = 1;
        cur[i - 1] = 1;
        for (let j = 1; j < i - 1; ++j) {
            cur[j] = res[i - 1][j - 1] + res[i - 1][j];
        }
        res.push(cur);
    }

    res.shift();
    return res;
};
// @lc code=end