"""
https://leetcode.com/problems/search-insert-position/description/

Time complexity: O(logn), n = len of nums
Space complexity: O(1)
"""
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)
        while l < r:
            mid = (l + r) // 2

            if target <= nums[mid]:
                r = mid
            else:
                l = mid + 1
        
        return l