"""
https://leetcode.com/problems/peak-index-in-a-mountain-array/description/

Time complexity: O(log(len(arr)))
Space complexity: O(1)
"""
class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        l = 0; r = len(arr) - 1

        while l < r:
            mid = (r - l) // 2 + l
            if arr[mid] >= arr[mid + 1]:
                r = mid
            else:
                l = mid + 1

        return l