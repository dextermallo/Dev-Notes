"""
https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/description/

TIme complexity: O(n * log(m)), n = len(bloomDay), m = max(bloomDay)
Space complexity: O(1)
"""
class Solution:
    def minDays(self, bloomDay: List[int], m: int, k: int) -> int:
        if m * k > len(bloomDay):
            return -1
        
        l, r = 1, max(bloomDay)

        while l < r:
            mid, cur_m, cur_k = (r - l) // 2 + l, 0, 0

            for i in range(len(bloomDay)):
                if bloomDay[i] > mid:
                    cur_k = 0
                    continue
                
                cur_k += 1

                if cur_k == k:
                    cur_k = 0
                    cur_m += 1
                
            if cur_m >= m:
                r = mid
            else:
                l = mid + 1
        
        return l