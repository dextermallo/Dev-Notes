"""
https://leetcode.com/problems/orderly-queue/description/
ref: https://leetcode.com/problems/orderly-queue/solutions/165878/c-java-python-sort-string-or-rotate-string/?orderBy=most_votes

Time complexity: O(nlogn)m n = len(s)
Space complexity: O(1)
"""
class Solution:
    def orderlyQueue(self, s: str, k: int) -> str:
        if k > 1: return ''.join(sorted(list(s)))

        res = s        
        for i in range(0, len(s)):
            if res > s[i:] + s[:i]: res = s[i:] + s[:i]

        return res