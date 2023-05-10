/*
 * @lc app=leetcode id=2053 lang=typescript
 *
 * [2053] Kth Distinct String in an Array
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 * Tags: Array, Hash Table, String, Counting
 */
function kthDistinct(arr: string[], k: number): string {
    const mp: Record<string, number> = {};
    for (const s of arr) { mp[s] = !!mp[s] ? mp[s] + 1 : 1; }

    for (const s of arr) {
        if (mp[s] === 1 && --k === 0) { return s; }
    }
    
    return '';
};
// @lc code=end