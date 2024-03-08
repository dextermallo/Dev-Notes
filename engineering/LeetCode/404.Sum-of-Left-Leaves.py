# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/sum-of-left-leaves/description/

Time complexity: O(n)
Space complexity: O(1)
"""
class Solution:
    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:
        res = 0

        def dfs(node: Optional[TreeNode]):
            if not node: return
            if node.left and (not node.left.left) and (not node.left.right):
                nonlocal res
                res += node.left.val

            dfs(node.left)
            dfs(node.right)

        dfs(root)

        return res