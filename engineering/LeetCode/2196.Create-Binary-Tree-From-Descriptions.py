# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

"""
https://leetcode.com/problems/create-binary-tree-from-descriptions/description/

Time complexity: O(n), n = node size
Space complexity: O(n + d), d = len(description)
"""

class Solution:
    def createBinaryTree(self, descriptions: List[List[int]]) -> Optional[TreeNode]:
        # mp represents val(int): node(TreeNode)
        mp, p, c = {}, set(), set()

        for [parent, child, is_left] in descriptions:
            p.add(parent)
            c.add(child)
            cur_parent = mp[parent] if parent in mp else TreeNode(parent)
            cur_child = mp[child] if child in mp else TreeNode(child)
                    
            if is_left:
                cur_parent.left = cur_child
            else:
                cur_parent.right = cur_child

            mp[parent] = cur_parent
            mp[child] = cur_child
            
        for pi in p:
            if pi not in c:
                return mp[pi]