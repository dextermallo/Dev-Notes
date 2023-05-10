/*
 * @lc app=leetcode id=380 lang=typescript
 *
 * [380] Insert Delete GetRandom O(1)
 */

// @lc code=start

/**
 * @see https://leetcode.com/problems/insert-delete-getrandom-o1/discuss/85401/Java-solution-using-a-HashMap-and-an-ArrayList-along-with-a-follow-up.-(131-ms)
 * Time complexity:
 *  - insert():  O(1)
 *  - remove(): O(1)
 *  - getRandom(): O(1)
 * Space complexity: O(n)
 */
class RandomizedSet {
    mp: Record<number, number> = {};
    arr: number[] = [];
    constructor() { }

    insert(val: number): boolean {
        if (this.mp[val] !== undefined) { return false; }
        this.mp[val] = this.arr.length;
        this.arr.push(val);
        return true;
    }

    remove(val: number): boolean { 
        if (this.mp[val] === undefined) { return false; }

        const delIdx = this.mp[val];
        const swapVal = this.arr[this.arr.length - 1];
        this.arr[delIdx] = swapVal;
        this.mp[swapVal] = delIdx;
        this.mp[val] = undefined;
        this.arr.pop();
        return true;
    }

    getRandom(): number {
        return this.arr[Math.trunc(Math.random() * this.arr.length)];
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end

