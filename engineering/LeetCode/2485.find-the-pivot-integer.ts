/*
 * @lc app=leetcode id=2485 lang=typescript
 *
 * [2485] Find the Pivot Integer
 */

// @lc code=start

/**
 * 
 * Sum(1 ... x) = Sum(x...n)
 * (1 + x) * x / 2 = (n + x) * (n - x + 1) / 2
 * x(1 + x) = (n + x)(n - x + 1)
 * x + x^2 = n^2 -nx + n + nx - x^2 + x
 * x^2 * 2 = n^2 + n 
 * x = sqrt((n^2 + n) / 2)
 */
function pivotInteger(n: number): number {
    const x = Math.sqrt((n ** 2 + n) / 2);
    return x === Math.floor(x) ? x : -1;
};
// @lc code=end