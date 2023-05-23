const binaryInsert = (arr: number[], val: number) => {
    let l = 0, r = arr.length - 1;
    while (l <= r) {
        const mid = ~~((r - l) / 2) + l;
        arr[mid] >= val ? l = mid + 1 : r = mid - 1;
    }
    arr.splice(l, 0, val);
}

class KthLargest {
    arr: number[];
    k: number;
    
    // Time complexity: O(nlogn), where n = nums.length
    constructor(k: number, nums: number[]) {
        this.arr = nums.length ? nums.sort((a, b) => b - a).slice(0, k) : [];
        this.k = k;
    }

    // Time complexity: O(logk)
    add(val: number): number {
        binaryInsert(this.arr, val);
        if (this.arr.length > this.k) { this.arr.pop(); }
        return this.arr[this.k - 1];
    }
}