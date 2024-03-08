/*
 * @lc app=leetcode id=409 lang=typescript
 *
 * [409] Longest Palindrome
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 * Tags: Hash table, String, Greedy
 * 
 * since we can randomize the order of the characters, we only need to check
 * whether there're two same characters in the string `s` and count the volume.
 */
function longestPalindrome(s: string): number {
    const set: Set<string> = new Set<string>();
    let res = 0;

    for (const c of s) {
        if (set.has(c)) {
            set.delete(c);
            res += 2;
        } else {
            set.add(c);
        }
    }

    return set.size > 0 ? res + 1 : res;
};
// @lc code=end