"""
https://leetcode.com/problems/make-the-string-great/description/

Time complexity: O(n), n = len(s)
Space complexity: O(n)
"""
class Solution:
    def makeGood(self, s: str) -> str:
        queue = [s[0]]

        for i in range(1, len(s)):
            queue.append(s[i])
            while len(queue) > 1 and queue[-1] != queue[-2] and queue[-1].lower() == queue[-2].lower():
                queue.pop()
                queue.pop()
        
        return ''.join(queue)