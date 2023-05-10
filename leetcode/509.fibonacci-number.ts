/*
 * @lc app=leetcode id=509 lang=typescript
 *
 * [509] Fibonacci Number
 */

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 * Tags: Math, Dynamic Programming, Recursion
 */
// @lc code=start
function fib(n: number): number {
    const arr: number[] = [0, 1];

    for (let i = 2; i <= n; ++i) {
        arr.push(arr[i - 1] + arr[i - 2]);
    }

    return arr[n];
};
// @lc code=end

