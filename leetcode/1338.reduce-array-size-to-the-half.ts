/*
 * @lc app=leetcode id=1338 lang=typescript
 *
 * [1338] Reduce Array Size to The Half
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 * @see https://leetcode.com/problems/reduce-array-size-to-the-half/discuss/1319416/C%2B%2BJavaPython-HashMap-and-Sort-then-Counting-Sort-O(N)-Clean-and-Concise
 */
function minSetSize(arr: number[]): number {
    const mp: Record<number, number> = {};
    arr.forEach(val => { mp[val] = !!mp[val] ? mp[val] + 1 : 1; });
    const cnt: Array<number> = new Array<number>(arr.length + 1);

    for (const key in mp) {
        const val = mp[key];
        cnt[val] = !!cnt[val] ? cnt[val] + 1 : 1;
    }

    let res = 0, cur = 0, idx = cnt.length;

    while (cur < arr.length / 2) {
        while (cnt[idx] === undefined || cnt[idx] === 0) { --idx; }
        cur += idx;
        --cnt[idx];
        ++res;
    }
    return res;
};
// @lc code=end