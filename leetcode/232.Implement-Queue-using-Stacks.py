"""
https://leetcode.com/problems/implement-queue-using-stacks/description/

Time complexity: 
    push: O(1)
    pop: O(n), n = len(input)
    peek: O(n)
    empty: O(1)
Space complexity: O(n) 
"""
class Stack:
    arr: list[int]

    def __init__(self): self.arr = []

    def peek(self) -> None or int: return None if len(self.arr) == 0 else self.arr[-1] 

    def pop(self) -> None or int: return None if len(self.arr) == 0 else self.arr.pop()
    
    def push(self, val: int): self.arr.append(val)
    
    def empty(self) -> bool: return len(self.arr) == 0

class MyQueue:

    input: Stack
    output: Stack

    def __init__(self):
        self.input = Stack()
        self.output = Stack()

    def push(self, x: int) -> None:
        self.input.push(x)

    def pop(self) -> int:
        self.peek()
        return self.output.pop()
    
    def peek(self) -> int:
        if not self.output.empty(): return self.output.peek()
        while not self.input.empty(): self.output.push(self.input.pop())
        return self.output.peek()
        
    def empty(self) -> bool:
        return self.input.empty() and self.output.empty()