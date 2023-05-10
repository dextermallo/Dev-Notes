"""
https://leetcode.com/problems/where-will-the-ball-fall/submissions/834779609/

Time complexity: < O(mn)

Space complexity: O(n)
"""
class Solution:
    def findBall(self, grid: List[List[int]]) -> List[int]:
        
        res, m, n = {}, len(grid), len(grid[0])

        if n == 1: return [-1]

        for i in range(0, n): res[i] = i

        for i in range(0, m):
            cur = {}

            for ball_no in res:
                if res[ball_no] == 0:
                    if grid[i][0] == 1 and grid[i][1] == 1: cur[ball_no] = 1
                elif res[ball_no] == n - 1:
                    if grid[i][n - 1] == -1 and grid[i][n - 2] == -1: cur[ball_no] = n - 2
                else:
                    cur_idx = res[ball_no]
                    if grid[i][cur_idx] == 1 and grid[i][cur_idx + 1] == 1:
                        cur[ball_no] = cur_idx + 1
                    elif grid[i][cur_idx] == -1 and grid[i][cur_idx - 1] == -1:
                        cur[ball_no] = cur_idx - 1
            
            res = cur

        r = [-1] * n
        for ball_no in res:
            r[ball_no] = res[ball_no]
        return r