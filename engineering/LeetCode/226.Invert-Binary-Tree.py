class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


"""
https://leetcode.com/problems/invert-binary-tree/description/

Time complexity: O(len(root))
Space complexity: O(1)
"""
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root == None:
            return root
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root