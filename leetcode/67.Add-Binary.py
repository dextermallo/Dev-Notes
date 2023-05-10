"""
https://leetcode.com/problems/add-binary/description/

Time complexity: O(n), n = max(a, b)
Space complexity: O(n)
"""
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        idx_a, idx_b, up, res = len(a) - 1, len(b) - 1, False, ""

        while idx_a > -1 or idx_b > -1:
            val_a, val_b = 0 if idx_a < 0 else int(a[idx_a]), 0 if idx_b < 0 else int(b[idx_b])
            cur_sum = val_a + val_b + (1 if up else 0)
        
            up = cur_sum > 1
            res = ("1" if cur_sum % 2 == 1 else "0") + res

            idx_a -= 1
            idx_b -= 1

        return res if not up else "1" + res