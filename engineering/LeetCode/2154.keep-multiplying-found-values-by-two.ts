/*
 * @lc app=leetcode id=2154 lang=typescript
 *
 * [2154] Keep Multiplying Found Values by Two
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function findFinalValue(nums: number[], original: number): number {
    const s: Set<number> = new Set<number>();
    let res = original;
    for (const n of nums) { if (n % 2 === 0 || n % res === 0) { s.add(n); } }
    while (s.has(res)) { res *= 2; }
    return res;
};
// @lc code=end

