/*
 * @lc app=leetcode id=381 lang=typescript
 *
 * [381] Insert Delete GetRandom O(1) - Duplicates allowed
 */

// @lc code=start
/**
 * Time complexity: 
 *  - insert(): O(1)
 *  - remove(): O(1)
 *  - getRandom(): O(1)
 * Space complexity: O(n)
 */
class RandomizedCollection {

    mp: Record<number, Set<number>> = {};
    arr: number[] = [];

    constructor() { }

    insert(val: number): boolean {
        const notDuplicated = this.mp[val] === undefined;
        if (notDuplicated) { this.mp[val] = new Set<number>(); }
        this.mp[val].add(this.arr.length);
        this.arr.push(val);
        return notDuplicated;
    }

    remove(val: number): boolean {
        if (this.mp[val] === undefined) { return false; }

        if (this.arr[this.arr.length - 1] === val) {
            this.mp[val].delete(this.arr.length - 1);
            this.arr.pop();
            if (this.mp[val].size === 0) { delete this.mp[val]; }
            return true;
        }
        const lastIdx = this.arr.length - 1;
        const lastVal = this.arr[lastIdx];
        const curIdx = this.getFirstInSet<number>(this.mp[val]) as number;
        this.arr[curIdx] = lastVal;
        this.mp[lastVal].delete(lastIdx);
        this.mp[lastVal].add(curIdx);
        this.mp[val].delete(curIdx);
        if (this.mp[val].size === 0) { delete this.mp[val]; }
        this.arr.pop();
        return true;
    }

    getRandom(): number {
        return this.arr[Math.trunc(Math.random() * this.arr.length)];
    }

    getFirstInSet<T>(set: Set<T>): T | undefined {
        for (const k of set.values()) { return k; }
    }
}

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = new RandomizedCollection()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end