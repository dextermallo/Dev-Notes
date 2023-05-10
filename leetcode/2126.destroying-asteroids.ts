/*
 * @lc app=leetcode id=2126 lang=typescript
 *
 * [2126] Destroying Asteroids
 */

// @lc code=start
/**
 * Time complexity: O(nlogn)
 * Space complexity: O(n)
 * Tags: Array, Greedy, Sorting
 * @see https://leetcode.com/problems/destroying-asteroids/discuss/1661044/JavaPython-3-Sort-then-apply-greedy-algorithm.
 */
function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
    asteroids = asteroids.sort((a, b) => a - b);

    for (const a of asteroids) {
        if (mass < a) { return false; }
        mass += a;

        if (mass > 99999) { return true; }
    }

    return true;
};
// @lc code=end

