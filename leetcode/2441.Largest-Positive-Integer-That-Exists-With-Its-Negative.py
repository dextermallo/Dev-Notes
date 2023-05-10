"""
https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative/description/

Time complexity: O(n), n = len(nums)
Space complexity: O(n)
"""
class Solution:
    def findMaxK(self, nums: List[int]) -> int:
        s = set(nums)
        res = -1

        for n in s:
            if n > 0 and -n in s:
                res = max(res, n)
        return res