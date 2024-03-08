/*
 * @lc app=leetcode id=2185 lang=typescript
 *
 * [2185] Counting Words With a Given Prefix
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
function prefixCount(words: string[], pref: string): number {
    let res = 0;
    for (const word of words) {
        if (word.startsWith(pref, 0)) { ++res; }
    }
    return res;
};
// @lc code=end

