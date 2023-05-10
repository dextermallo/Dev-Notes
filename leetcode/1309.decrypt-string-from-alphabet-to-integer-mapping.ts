/*
 * @lc app=leetcode id=1309 lang=typescript
 *
 * [1309] Decrypt String from Alphabet to Integer Mapping
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function freqAlphabets(s: string): string {
    let res: string = '';
    
    for (let i = 0; i < s.length; ++i) {
        if (i + 2 < s.length && s[i + 2] === '#') {
            res += String.fromCharCode(Number(s[i]) * 10 + Number(s[i + 1]) + 96);
            i += 2;
        } else {
            res += String.fromCharCode(Number(s[i]) + 96);
        }
    }

    return res;
};
// @lc code=end

