/*
 * @lc app=leetcode id=2114 lang=typescript
 *
 * [2114] Maximum Number of Words Found in Sentences
 */

// @lc code=start

/**
 * Time complexity: O(total char in s)
 * Space complexity: O(1)
 */
function mostWordsFound(sentences: string[]): number {
    let res = 0;

    for (const s of sentences) {
        let cnt = 0;
        for (const c of s) {
            if (c === ' ') { ++cnt; }
        }
        res = Math.max(res, cnt + 1);
    }

    return res;
};
// @lc code=end

