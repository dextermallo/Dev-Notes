"""
https://leetcode.com/problems/maximum-sum-of-an-hourglass/description/

Time complexity: O(n * m), n = len(grid), m = len(grid[0])
Space complexity: O(1)
"""
class Solution:
    def maxSum(self, grid: List[List[int]]) -> int:
        res, m, n = 0, len(grid), len(grid[0])

        for i in range(0, m - 2):
            cur = grid[i][0] + grid[i][1] + grid[i][2] + grid[i + 1][1] \
                + grid[i + 2][0] + grid[i + 2][1] + grid[i + 2][2]
            res = max(res, cur)
            for j in range(1, n - 2):
                cur = cur - grid[i][j - 1] - grid[i + 1][j] - grid[i + 2][j - 1] \
                    + grid[i][j + 2] + grid[i + 1][j + 1] + grid[i + 2][j + 2]
                res = max(res, cur)
        return res