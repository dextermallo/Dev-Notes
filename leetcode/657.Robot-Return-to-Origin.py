"""
https://leetcode.com/problems/robot-return-to-origin/description/

Time complexity: O(n), n = len(moves)

Space complexity: O(1)
"""

class Solution:
    def judgeCircle(self, moves: str) -> bool:
        up, left = 0, 0

        for c in moves:
            if c == 'U':
                up += 1
            elif c == 'D':
                up -= 1
            elif c == 'L':
                left += 1
            else:
                left -= 1
        
        return up == 0 and left == 0