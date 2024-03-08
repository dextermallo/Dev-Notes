"""
https://leetcode.com/problems/word-search-ii/description/
Ref: https://leetcode.com/problems/word-search-ii/solutions/2779789/python-c-java-rust-dfs-using-trie-with-removal-with-detailed-comments/

Time complexity: O(W * len(words) + mnW), mn = size of board, W = max len word
Space complexity: O(total char)
"""
class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        m, n, res = len(board), len(board[0]), set()
        
        # O(W * len(words))
        tire = Tire(set(words))

        def dfs(i: int, j: int, cur: str):
            # O(W)
            if tire.search(cur):
                res.add(cur)
                tire.remove(cur)

            char = board[i][j]
            board[i][j] = '#'
            # O(W)
            for [x, y] in [[1, 0], [-1, 0], [0, 1], [0, -1]]:
                tmp_i, tmp_j = i + x, j + y
                if 0 <= tmp_i < m and 0 <= tmp_j < n and board[tmp_i][tmp_j] != '#':
                    if tire.starts_with(cur + board[tmp_i][tmp_j]): 
                        dfs(tmp_i, tmp_j, cur + board[tmp_i][tmp_j])
            board[i][j] = char

        # O(mn)
        for i in range(m):
            for j in range(n):
                dfs(i, j, board[i][j])
        return res

class Tire:

    def __init__(self, list: list[str]):
        self.tire = {}
        for word in list: self.insert(word)

    # O(W)
    def insert(self, word: str):
        cur = self.tire
        for c in word:
            if c not in cur: cur[c] = {}
            cur = cur[c]
        cur['#'] = '#'
    
    # O(W)
    def starts_with(self, prefix: str) -> bool:
        cur = self.tire
        for c in prefix:
            if c not in cur: return False
            cur = cur[c]
        return True

    # O(W)
    def search(self, word: str) -> bool:
        cur = self.tire
        for c in word:
            if c not in cur: return False
            cur = cur[c]
        return '#' in cur
    
    # O(W)
    def remove(self, word: str):
        cur = self.tire
        nodes = []

        for c in word:
            if c not in cur: return
            cur = cur[c]
            nodes.append((cur, c))

        if '#' in cur: 
            p = '#'
            for mp, c in nodes[::-1]:
                if len(mp[p]) == 0 or p == '#': del mp[p]
                p = c
            
