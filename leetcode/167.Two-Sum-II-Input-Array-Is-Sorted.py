"""
https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/

Time complexity: O(n), n = len(numbers)
Space complexity: O(1) 
"""
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        l, r = 0, len(numbers) - 1

        while l < r:
            sum = numbers[l] + numbers[r]

            if sum == target:
                break
            elif sum > target:
                r -= 1
            else:
                l += 1
        
        return [l + 1, r + 1]

