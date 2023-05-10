"""
https://leetcode.com/problems/maximum-subarray/description/

Time complexity: O(n), n = len(nums)
Space complexity: O(n)
"""
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        dp, res = [0] * (len(nums) + 1), nums[0]
        
        for i in range(1, len(nums) + 1):
            dp[i] = (dp[i - 1] if dp[i - 1] > 0 else 0) + nums[i - 1]
            res = max(res, dp[i])

        return res