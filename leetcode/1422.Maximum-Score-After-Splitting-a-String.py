"""
https://leetcode.com/problems/maximum-score-after-splitting-a-string/description/

Time complexity: O(n)
Space complexity: O(1)
"""
class Solution:
    def maxScore(self, s: str) -> int:
        left_zero = 1 if s[0] == '0' else 0
        right_one = len([x for x in list(s[1:]) if x == '1'])
        res = left_zero + right_one

        for i in range(1, len(s) - 1):
            if s[i] == '0':
                left_zero += 1
            else:
                right_one -= 1
            res = max(res, left_zero + right_one)
        
        return res