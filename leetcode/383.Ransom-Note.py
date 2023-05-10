"""
https://leetcode.com/problems/ransom-note/description/

Time complexity: O(n + m), n = len(ransomNote), m = len(magazine)
Space complexity: O(1)
"""
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        d = dict()

        for c in magazine:
            d[c] = 1 if c not in d else d[c] + 1
        
        for c in ransomNote:
            if c not in d or d[c] == 0:
                return False
            d[c] -= 1
        
        return True