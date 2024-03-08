import sys


"""
https://leetcode.com/problems/increasing-triplet-subsequence/description/

Ref: https://leetcode.com/problems/increasing-triplet-subsequence/solutions/79004/concise-java-solution-with-comments/?orderBy=most_votes

Time complexity: O(n)
Space complexity: O(1)
"""
class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        small, big = sys.maxsize, sys.maxsize
        for n in nums:
            # find the smallest
            if n <= small: small = n
            # find if any bigger than the smallest
            elif n <= big: big = n
            # find if bigger than both small and big
            else: return True
        return False