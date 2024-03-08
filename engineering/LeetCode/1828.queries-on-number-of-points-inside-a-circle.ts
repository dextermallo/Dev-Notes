/*
 * @lc app=leetcode id=1828 lang=typescript
 *
 * [1828] Queries on Number of Points Inside a Circle
 */

// @lc code=start
/**
 * Time complexity: O(p * q)
 * Space complexity: O(q)
 */
function countPoints(points: number[][], queries: number[][]): number[] {
    const res: number[] = [];
    
    for (const [px, py, r] of queries) {
        let cnt = 0;
        for (const [x, y] of points) {
            if (Math.sqrt((px - x) ** 2 + (py - y) ** 2) <= r) { ++cnt; }
        }
        res.push(cnt);
    }
    return res;
};
// @lc code=end