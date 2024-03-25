/*
 * @lc app=leetcode id=452 lang=typescript
 *
 * [452] Minimum Number of Arrows to Burst Balloons
 */

// @lc code=start
function findMinArrowShots(points: number[][]): number {
    points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    let res = 1, prevLast = points[0][1];

    for (let i = 1; i < points.length; ++i) {
        if (prevLast >= points[i][0]) {
            if (prevLast >= points[i][1]) { prevLast = points[i][1]; }
        } else {
            prevLast = points[i][1];
            ++res;
        }
    }

    return res;
};
// @lc code=end
