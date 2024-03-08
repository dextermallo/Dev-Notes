"""
https://leetcode.com/problems/koko-eating-bananas/description/

Time complexity: O(log(max(piles)) * len(piles))
Space complexity: O(1)
"""
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        l, r = 1, max(piles)

        while l < r:
            mid = (r - l) // 2 + l

            cur_h = sum([ceil(p / mid) for p in piles])
            if cur_h <= h:
                r = mid
            else:
                l = mid + 1
            
        return l