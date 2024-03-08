/*
 * @lc app=leetcode id=341 lang=typescript
 *
 * [341] Flatten Nested List Iterator
 */


// This is the interface that allows for creating nested lists.
// You should not implement it, or speculate about its implementation
class NestedInteger {
    private val: Array<number | number[]>;

    // If value is provided, then it holds a single integer
    // Otherwise it holds an empty nested list
    constructor(value?: number) {
        this.val = [value];
    };

    // Return true if this NestedInteger holds a single integer, rather than a nested list.
    isInteger(): boolean { return this.val.length === 1 && !Array.isArray(this.val[0]); };

    // Return the single integer that this NestedInteger holds, if it holds a single integer
    // Return null if this NestedInteger holds a nested list
    getInteger(): number | null {
        return this.isInteger() ? this.val[0] as number : null;
    };

    // Set this NestedInteger to hold a single integer equal to value.
    setInteger(value: number) { this.val = [value]; };

    private setList(value: number[]) { this.val = value; } 

    // Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
    add(elem: NestedInteger) { this.val.push(this.decompose(elem)); };

    // Return the nested list that this NestedInteger holds,
    // or an empty list if this NestedInteger holds a single integer
    getList(): NestedInteger[] { return this.val.map(v => this.compose(v)); };

    private compose(val: number | number[]): NestedInteger {
        const res = new NestedInteger();
        if (Array.isArray(val)) {
            res.setList(val);
        } else {
            res.setInteger(val);
        }

        return res;
    }

    private decompose(nested: NestedInteger): number | number[] {
        if (Array.isArray(nested.val)) {
            let res: number[] = [];
            for (const n of nested.val) {
                if (Array.isArray(n)) {
                    res = res.concat(n);
                } else {
                    res.push(n);
                }
            }
            return res;
        }

        return nested.getInteger();
    }
};

// @lc code=start

 class NestedIterator {

    cnt: number;
    list: number[];

    constructor(nestedList: NestedInteger[]) {
        this.cnt = -1;
        this.list = [];
		for (const list of nestedList) {
            this.list = this.list.concat(this.flatten(list));
        }
    }

    /**
     * Time complexity: O(n)
     * Space complexity: O(n)
     */
    private flatten(l: NestedInteger): number[] {
        if (l.isInteger()) { return [l.getInteger()]; }
        let subList: NestedInteger[] = l.getList();
        if (subList.length === 0) { return new Array<number>(); }
        let res: number[] = [];

        for (const sl of subList) { res = res.concat(this.flatten(sl)); }        
        return res;
    }

    /**
     * Time complexity: O(1)
     * Space complexity: O(1)
     */
    hasNext(): boolean { return this.cnt < this.list.length - 1; }

    /**
     * Time complexity: O(1)
     * Space complexity: O(1)
     */
	next(): number { return this.list[++this.cnt]; }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new NestedIterator(nestedList)
 * var a: number[] = []
 * while (obj.hasNext()) a.push(obj.next());
 */
// @lc code=end

