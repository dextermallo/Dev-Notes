# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
"""
https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree/description/

Time complexity: O(n) for initialization, O(1) for self.find(), n = len(root)
Space complexity: O(n)
"""
class FindElements:

    def __init__(self, root: Optional[TreeNode]):
        self.root = root
        self.s = set()
        root.val = 0

        def dfs(node: Optional[TreeNode]):
            self.s.add(node.val)

            if node.left is not None:
                node.left.val = node.val * 2 + 1
                dfs(node.left)
            
            if node.right is not None:
                node.right.val = node.val * 2 + 2
                dfs(node.right)

        dfs(self.root)
            

    def find(self, target: int) -> bool:
        return target in self.s


# Your FindElements object will be instantiated and called as such:
# obj = FindElements(root)
# param_1 = obj.find(target)
