/*
 * @lc app=leetcode id=1641 lang=typescript
 *
 * [1641] Count Sorted Vowel Strings
 */

// @lc code=start

/**
 * Time complexity: O(n), k = types of char
 * Space complexity: O(k)
 * Tags: 
 * @see https://leetcode.com/problems/count-sorted-vowel-strings/discuss/918498/JavaC%2B%2BPython-DP-O(1)-Time-and-Space
 */
function countVowelStrings(n: number): number {
    /**
     * @params dp - represent the accumulation of current combination of the string,
     * it would be counted with `k`, that indicates how many vocabularies are used 
     * in the current string (eg. k = 1, only use `u`, k = 2, only use `o, u`)
     * @example
     * in n = 1:
     * dp[0] = 1
     * dp[1] = 1 (u)
     * dp[2] = 1 + dp[2] (o, u)
     * ...
     * dp[5] = 1 + dp[4] (a, e, i, o, u)
     * 
     * n = 2:
     * dp[1] = 1 + 1 (uu)
     * dp[2] = 2 (ou, oo) + 1 (uu)
     * ...
     * dp[5] = 5 (a[a,e,i,o,u]) + dp[4] (e[e,i,o,u]) + ... + dp[1] (uu)
     */
    const dp: number[] = [0, 1, 1, 1, 1, 1];
    for (let i = 1; i <= n; ++i) {
        for (let k = 1; k < 6; ++k) {
            dp[k] += dp[k - 1];
        }
    }
    return dp[5];
};

/**
 * Time complexity: O(1)
 * Space complexity: O(1)
 */
 function countVowelStringsV2(n: number): number {
    /**
     * Imagine we break the string like A[x0]E[x1]I[x2]O[x3]U,
     * x0, x1, x2, x3 break the string into a valid string, so we just need to know
     * how many combination of index X are being placed then we can know how many combination.
     * In that case, (n + 4) C 4
     */
    return (n + 1) * (n + 2) * (n + 3) * (n + 4) / 4;
}
// @lc code=end

