"""
https://leetcode.com/problems/count-number-of-distinct-integers-after-reverse-operations/description/

Time complexity: O(n), n = len(nums)
Space complexity: O(n)
"""
class Solution:
    def countDistinctIntegers(self, nums: List[int]) -> int:
        s = set(nums)

        for n in nums:
            rev_val = int(str(n)[::-1])
            s.add(rev_val)
        
        return len(s)