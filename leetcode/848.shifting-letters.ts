/*
 * @lc app=leetcode id=848 lang=typescript
 *
 * [848] Shifting Letters
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
function shiftingLetters(s: string, shifts: number[]): string {
    for (let i = shifts.length - 2; i > -1; --i) { shifts[i] += (shifts[i + 1]) % 26; }
    
    let res = '';

    for (let i = 0; i < s.length; ++i) {
        res += String.fromCharCode(((s[i].charCodeAt(0) - 97) + shifts[i]) % 26 + 97);
    }

    return res;
};
// @lc code=end