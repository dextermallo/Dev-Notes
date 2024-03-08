# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/binary-tree-level-order-traversal/description/

Time complexity: O(n), n = len(root)
Space complexity: O(n)
"""
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []

        def dfs(node: Optional[TreeNode], level: int = 1):
            if node is None: return

            nonlocal res

            if len(res) < level: res.append([])

            res[level - 1].append(node.val)
            dfs(node.left, level + 1)
            dfs(node.right, level + 1)
        
        dfs(root)
        return res