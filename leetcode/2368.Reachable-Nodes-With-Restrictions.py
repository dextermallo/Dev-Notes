"""
https://leetcode.com/problems/reachable-nodes-with-restrictions/description/

Time complexity: O(n), n = number of nodes
Space complexity:  O(n)
"""
class Solution:
    def reachableNodes(self, n: int, edges: List[List[int]], restricted: List[int]) -> int:
        # node1: set<node2>
        mp, r = {}, set(restricted)

        for [x, y] in edges:
            if x in r or y in r: continue
            if x not in mp: mp[x] = set()
            if y not in mp: mp[y] = set()
            mp[x].add(y)
            mp[y].add(x)
        
        marked = set()

        def dfs(i: int):
            if i in mp:
                for n in mp[i]:
                    if n not in marked:
                        marked.add(n)
                        dfs(n)

        dfs(0)

        return len(marked) + (1 if 0 not in marked else 0)