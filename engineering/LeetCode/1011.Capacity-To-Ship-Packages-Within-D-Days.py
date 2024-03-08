"""
https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/

Time complexity: O(logx * len(weights)), x = sum(weights) - max(weights)
Space complexity: O(1)
"""
class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        l = max(weights); r = sum(weights)

        while l < r:
            mid, cur_day, cnt = (r - l) // 2 + l, 1, 0
            for w in weights:
                if cnt + w > mid:
                    cur_day += 1; cnt = 0
                cnt += w
            if cur_day <= days:
                r = mid
            else:
                l = mid + 1
        return l
