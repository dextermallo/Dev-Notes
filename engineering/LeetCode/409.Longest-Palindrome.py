"""
https://leetcode.com/problems/longest-palindrome/description/

Time complexity: O(n), n = len(s)
Space complexity: O(c), c = unique char in s
"""
class Solution:
    def longestPalindrome(self, s: str) -> int:
        st, res = set(), 0

        for c in s:
            if c in st:
                res += 2
                st.remove(c)
            else:
                st.add(c)
        
        return res + (1 if len(st) > 0 else 0)