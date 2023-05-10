/*
 * @lc app=leetcode id=860 lang=typescript
 *
 * [860] Lemonade Change
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
function lemonadeChange(bills: number[]): boolean {
    let [f, t] = [0, 0];
    let signal = true;

    const mp: Record<number, Function> = {
        5: (() => { ++f; }),
        10: (() => {
            if (--f === -1) { signal = false; return; }
            ++t;
        }),
        20: (() => {
            if (t === 0) {
                if (f < 3) { signal = false; return; }
                f -= 3;
            } else {
                --t;
                if (--f === -1) { signal = false; return; }
            }
        })
    }

    for (let b of bills) {
        mp[b]();
        if (!signal) { return false; }
    }

    return true;
};
// @lc code=end

