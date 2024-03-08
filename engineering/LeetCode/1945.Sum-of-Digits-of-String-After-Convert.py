"""
https://leetcode.com/problems/sum-of-digits-of-string-after-convert/description/

Time complexity: O(k * m), m = len(s) where m is dynamic
Space complexity: O(n), n = len(s)
"""
class Solution:
    def getLucky(self, s: str, k: int) -> int:
        arr = [(ord(i) - ord('a') + 1) for i in list(s)]

        cur_sum = 0

        for n in arr:
            cur_sum += n if n < 10 else n % 10 + n // 10
        
        prev_sum, cur_sum = cur_sum, 0
        for i in range(1, k):
            while prev_sum >= 1:
                cur_sum += prev_sum % 10
                prev_sum //= 10

            prev_sum, cur_sum = cur_sum, 0

        return prev_sum