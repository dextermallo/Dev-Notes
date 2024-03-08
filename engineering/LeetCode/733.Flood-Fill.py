"""
https://leetcode.com/problems/flood-fill/description/

Time complexity: O(n), n = size of image
Space complexity: O(1)
"""
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        m, n, start_color = len(image), len(image[0]), image[sr][sc]

        if color == start_color:
            return image

        def dfs(i: int, j: int):
            if i < 0 or i >= m or j < 0 or j >= n or image[i][j] != start_color:
                return
            
            image[i][j] = color
            dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1)
        
        dfs(sr, sc)

        return image