"""
https://leetcode.com/problems/longest-nice-substring/description/
https://leetcode.com/problems/longest-nice-substring/solutions/1074589/java-straightforward-divide-and-conquer/?orderBy=most_votes

Time complexity: O(n), n = len(s)
Space complexity: O(c), c = unique char
"""
class Solution:
    def longestNiceSubstring(self, s: str) -> str:
        if len(s) < 2: return ''
        c_set = set()

        for c in s: c_set.add(c)

        for i in range(len(s)):
            if s[i].upper() in c_set and s[i].lower() in c_set:
                continue
            
            left = self.longestNiceSubstring(s[:i])
            right = self.longestNiceSubstring(s[i + 1:])

            return left if len(left) >= len(right) else right
        return s