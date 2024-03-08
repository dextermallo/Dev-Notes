"""
https://leetcode.com/problems/check-if-the-sentence-is-pangram/description/

Time complexity: O(n), n = len(sentence)
Space complexity: O(1)
"""
class Solution:
    def checkIfPangram(self, sentence: str) -> bool:
        return len(set(sentence)) == 26