"""
https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

Time complexity: O(n), n = len(s)
Space complexity: O(1), because s has limited range of symbols.
"""
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        mp, start, res = {}, 0, 0

        for end in range(len(s)):
            if s[end] in mp:
                start = max(start, mp[s[end]] + 1)
            mp[s[end]] = end
            res = max(res, end - start + 1)
        return res