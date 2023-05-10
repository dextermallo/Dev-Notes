"""
https://leetcode.com/problems/largest-3-same-digit-number-in-string/description/

Time complexity: O(n), n = len(num)
Space complexity: O(1)
"""
class Solution:
    def largestGoodInteger(self, num: str) -> str:
        cur_max = -1

        for i in range(0, len(num) - 2):
            if num[i] == num[i + 1] == num[i + 2]:
                cur_max = max(int(num[i]), cur_max)
        
        return "" if cur_max == -1 else str(cur_max) * 3