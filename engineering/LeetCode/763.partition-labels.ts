/*
 * @lc app=leetcode id=763 lang=typescript
 *
 * [763] Partition Labels
 */

// @lc code=start
/**
 * Time complexity: O(len(s))
 * Space complexity: O(1)
 * @see https://leetcode.com/problems/partition-labels/discuss/1868842/JavaC%2B%2B-VISUALLY-EXPLAINEDDDDD!!
 */
function partitionLabels(s: string): number[] {
    const mp: Record<string, number> = {};

    for (let i = 0; i < s.length; ++i) { mp[s[i]] = i; }

    const res: number[] = [];
    let max = 0, prev = -1;

    for (let i = 0; i < s.length; ++i) {
        max = Math.max(max, mp[s[i]]);
        if (max === i) {
            res.push(max - prev);
            prev = max;
        }
    }

    return res;
};
// @lc code=end