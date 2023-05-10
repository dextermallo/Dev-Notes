class Node:
    end: bool
    next: dict
    def __init__(self):
        self.end = False
        self.next = dict()

"""
https://leetcode.com/problems/implement-trie-prefix-tree/description/

Time complexity:
 - insert: O(n), n = len(word)
 - search: O(n)
 - startsWith: O(n)
Space complexity: < O(s), s = len(total word)
"""
class Trie:

    root: Node

    def __init__(self):
        self.root = Node()

    def insert(self, word: str) -> None:
        cur = self.root
        for c in word:
            if c not in cur.next: cur.next[c] = Node()
            cur = cur.next[c]
        cur.end = True
            
    def search(self, word: str) -> bool:
        cur = self.root
        for c in word:
            if c not in cur.next: return False
            cur = cur.next[c]
        return cur.end
            
    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for c in prefix:
            if c not in cur.next: return False
            cur = cur.next[c]
        return True