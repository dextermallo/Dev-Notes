/*
 * @lc app=leetcode id=473 lang=typescript
 *
 * [473] Matchsticks to Square
 */

// @lc code=start
/**
 * Time complexity: O(n^4)
 * Space complexity: O(1)
 * @see https://leetcode.com/problems/matchsticks-to-square/discuss/95744/cpp-6ms-solution-with-DFS
 */
function makesquare(matchsticks: number[]): boolean {
    if (matchsticks.length < 4) { return false; }
    const sum = matchsticks.reduce((a, b) => a + b);
    if (sum % 4 !== 0) { return false; }
    
    matchsticks.sort((a, b) => a - b);
    const target = sum / 4;
    let len: number[] = [0, 0, 0, 0];

    const dfs = (idx: number): boolean => {
        if (idx === matchsticks.length) {
            return len[0] === len[1] && len[1] === len[2] && len[2] === len[3];
        }
        for (let i = 0; i < 4; ++i) {
            if (len[i] + matchsticks[idx] > target) { continue; }

            let j = i;
            while (--j > -1) { if (len[i] === len[j]) { break; } }

            if (j !== -1) { continue; }

            len[i] += matchsticks[idx];
            if (dfs(idx + 1)) { return true; }
            len[i] -= matchsticks[idx];
        }
        return false;
    };

    return dfs(0);
};
// @lc code=end