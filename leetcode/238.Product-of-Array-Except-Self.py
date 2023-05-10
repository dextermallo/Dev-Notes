"""
https://leetcode.com/problems/product-of-array-except-self/description/

ref: https://leetcode.com/problems/product-of-array-except-self/solutions/65622/simple-java-solution-in-o-n-without-extra-space/?orderBy=most_votes

Time complexity: O(n)
Space complexity: O(1)
"""
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n, res = len(nums), [1] * len(nums)
        
        for i in range(1, n):
            res[i] = res[i - 1] * nums[i - 1]
        
        right = 1
        for i in range(n - 1, -1, -1):
            res[i] *= right
            right *= nums[i]

        return res