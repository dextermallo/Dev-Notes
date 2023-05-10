/*
 * @lc app=leetcode id=2187 lang=typescript
 *
 * [2187] Minimum Time to Complete Trips
 */

// @lc code=start

const MAX_TRIP = 10 ** 14;

/**
 * Time complexity: O(n * log1e14)
 * Space complexity: O(1)
 */
function minimumTime(time: number[], totalTrips: number): number {
    let l = 1, r = MAX_TRIP;
    while (l < r) {
        const mid = Math.trunc((r - l) / 2) + l;
        let curTrips = 0;
        time.forEach(t => { curTrips += Math.trunc(mid / t); });
        curTrips >= totalTrips ? r = mid : l = mid + 1;
    }
    
    return l;
};
// @lc code=end