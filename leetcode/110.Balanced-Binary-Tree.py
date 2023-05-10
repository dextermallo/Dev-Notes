"""
https://leetcode.com/problems/balanced-binary-tree/description/

Time complexity: O(n), n = len(root)
Space complexity: O(1)
"""

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        isValid = True

        def dfs(node: Optional[TreeNode]) -> int:
            nonlocal isValid
            if node == None: return 0
            if not isValid: return -1

            left, right = dfs(node.left), dfs(node.right)

            if abs(left - right) > 1 or left == -1 or right == -1:
                isValid = False
                return -1

            return max(left, right) + 1
            
        dfs(root)
        return isValid