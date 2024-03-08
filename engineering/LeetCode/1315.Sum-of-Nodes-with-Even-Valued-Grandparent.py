# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/description/

Time complexity: O(n)
Space complexity: O(1)
"""
class Solution:
    def sumEvenGrandparent(self, root: TreeNode) -> int:
        res = 0

        def dfs(node: TreeNode, father: int, grand_parent: int):
            if not node: return
            nonlocal res
            if grand_parent % 2 == 0: res += node.val
            dfs(node.left, node.val, father)
            dfs(node.right, node.val, father)

        dfs(root, -1, -1)
        return res

