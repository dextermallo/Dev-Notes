"""
https://leetcode.com/problems/max-area-of-island/description/

Time complexity:(nm), nm = grid size
Space complexity: O(1)
"""
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        res, m, n = 0, len(grid), len(grid[0])

        def dfs(x: int, y: int) -> int:
            if x < 0 or x >= m or y < 0 or y >= n or grid[x][y] == 0: return 0
            grid[x][y] = 0
            return 1 + dfs(x + 1, y) + dfs(x - 1, y) + dfs(x, y + 1) + dfs(x, y - 1)


        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    res = max(res, dfs(i, j))
        
        return res