/*
 * @lc app=leetcode id=2124 lang=typescript
 *
 * [2124] Check if All A's Appears Before All B's
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
function checkString(s: string): boolean {
    let meetB = false;

    for (const c of s) {
        if (c === 'a' && meetB) { return false; }
        if (c === 'b') { meetB = true; }
    }

    return true;
};
// @lc code=end

