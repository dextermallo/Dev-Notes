"""
https://leetcode.com/problems/assign-cookies/description/

Time complexity: O(GlogG + SlogS)
Space complexity: O(1)
"""
class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        # O(GlogG + SlogS)
        g.sort(); s.sort()

        idx, res = 0, 0

        # O(G + S)
        for child in g:
            while idx < len(s) and s[idx] < child: idx += 1
            if idx == len(s): return res
            res += 1
            idx += 1
        return res