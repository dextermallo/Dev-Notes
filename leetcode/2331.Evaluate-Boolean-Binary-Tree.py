class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

"""
https://leetcode.com/problems/evaluate-boolean-binary-tree/description/

Time complexity: O(n), n = len(root)
Space complexity: O(1)
"""
class Solution:
    def evaluateTree(self, root: Optional[TreeNode]) -> bool:
        if root.left == None:
            return root.val == 1
        
        if root.val == 2:
            return self.evaluateTree(root.left) or self.evaluateTree(root.right)
        else:
            return self.evaluateTree(root.left) and self.evaluateTree(root.right)