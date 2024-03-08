/*
 * @lc app=leetcode id=119 lang=typescript
 *
 * [119] Pascal's Triangle II
 */

// @lc code=start
/**
 * Time complexity: O(rowIndex ^ 2)
 * Space complexity: O(rowIndex) 
 * Tags: Array, Dynamic Programming
 */
function getRow(rowIndex: number): number[] {
    let cur = [1];

    for (let i = 1; i <= rowIndex; ++i) {
        const tmp = [...cur, 0];
    
        for (let j = 1; j < cur.length + 1; ++j) {
            tmp[j] += cur[j - 1];
        }

        cur = tmp;
    }

    return cur;
};
// @lc code=end