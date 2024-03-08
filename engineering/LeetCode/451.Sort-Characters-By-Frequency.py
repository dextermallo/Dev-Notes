"""
https://leetcode.com/problems/sort-characters-by-frequency/description/

Time complexity: O(n), n = len(s)
Space complexity: O(n + ulogu), u = unique char in s
"""
class Solution:
    def frequencySort(self, s: str) -> str:
        mp = dict()

        for c in s:
            mp[c] = 1 if c not in mp else mp[c] + 1
        
        mp = { k: v for k, v in sorted(mp.items(), key=lambda item: item[1], reverse=True) }

        res = ''

        for k, v in mp.items():
            res += k * int(v)
        
        return res