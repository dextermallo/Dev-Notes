/*
 * @lc app=leetcode id=3033 lang=typescript
 *
 * [3033] Modify the Matrix
 */

// @lc code=start
function modifiedMatrix(matrix: number[][]): number[][] {
    const m = matrix.length, n = matrix[0].length;
    for (let j = 0; j < n; ++j) {

        const replaceIdx: number[] = new Array<number>();
        let max: number = -1e10;

        for (let i = 0; i < m; ++i) {
            max = Math.max(matrix[i][j], max);
            if (matrix[i][j] === -1) {
                replaceIdx.push(i);
            }
        }

        if (max !== -1) {
            for (const idx of replaceIdx) {
                matrix[idx][j] = max;
            }
        }
    }

    return matrix;
};
// @lc code=end

