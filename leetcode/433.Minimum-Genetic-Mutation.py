import sys
from copy import deepcopy


"""
TODO: this one should be able to be optimized

https://leetcode.com/problems/minimum-genetic-mutation/description/

Time complexity: O(n! * 8), n = len(bank)
Space complexity: O(n! * 8)
"""
class Solution:
    def minMutation(self, start: str, end: str, bank: List[str]) -> int:
        if end not in bank: return -1
        res = sys.maxsize
        
        def str_dif_is_one(s1: str, s2: str) -> bool:
            dif = 0
            for i in range(8):
                if s1[i] != s2[i]:
                    dif += 1
                    if dif > 1: return False
            return dif == 1

        def helper(cur: str, step: int, cur_bank: set):
            if cur == end:
                nonlocal res
                res = min(res, step)
                return
            
            for possible_next in cur_bank:
                if str_dif_is_one(possible_next, cur):
                    next_bank = deepcopy(cur_bank)
                    next_bank.remove(possible_next)
                    helper(possible_next, step + 1, next_bank)

        helper(start, 0, set(bank))

        return -1 if res == sys.maxsize else res