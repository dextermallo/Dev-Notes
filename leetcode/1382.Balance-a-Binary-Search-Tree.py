# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/balance-a-binary-search-tree/description/

Time complexity: O(n), n = len(root)
Space complexity: O(n)
"""
class Solution:
    def balanceBST(self, root: TreeNode) -> TreeNode:
        vals = []

        def dfs(node: TreeNode):
            if node is None: return
            vals.append(node.val)
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        vals.sort()

        def to_balance_BST(l: int, r: int) -> TreeNode:
            if l > r: return None
            if l == r: return TreeNode(vals[l])
            mid = (r + l) // 2
            cur = TreeNode(vals[mid])
            cur.left = to_balance_BST(l, mid - 1)
            cur.right = to_balance_BST(mid + 1, r)
            return cur

        return to_balance_BST(0, len(vals) - 1)
