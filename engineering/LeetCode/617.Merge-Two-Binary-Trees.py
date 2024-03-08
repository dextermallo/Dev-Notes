# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/merge-two-binary-trees/description/

Time complexity: O(n1 + n2)
Space complexity: O(1)
"""
class Solution:
    def mergeTrees(self, n1: Optional[TreeNode], n2: Optional[TreeNode]) -> Optional[TreeNode]:
        if n1 is None and n2 is None: return None
        if n1 is None: return n2
        if n2 is None: return n1

        n1.val += n2.val
        n1.left = self.mergeTrees(n1.left, n2.left)
        n1.right = self.mergeTrees(n1.right, n2.right)

        return n1