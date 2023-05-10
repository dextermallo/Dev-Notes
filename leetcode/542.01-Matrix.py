"""
https://leetcode.com/problems/01-matrix/description/

Time complexity: O(n * m), m = len(mat), n = len(mat[0])
Space complexity: O(1)
"""
class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        n_max = m + n

        for i in range(m):
            for j in range(n):
                if mat[i][j] == 0: continue
                top = mat[i][j - 1] if j > 0 else n_max
                left = mat[i - 1][j] if i > 0 else n_max

                mat[i][j] = min(top, left) + 1
        
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if mat[i][j] == 0: continue
                right = mat[i][j + 1] if j < n - 1 else n_max
                bottom = mat[i + 1][j] if i < m - 1 else n_max
                mat[i][j] = min(mat[i][j], min(right, bottom) + 1)
        
        return mat