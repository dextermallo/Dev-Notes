/**
 * @description type Timestamp represents UNIX time
 */
type Timestamp = number;

/**
 * @description LWWSet stores the data T along with Timestamp
 */
type LWWSet<T> = Map<T, Timestamp>;

/**
 * @description an abstract class to support Last-Writer-Win of CRDT (Conflict-free replicated data type).
 * @example
 * 
 * ```ts
 * 
 * // to create a simple LWWService with type `number`
 * const lwwService = new LWWService<number>();
 * 
 * // to add a datum
 * lwwService.add(1);
 * lwwService.add(2);
 * 
 * // to lookup a datum
 * lwwService.lookup(1); // true
 * lwwService.lookup(3); // false
 * 
 * // to remove a datum
 * lwwService.remove(1);
 * lwwService.lookup(1); // false
 * 
 * const lwwService2 = new LWWService<number>();
 * lwwService2.add(1);
 * lwwService2.add(2);
 * lwwService2.add(3);
 * 
 * // check if lwwService is a subset of lwwService2
 * lwwService.compare(lwwService2); // true
 * 
 * // merge two LWWService
 * lwwService.merge(lwwService2);
 * lwwService.lookup(3); // true
 * ```
 */
export abstract class LWWService<T> {
    /**
     * @description addSet stores when an element is stated as added
     */
    addSet: LWWSet<string>;

    /**
     * @description addSet stores when an element is stated as deleted
     */
    removeSet: LWWSet<string>;

    constructor() {
        this.addSet = new Map<string, Timestamp>();
        this.removeSet = new Map<string, Timestamp>();
    }

    /**
     * @description adds a stated change in addSet
     * @param obj - `required`. the element that requires to stored as `added`.
     * @param timestamp - `optional`. By default, the insert time will be timestamp when the data is be added into addSet.
     */
    add(obj: T, timestamp: Timestamp = undefined) {
        timestamp = timestamp ?? Date.now();
        if (this.LWWSetHas(this.addSet, obj)) {
            const curTimestamp = this.LWWSetGet(this.addSet, obj);
            if (curTimestamp < timestamp) {
                this.LWWSetSet(this.addSet, obj, timestamp);
            }
        } else {
            this.LWWSetSet(this.addSet, obj, timestamp);
        }
    }

    /**
     * @description adds a stated change in removeSet
     * @param obj - `required`. the element that requires to store as `removed`.
     * @param timestamp - `optional`. By default, the insert time will be timestamp when the data is be added into removeSet.
     */
    remove(obj: T, timestamp: Timestamp = undefined) {
        timestamp = timestamp ?? Date.now();
        if (this.LWWSetHas(this.removeSet, obj)) {
            if (timestamp > this.LWWSetGet(this.removeSet, obj)) {
                this.LWWSetSet(this.removeSet, obj, timestamp);
            }
        } else {
            this.LWWSetSet(this.removeSet, obj, timestamp);
        }
    }

    /**
     * @description check whether an element is exist by the current states
     * @param obj - `required`. Object which requires to lookup
     * @returns true if it is exist.
     */
    lookup(obj: T): boolean {
        if (!this.LWWSetHas(this.addSet, obj)) { return false; }
        if (!this.LWWSetHas(this.removeSet, obj)) { return true;}
        return this.LWWSetGet(this.removeSet, obj) < this.LWWSetGet(this.addSet, obj);
    }

    /**
     * @description check whether self is a subset of other
     * @param other - `required`. Other LWWService which requires to compare
     * @returns true if self is a subset of other
     */
    compare(other: LWWService<T>): boolean {
        for (const prop of this.addSet.keys()) {
            if (!this.LWWSetHas(other.addSet, prop)) { return false; }
        }
        for (const prop of this.removeSet.keys()) {
            if (!this.LWWSetHas(other.removeSet, prop)) { return false; }
        }
        return true;
    }

    /**
     * @description merge self with other LWWService
     * @param other - `required`. Other LWWService which requires to merge with self
     */
    async merge(other: LWWService<T>) {
        const mergeSet = (a: LWWSet<string>, b: LWWSet<string>): LWWSet<string> => {
            let res = new Map<string, Timestamp>();
            a.forEach((val, key) => {
                if (!this.LWWSetHas(b, key)) {
                    this.LWWSetSet(res, key, val);
                } else {
                    this.LWWSetSet(res, key, Math.max(this.LWWSetGet(b, key)!, val));
                }
            });            
            b.forEach((val, key) => { if (!this.LWWSetHas(res, key)) { this.LWWSetSet(res, key, val); }});
            return res;
        }
        this.addSet = mergeSet(this.addSet, other.addSet);
        this.removeSet = mergeSet(this.removeSet, other.removeSet);
        await this.postMergeFn();
    }

    /**
     * @description the inherited class can extend function which will be ran after LWWService.merge() be called
     */
    abstract postMergeFn(): void | Promise<void>;

    /**
     * @description check obj is in the given set
     * @param set - `required`.
     * @param obj - `required`.
     * @returns true if obj is in the given set
     */
    LWWSetHas = (set: LWWSet<string>, obj: T | string): boolean =>
        typeof(obj) === 'string' ? set.has(obj) : set.has(JSON.stringify(obj));
    
    /**
     * @description add the obj into the given set.
     * @param set - `required`.
     * @param obj - `required`.
     * @param timestamp - `required`.
     */
    LWWSetSet = (set: LWWSet<string>, obj: T | string, timestamp: Timestamp) =>
        typeof(obj) === 'string' ? set.set(obj, timestamp) : set.set(JSON.stringify(obj), timestamp);

    /**
     * @description get timestamp by the given obj in set.
     * @param set - `required`.
     * @param obj - `required`.
     * @returns timestamp if obj is exist, otherwise, return null.
     */
    LWWSetGet = (set: LWWSet<string>, obj: T | string): Timestamp =>
        typeof(obj) === 'string' ? set.get(obj) : set.get(JSON.stringify(obj));
}