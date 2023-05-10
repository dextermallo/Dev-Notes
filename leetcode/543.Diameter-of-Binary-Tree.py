# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
"""
https://leetcode.com/problems/diameter-of-binary-tree/description/

Time complexity: O(n), n = len(root)
Space complexity: O(1)
"""
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        res = 0

        def find_max_path(node: Optional[TreeNode]) -> int:
            nonlocal res
            
            if not node: return 0
            left, right = find_max_path(node.left), find_max_path(node.right)
            res = max(res, left + right)
            return max(left, right) + 1

        find_max_path(root)
        return res