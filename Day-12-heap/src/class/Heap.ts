/**
 * @todo documentation
 * @description
 * 
 * @example
 * 
 */
type Comparator<T> = (a: T, b: T) => number;


/**
 * @todo documentation
 * @description
 * @example
 */
export class MaxHeap<T> {
    
    /**
     * @description
     * @default
     */
    private arr: T[];

    /**
     * @description
     * @default
     */
    private comparator: Comparator<T>;

    /**
     * @description
     * @param val
     * @param comparator 
     */
    constructor(
        val: T | T[] = null,
        comparator: Comparator<T> = MaxHeap.defaultComparator
    ) {
        this.arr = [];
        this.comparator = comparator;
        if (!!val) { this.insert(val); }
    }

    /**
     * @description
     * @param a 
     * @param b 
     * @returns 
     */
    static defaultComparator<N>(a: N, b: N): number { return a > b ? 1 : (a < b ? -1 : 0); }

    /**
     * @description
     * @param val
     */
    insert(val: T | T[]) {
        if (Array.isArray(val)) {
            for (const v of val) {
                this.arr.push(v);
                this.heapUp(this.size() - 1);
            }
        }

        this.arr.push(val as T);
        this.heapUp(this.size() - 1);
    }

    /**
     * @description
     * @returns 
     */
    extract(): T | null {
        if (this.size() < 1) { return null; }
        this.swap(0, this.size() - 1);
        const res = this.arr.pop();
        this.heapDown(0);
        return res;
    }

    /**
     * @todo
     */
    delete(val: T) { }

    /**
     * @description
     * @returns 
     */
    peek = (): T | null =>this.arr[0] ?? null;

    /**
     * @description
     * @param val 
     * @returns 
     */
    isExist = (val: T): boolean => this.findIndex(val) !== -1;

    /**
     * @alias
     */
    search = this.isExist;

    /**
     * @description
     * @returns 
     */
    size = (): number => this.arr.length;

    /**
     * @description
     * @param val 
     * @param idx 
     * @returns 
     */
    private findIndex(val: T, idx: number = 0): number {
        if (idx >= this.arr.length) { return -1; }
        if (this.compare(val, this.get(idx)) === 0) { return idx; }
        if (this.compare(val, this.get(idx)) > 0) { return -1; }

        const leftRes = this.findIndex(val, idx * 2 + 1);

        if (leftRes !== -1) { return leftRes; }

        const rightRes = this.findIndex(val, idx * 2 + 2);
        
        return rightRes;
    }

    /**
     * @description
     * @param indexA 
     * @param indexB 
     */
    private swap(indexA: number, indexB: number) {
        if (indexA >= this.size() || indexB >= this.size()) { throw RangeError; } 
        [this.arr[indexA], this.arr[indexB]] = [this.arr[indexB], this.arr[indexA]];
    }

    /**
     * @description
     * @param idx 
     */
    private heapUp(idx: number) {
        let parent = Math.trunc((idx - 1) / 2);
        while (parent > -1 && this.compareByIndex(idx, parent) > 0) {
            this.swap(parent, idx);
            idx = Math.trunc((idx - 1) / 2);
            parent = Math.trunc((idx - 1) / 2);
        }
    }

    /**
     * @description
     * @param idx 
     */
    private heapDown(idx: number) {
        const size = this.size();
        let left = idx * 2 + 1;
        let right = idx * 2 + 2;
 
        while (true) {    
            if (left >= size) { break; } 
            const idxIsBigger = this.compareByIndex(idx, left) > 0 && this.compareByIndex(idx, right) > 0;
            if (idxIsBigger) { break; }
            const leftIsBigger = this.compareByIndex(left, right) > 0;

            this.swap(idx, leftIsBigger ? left : right);
            idx = leftIsBigger ? left : right;
            left = idx * 2 + 1;
            right = idx * 2 + 2;
        }     
    }

    /**
     * @description
     * @param idx 
     * @returns 
     */
    private get = (idx: number): T | null => this.arr[idx];

    /**
     * @description
     * @param a 
     * @param b 
     * @returns 
     */
    private compare = (a: T, b: T): number => this.comparator(a, b);

    /**
     * @description
     * @param idxA 
     * @param idxB 
     * @returns 
     */
    private compareByIndex = (idxA: number, idxB: number): number => this.compare(this.get(idxA), this.get(idxB));
}