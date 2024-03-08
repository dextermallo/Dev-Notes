"""
https://leetcode.com/problems/reverse-vowels-of-a-string/description/

Time complexity: O(n), n = len(s)
Space complexity: O(n)
"""
class Solution:
    def reverseVowels(self, s: str) -> str:
        l, r, left, right = 0, len(s) - 1, '', ''
        vol_set = set(list('aeiouAEIOU'))

        while l < r:
            while s[l] not in vol_set and l < r:
                left += s[l]
                l += 1
            while s[r] not in vol_set and l < r:
                right = s[r] + right
                r -= 1

            if l < r:
                left += s[r]
                right = s[l] + right
                l += 1
                r -= 1

        return left + (s[l] if l == r else '') + right
