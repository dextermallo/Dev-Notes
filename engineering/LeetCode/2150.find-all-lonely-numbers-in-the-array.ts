/*
 * @lc app=leetcode id=2150 lang=typescript
 *
 * [2150] Find All Lonely Numbers in the Array
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function findLonely(nums: number[]): number[] {
    let cnt: Map<number, number> = new Map<number, number>();

    for (const n of nums) {
        cnt.set(n, cnt.has(n) ? cnt.get(n)! + 1 : 1);
    }

    let res: number[] = [];
    for (let [val, n] of cnt.entries()) {
        
        if (cnt.has(val - 1) || cnt.has(val + 1)) {
            cnt.delete(val);
            let l = 0, r = 0;
            while (cnt.has(val - ++l)) { cnt.delete(val - l); }
            while (cnt.has(val + ++r)) { cnt.delete(val + r); }
            continue;
        }
        if (n === 1) { res.push(val); }
    }

    return res;
};
// @lc code=end