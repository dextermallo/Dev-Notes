import bisect

"""
https://leetcode.com/problems/rotating-the-box/submissions/836820584/

can be opt: https://leetcode.com/problems/rotating-the-box/solutions/1210113/simplest-explanation-with-java-solution/?orderBy=most_votes

Time complexity: O(m * n * logn) # logn for bisect
Space complexity: O(mn)
"""
class Solution:
    def rotateTheBox(self, box: List[List[str]]) -> List[List[str]]:
        m, n = len(box), len(box[0])
        
        res = [[''] * m for i in range(n)]

        for i in range(m):
            empty = []
            for j in range(n - 1, -1, -1):
                if box[i][j] == '*':
                    empty = []
                elif box[i][j] == '.':
                    empty = [j] + empty
                else:
                    if len(empty) > 0:
                        next = empty.pop()
                        box[i][j], box[i][next] = '.', '#'
                        bisect.insort(empty, j)
            
            for j in range(n): res[j][m - 1 - i] = box[i][j]
        return res
                