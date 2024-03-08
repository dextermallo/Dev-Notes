"""
https://leetcode.com/problems/majority-element/description/

Time complexity: O(n), n = len(nums)
Space complexiry: O(1)
"""
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        cnt, val = 1, nums[0]

        for n in nums[1:]:
            if n == val:
                cnt += 1
            else:
                cnt -= 1
                if cnt == -1:
                    cnt = 1
                    val = n
        
        return val