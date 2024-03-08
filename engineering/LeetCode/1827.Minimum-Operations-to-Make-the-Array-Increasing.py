"""
https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing/description/

Time complexity: O(n), n = len(nums)
Space complexity: O(1)
"""
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        res = 0

        for i in range(1, len(nums)):
            if nums[i] <= nums[i - 1]:
                res += abs(nums[i] - nums[i - 1]) + 1
                nums[i] = nums[i - 1] + 1

        return res