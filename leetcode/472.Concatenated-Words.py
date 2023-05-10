"""
https://leetcode.com/problems/concatenated-words/solutions/
ref: https://leetcode.com/problems/concatenated-words/solutions/159348/python-dfs-readable-solution/

Time complexity: O(nm^3), n = len(words), m = max len of word
Space complexity: O(n)
"""
class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        s = set(words)
        cache = {}

        def dfs(w: str) -> bool:
            # m^3, when constructing a word s,
            # it's like building a 2D-DP for s [0][len(s)]
            # one extra for-loop outside => m^3
            for i in range(1, len(w)):
                prefix, suffix = w[:i], w[i:]
                if prefix in s and suffix in s: return True
                if prefix in s and dfs(suffix): return True
                if suffix in s and dfs(prefix): return True
            return False

        res = []
        # n
        for word in words:
            if word in cache:
                res.append(word)
                continue
            if dfs(word):
                res.append(word)
                cache[word] = True

        return res