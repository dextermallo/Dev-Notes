/*
 * @lc app=leetcode id=299 lang=typescript
 *
 * [299] Bulls and Cows
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
function getHint(secret: string, guess: string): string {
    let numA = 0, numB = 0;
    const arrS: number[] = new Array<number>(10).fill(0);
    const arrG: number[] = new Array<number>(10).fill(0);

    for (let i = 0; i < secret.length; ++i) {
        if (secret[i] === guess[i]) {
            ++numA;
        } else {
            ++arrS[Number(secret[i])];
            ++arrG[Number(guess[i])];
        }
    }

    for (let i = 0; i < 10; ++i) {
        numB += arrG[i] >= arrS[i] ? arrS[i] : arrG[i];
    }

    return `${numA}A${numB}B`;
};
// @lc code=end