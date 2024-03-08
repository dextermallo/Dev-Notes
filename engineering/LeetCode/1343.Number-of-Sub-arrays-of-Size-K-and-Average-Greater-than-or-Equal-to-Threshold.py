"""
https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/

Time complexity: O(n), n = len(arr)

Space complexity: O(1)
"""
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        cur_sum, res = sum(arr[:k]), 0
        threshold *= k

        if cur_sum >= threshold:
            res += 1

        for i in range(k, len(arr)):
            cur_sum = cur_sum - arr[i - k] + arr[i]
            if cur_sum >= threshold:
                res += 1

        return res