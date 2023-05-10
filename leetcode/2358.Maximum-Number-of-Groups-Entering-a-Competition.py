"""
https://leetcode.com/problems/maximum-number-of-groups-entering-a-competition/description/

First approach, brute force

Time complexity: O(nlogn), n = len(grades)
Space complexity: O(1)
"""
# class Solution:
#     def maximumGroups(self, grades: List[int]) -> int:
#         res = 1
#         grades.sort()

#         cur_n = 0; cur_sum = 0; prev_n = 1; prev_sum = grades[0]
#         for n in grades[1:]:
#             cur_n += 1
#             cur_sum += n
#             if cur_n > prev_n and cur_sum > prev_sum:
#                 res += 1
#                 prev_n, cur_n = cur_n, 0
#                 prev_sum, cur_sum = cur_sum, 0

#         return res

"""
Second approach

Reference: https://leetcode.com/problems/maximum-number-of-groups-entering-a-competition/solutions/2357789/java-c-python-one-line-o-1/
(Actually it is just a math problem, can be solved with O(1) time complexity)

Time complexity: O(log1000)
Space complexity: O(1)
"""
class Solution:
    def maximumGroups(self, grades: List[int]) -> int:
        l = 1; r = 1000
        while l < r:
            k = (l + r + 1) // 2            
            if k * (k + 1) // 2 > len(grades):
                r = k - 1
            else:
                l = k

        return l