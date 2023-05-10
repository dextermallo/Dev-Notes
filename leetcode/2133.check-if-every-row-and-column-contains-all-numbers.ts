/*
 * @lc app=leetcode id=2133 lang=typescript
 *
 * [2133] Check if Every Row and Column Contains All Numbers
 */

// @lc code=start
/**
 * Time complexity: O(n^2)
 * Space complexity: O(n)
 */
function checkValid(m: number[][]): boolean {
    const n = m.length;
    for (let i = 0; i < n; ++i) {
        const sRow: Set<number> = new Set<number>();
        const sCol: Set<number> = new Set<number>();

        for (let j = 0; j < n; ++j) {
            if (sRow.has(m[i][j]) || sCol.has(m[j][i])) { return false; }
            sRow.add(m[i][j]);
            sCol.add(m[j][i]);
        }
        if (sRow.size !== n || sCol.size !== n) { return false; }
    }

    return true;
};
// @lc code=end

