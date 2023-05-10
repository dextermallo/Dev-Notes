/*
 * @lc app=leetcode id=2138 lang=typescript
 *
 * [2138] Divide a String Into Groups of Size k
 */

// @lc code=start
/**
 * Time complexity: O(s / k)
 * Space complexity: O(s + k - s % k)
 */
function divideString(s: string, k: number, fill: string): string[] {
    if (s.length % k !== 0) { s += fill.repeat(k - s.length % k); }
    const res: string[] = [];
    let i = 0;
    while (i <= s.length - k) {
        res.push(s.substring(i, i + k));
        i += k;
    }
    return res;
};
// @lc code=end