/*
 * @lc app=leetcode id=2186 lang=typescript
 *
 * [2186] Minimum Number of Steps to Make Two Strings Anagram II
 */

// @lc code=start
/**
 * Time complexity: O(s + t)
 * Space complexity: O(1)
 */
function minSteps(s: string, t: string): number {
    let mp1: number[] = new Array<number>(26).fill(0);
    let mp2: number[] = new Array<number>(26).fill(0);

    for (const c of s) { mp1[c.charCodeAt(0) - 97] += 1; }
    for (const c of t) { mp2[c.charCodeAt(0) - 97] += 1; }

    let res = 0;

    for (let i = 0; i < 26; ++i) {
        res += Math.max(mp1[i], mp2[i]) * 2 - mp1[i] - mp2[i];
    }

    return res;
};
// @lc code=end