"""
https://leetcode.com/problems/number-of-islands/description/

Time complexity: O(m * n), m = len(grid), n = len(grid[0])
Space complexity: O(1)
"""
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        res, m, n = 0, len(grid), len(grid[0])

        def dfs(i: int, j: int):
            if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != '1': return
            grid[i][j] = '0'
            dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1)

        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    res += 1
                    dfs(i, j)
        
        return res