/*
 * @lc app=leetcode id=2183 lang=typescript
 *
 * [2183] Count Array Pairs Divisible by K
 */

// @lc code=start
/**
 * Time complexity: O(n * tau(n))
 * Space complexity: O(tau(n))
 * @see https://leetcode.com/problems/count-array-pairs-divisible-by-k/discuss/1784721/Count-GCDs
 */
function countPairs(nums: number[], k: number): number {

    const gcd = (a: number, b: number): number => {
        if (!b) { return a; }
        return gcd(b, a % b);
    }
    
    const gcdMp: Record<number, number> = {};
    let res = 0;
    for (const n of nums) {
        let i = gcd(n, k);

        for (const j in gcdMp) {
            if (i * Number(j) % k === 0) { res += gcdMp[j]; }
        }

        if (gcdMp[i] === undefined) { gcdMp[i] = 0; }
        ++gcdMp[i];
    }

    return res;
};

// @lc code=end