"""
https://leetcode.com/problems/top-k-frequent-elements/description/
https://leetcode.com/problems/top-k-frequent-elements/solutions/81602/java-o-n-solution-bucket-sort/?orderBy=most_votes


Time complexity: O(n), n = len(nums)
Space complexity: O(n)
"""
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        cnt = {}
        # O(n), n = len(nums)
        for n in nums: cnt[n] = 1 if n not in cnt else cnt[n] + 1
        bucket = [[] for i in range(len(nums) + 1)]
        
        # O(m), m = different nums, where m < n
        for key in cnt:
            bucket[cnt[key]].append(key)

        res = []

        # O(n)
        for i in range(len(nums), 0, -1):
            if len(bucket[i]) == 0: continue

            res += bucket[i]
            k -= len(bucket[i])
            if k <= 0: break
            
        return res