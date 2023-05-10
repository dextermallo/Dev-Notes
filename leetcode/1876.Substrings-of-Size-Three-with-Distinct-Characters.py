"""
https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/description/

Time complexity: O(n)
Space complexity: O(1)
"""
class Solution:
    def countGoodSubstrings(self, s: str) -> int:
        res = 0
        
        if len(s) < 3:
            return 0

        cur = s[:3]

        def isDistinct() -> bool:
            return cur[0] != cur[1] and cur[1] != cur[2] and cur[0] != cur[2]

        if isDistinct():
            res += 1

        for i in range(3, len(s)):
            cur = cur[1:] + s[i]

            if isDistinct():
                res += 1

        return res