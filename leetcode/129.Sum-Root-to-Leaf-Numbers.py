# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/sum-root-to-leaf-numbers/description/

Time complexity: O(n)
Space complexity: O(1)
"""
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        res = 0

        def dfs(node: Optional[TreeNode], cur: int):
            if not node.left and not node.right:
                nonlocal res
                res += cur * 10 + node.val
                return
            
            if node.left: dfs(node.left, cur * 10 + node.val)
            if node.right: dfs(node.right, cur * 10 + node.val)

        dfs(root, 0)
        return res