"""
https://leetcode.com/problems/number-of-common-factors/description/

Time complexity: O(n), n = max(a, b) // 2
Space complexity: O(1)
"""
class Solution:
    def commonFactors(self, a: int, b: int) -> int:
        max_num = max(a, b) // 2

        res = 1 + (1 if a == b and a != 1 else 0)

        for i in range(2, max_num + 1):
            if a % i == 0 and b % i == 0:
                res += 1
        return res