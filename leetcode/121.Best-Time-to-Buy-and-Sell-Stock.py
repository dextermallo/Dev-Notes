"""
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

Time complexity: O(n), n = len(prices)
Space complexity: O(1)
"""
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        cur_min, res = prices[0], 0

        for p in prices[1:]:
            res = max(res, 0 if p - cur_min < 0 else p - cur_min)
            cur_min = min(cur_min, p)
        
        return res