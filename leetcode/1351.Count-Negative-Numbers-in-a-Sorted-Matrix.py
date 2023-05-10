"""
https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/description/

Time complexity: O(logn * m), n = len(grid[0]), m = len(grid)
Space complexity: O(1) 
"""
class Solution:
    def countNegatives(self, grid: list[list[int]]) -> int:
        res = 0

        for g in grid:
            l, r = 0, len(g) - 1
            while l < r:
                mid = (l + r) // 2
                if g[mid] < 0:
                    r = mid
                else:
                    l = mid + 1
            res += len(g) - l if g[l] < 0 else 0
        return res

sol = Solution()
print(sol.countNegatives([[3,2],[1,0]]))