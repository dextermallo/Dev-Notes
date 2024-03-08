/*
 * @lc app=leetcode id=1052 lang=typescript
 *
 * [1052] Grumpy Bookstore Owner
 */

// @lc code=start

/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 * Tag: Array; Sliding window
 * @see https://leetcode.com/problems/grumpy-bookstore-owner/discuss/299230/JavaPython-3-Sliding-window.
 */
function maxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
    /**
     * @params sum - all satisfied customer
     * @params maxReducedGrumpy - maximum satisfied customers with reduced X minutes' temper
     * @params reducedGrumpy - sliding window to store the current satisfied customers we can get
     */
    let sum = 0, maxReducedGrumpy = 0, reducedGrumpy = 0;

    for (let i = 0; i < customers.length; ++i) {
        grumpy[i] === 0 ? sum += customers[i] : reducedGrumpy += customers[i];
        // sliding window
        if (i >= minutes) {
            reducedGrumpy -= customers[i - minutes] * grumpy[i - minutes];
        }
        maxReducedGrumpy = Math.max(reducedGrumpy, maxReducedGrumpy);
    }
    return sum + maxReducedGrumpy;
};
// @lc code=end