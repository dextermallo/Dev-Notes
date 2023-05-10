# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/delete-leaves-with-a-given-value/description/

Time complexity: O(n), n = len(root)
Space complexity: O(1)
"""
class Solution:
    def removeLeafNodes(self, root: Optional[TreeNode], target: int) -> Optional[TreeNode]:
        if root is None: return None
        if root.left is None and root.right is None and root.val == target: return None

        root.left = self.removeLeafNodes(root.left, target)
        root.right = self.removeLeafNodes(root.right, target)

        if root.left is None and root.right is None and root.val == target: return None
        return root