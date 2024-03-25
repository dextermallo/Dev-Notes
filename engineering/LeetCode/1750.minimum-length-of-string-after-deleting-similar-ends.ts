/*
 * @lc app=leetcode id=1750 lang=typescript
 *
 * [1750] Minimum Length of String After Deleting Similar Ends
 */

// @lc code=start
function minimumLength(s: string): number {
    let l = 0, r = s.length - 1;

    while (l < r && s[l] === s[r]) {
        const c = s[l];
        while (l < r && s[l] === c) { ++l; }
        while (l < r && s[r] === c) { --r; }
    }

    return r - l + 1;
};
// @lc code=end

