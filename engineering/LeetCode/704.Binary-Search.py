"""
https://leetcode.com/problems/binary-search/description/

Time complexity: O(logn), n = len(nums)
Space complexity: O(1)
"""
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l = 0; r = len(nums) - 1

        while l < r:
            mid = (r - l) // 2 + l
            if nums[mid] >= target:
                r = mid
            else:
                l = mid + 1
        
        return l if nums[l] == target else -1