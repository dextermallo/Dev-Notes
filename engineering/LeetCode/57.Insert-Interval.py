"""
https://leetcode.com/problems/insert-interval/description/

Time complexity: O(n), n = len(intervals)
Space complexity: O(n)
"""
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        left, right, start, end = [], [], newInterval[0], newInterval[1]

        for [s, e] in intervals:
            if e < start:
                left.append([s, e])
            elif s > end:
                right.append([s, e])
            else:
                start = min(s, start)
                end = max(e, end)
        
        return [*left, [start, end], *right]