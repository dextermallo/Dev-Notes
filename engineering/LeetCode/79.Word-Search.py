"""
https://leetcode.com/problems/word-search/description/
ref: https://leetcode.com/problems/word-search/solutions/2778070/java-solutions-easy-to-solve/

Time complexity: O(n^2 * m^2), nm = size of board
Space complexity: O(nm)
"""
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        marked = [[False] * n for _ in range(m)]

        # cur for idx of current char in word
        def dfs(i: int, j: int, cur: int) -> bool:
            if cur == len(word): return True
            if i < 0 or i >= m or j < 0 or j >= n or marked[i][j] or board[i][j] != word[cur]: return False

            marked[i][j] = True
            if dfs(i + 1, j, cur + 1) or dfs(i - 1, j, cur + 1) or dfs(i, j + 1, cur + 1) or dfs(i, j - 1, cur + 1): return True
            marked[i][j] = False
            return False

        for x in range(m):
            for y in range(n):
                if board[x][y] == word[0] and dfs(x, y, 0): return True
        return False