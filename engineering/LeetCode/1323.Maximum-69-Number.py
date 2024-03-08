"""
https://leetcode.com/problems/maximum-69-number/description/

Time complexity: O(n), n = len(num)
Space complexity: O(n)
"""
class Solution:
    def maximum69Number (self, num: int) -> int:
        s = str(num)
        res, changed = 0, False
        
        for i in range(len(s)):
            res *= 10
            if not changed and s[i] == '6':
                res += 9
                changed = True
                continue
            
            res += int(s[i])
        return res