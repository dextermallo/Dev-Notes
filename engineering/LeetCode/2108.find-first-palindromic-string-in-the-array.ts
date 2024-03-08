/*
 * @lc app=leetcode id=2108 lang=typescript
 *
 * [2108] Find First Palindromic String in the Array
 */

// @lc code=start
/**
 * Time complexity: O(len of total char)
 * Space complexity: O(1)
 */
function firstPalindrome(words: string[]): string {
    for (const word of words) {
        let l = 0, r = word.length - 1;
        let isPalindromic = true;
        while (l <= r) {
            if (word[l] !== word[r]) {
                isPalindromic = false;
                break;
            }
            ++l;
            --r;
        }

        if (isPalindromic) { return word; }
    }

    return '';
};
// @lc code=end

