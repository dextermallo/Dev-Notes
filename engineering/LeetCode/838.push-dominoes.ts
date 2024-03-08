/*
 * @lc app=leetcode id=838 lang=typescript
 *
 * [838] Push Dominoes
 */

// @lc code=start
/**
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function pushDominoes(dominoes: string): string {
    dominoes = 'L' + dominoes + 'R';
    let res = '';

    for (let i = 0, j = 1; j < dominoes.length; ++j) {
        if (dominoes[j] === '.') { continue; }
        const middle = j - i - 1;
        
        // handle previous val of index[j]
        if (i > 0) { res += dominoes[i]; }

        if (dominoes[i] === dominoes[j]) {
            res += `${dominoes[i]}`.repeat(middle);
        } else if (dominoes[i] === 'L' && dominoes[j] === 'R') {
            res += '.'.repeat(middle);
        } else {
            res += 'R'.repeat(~~(middle / 2)) + '.'.repeat(middle % 2) + 'L'.repeat(~~(middle / 2));
        }
        i = j;
    }

    return res;
};
// @lc code=end