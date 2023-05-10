/*
 * @lc app=leetcode id=155 lang=typescript
 *
 * [155] Min Stack
 */

// @lc code=start

class MinStack {

    arr: Array<[number, number]>;

    constructor() { this.arr = []; }

    push(val: number): void {
        if (this.arr.length === 0) { this.arr.push([val, val]); return; }
        const lastMin = this.getMin();
        this.arr.push(val < lastMin ? [val, val] : [val, lastMin]);
    }

    pop(): void {
        this.arr.pop();
    }

    top(): number { return this.arr[this.arr.length - 1][0]; }

    getMin(): number { return this.arr[this.arr.length - 1][1]; }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end