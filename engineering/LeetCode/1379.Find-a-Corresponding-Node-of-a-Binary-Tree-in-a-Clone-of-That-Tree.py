# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


"""
https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree/description/

Time complexity: O(n), n = len(node)
Space complexity: O(1)
"""
class Solution:
    def getTargetCopy(self, original: TreeNode, cloned: TreeNode, target: TreeNode) -> TreeNode:
        
        res: TreeNode = None

        def dfs(o: TreeNode, c: TreeNode):
            nonlocal res
            if o is None or res is not None: return
            if o == target: 
                res = c
                return
            
            dfs(o.left, c.left)
            dfs(o.right, c.right)
        
        dfs(original, cloned)
        return res