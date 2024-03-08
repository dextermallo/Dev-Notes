# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/description/

Time complexity: O(n), n = len(root)
Space complexity: O(1)
"""
class Solution:
    def sumRootToLeaf(self, root: Optional[TreeNode]) -> int:
        res = 0

        def dfs(node: Optional[TreeNode], val: int):
            val = val * 2 + node.val

            if node.left is None and node.right is None:
                nonlocal res
                res += val
                return

            if node.left is not None:
                dfs(node.left, val)
            
            if node.right is not None:
                dfs(node.right, val)

        dfs(root, 0)
        return res