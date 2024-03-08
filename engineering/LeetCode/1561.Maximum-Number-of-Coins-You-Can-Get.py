"""
https://leetcode.com/problems/maximum-number-of-coins-you-can-get/description/

Time complexity: O(nlogn), n = len(piles)
Space complexity: O(1)
"""
class Solution:
    def maxCoins(self, piles: List[int]) -> int:
        piles.sort()

        res, l, r = 0, 0, len(piles) - 1

        while l < r:
            res += piles[r - 1]
            r -= 2
            l += 1
        return res