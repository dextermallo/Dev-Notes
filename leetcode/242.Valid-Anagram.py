"""
https://leetcode.com/problems/valid-anagram/description/

Time complexity: O(max(len(s), len(t)))
Space complexity: O(1) # because maximum = 26, unique alphabet in s

"""
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        mp = {}

        for c in s:
            mp.setdefault(c, 0)
            mp[c] += 1
        
        for c in t:
            if mp.get(c) == None:
                return False
            mp[c] -= 1

            if mp[c] < 0:
                return False
        
        for _, val in mp.items():
            if val > 0:
                return False

        return True