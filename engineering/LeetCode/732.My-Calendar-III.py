from array import array
from bisect import insort

"""
https://leetcode.com/problems/my-calendar-iii/description/

Reference: https://leetcode.com/problems/my-calendar-iii/solutions/109556/java-c-clean-code/?orderBy=most_votes

Time complexity: single time = O(n), n = function call. multiple time: O(nlogn)

Space complexity: O(n), n = function call

"""
class MyCalendarThree:
    time: array

    def __init__(self):
        self.time = []

    def book(self, start: int, end: int) -> int:
        insort(self.time, (start, 1))
        insort(self.time, (end, -1))

        res = 0
        cnt = 0

        for (_, val) in self.time:
            cnt += val
            res = max(res, cnt)
        return res