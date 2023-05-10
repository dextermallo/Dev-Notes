from math import ceil
"""
https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/

Time complexity: O(log(max(nums)) * len(nums))
Space complexity: O(1)
"""
class Solution:
    def smallestDivisor(self, nums: List[int], threshold: int) -> int:
        l, r = 1, max(nums)

        while l < r:
            mid = (r - l) // 2 + l
            cur_sum = sum([ceil(n / mid) for n in nums])
            
            if cur_sum <= threshold:
                r = mid
            else:
                l = mid + 1
        return l