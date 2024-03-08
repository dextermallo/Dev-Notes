"""
https://leetcode.com/problems/happy-number/description/

Time complexity: O(x), x <= 243
Space complexity: O(x)
"""
class Solution:
    def isHappy(self, n: int) -> bool:
        existed = set()
        while n not in existed:
            existed.add(n)
            n = sum([int(c) * int(c) for c in str(n)])
            if n == 1: return True
        return False