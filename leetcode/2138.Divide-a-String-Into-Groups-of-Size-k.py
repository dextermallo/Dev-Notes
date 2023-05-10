"""
https://leetcode.com/problems/divide-a-string-into-groups-of-size-k/description/

Time complexity: O(n), n = len(s)
Space complexity: O(n)
"""
class Solution:
    def divideString(self, s: str, k: int, fill: str) -> List[str]:
        res, cur = [], ''

        for c in s:
            cur += c
            if len(cur) == k:
                res.append(cur)
                cur = ''
        
        if len(cur) != 0:
            cur += fill * (k - len(cur))
            res.append(cur)
        return res
    