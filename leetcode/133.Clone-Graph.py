"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

"""
https://leetcode.com/problems/clone-graph/description/

Time complexity: O(n), n = len(node)
Space complexity: O(n)
"""
class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        mp = {}

        def clone(cur: Node) -> Node | None:
            if cur is None: return None
            if cur.val in mp: return mp[cur.val]
            new_node = Node(cur.val)
            mp[new_node.val] = new_node
            for n in cur.neighbors: new_node.neighbors.append(clone(n))
            return new_node

        return clone(node)