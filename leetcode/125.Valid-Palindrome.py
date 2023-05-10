"""
https://leetcode.com/problems/valid-palindrome/description/

Time complexity: O(len(s))

Space complexity: O(1)
"""
class Solution:
    def isPalindrome(self, s: str) -> bool:
        start = 0
        end = len(s) - 1
        while start < end:
            while start < end and not s[start].isalnum():
                start += 1
            while end > start and not s[end].isalnum():
                end -= 1
            if s[start].lower() != s[end].lower():
                return False
            
            start += 1
            end -= 1
        
        return True