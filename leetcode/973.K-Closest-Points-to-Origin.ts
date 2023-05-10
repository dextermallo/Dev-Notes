/*
https://leetcode.com/problems/k-closest-points-to-origin/description/

Time complexity: O(nlogn), n = length of points
Space complexity: O(k)
*/
function kClosest(points: number[][], k: number): number[][] {
    return points.sort((a, b) => a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]).slice(0, k);
};