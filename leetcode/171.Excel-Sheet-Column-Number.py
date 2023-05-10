"""
https://leetcode.com/problems/excel-sheet-column-number/description/

Time complexity: O(n), n = len(columnTitle)
Space complexity: O(1)
"""
class Solution:
    def titleToNumber(self, columnTitle: str) -> int:
        sum = 0
        for c in columnTitle:
            sum = sum * 26 + ord(c) - ord('A') + 1
        return sum