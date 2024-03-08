"""
https://leetcode.com/problems/combination-sum/description/

Time complexity: O(n^2), n = len(candidates)
assume candidates = [2,3,4,5, ..., target]
candidates[0] = 2 will pass through target / 2 times, and each will pass though less than target / 2 times

Space complexity: < O(n ** 2)
"""
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []

        candidates.sort()

        def helper(cur_idx: int, left: int, arr: List[int]):
            nonlocal res
            
            if left == 0:
                res.append([*arr])
                return
            
            for i in range(cur_idx, len(candidates)):
                if left < candidates[i]: break

                arr.append(candidates[i])
                helper(i, left - candidates[i], arr)
                arr.pop()
                    
        helper(0, target, [])
        return res