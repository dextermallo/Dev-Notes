/**
 * @todo update documents
 */
type Timestamp = number;


/**
 * @todo update documents
 */
type LWWSet<T> = Map<T, Timestamp>;

/**
 * @todo update documents
 */
export abstract class LWWService<T> {
    /**
     * @todo update documents
     */
    addSet: LWWSet<string>;

    /**
     * @todo update documents
     */
    removeSet: LWWSet<string>;

    constructor() {
        this.addSet = new Map<string, Timestamp>();
        this.removeSet = new Map<string, Timestamp>();
    }

    /**
     * @todo update documents
     * @param obj 
     * @param timestamp 
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
     * @todo update documents
     * @param obj 
     * @param timestamp 
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
     * @todo update documents
     * @param obj 
     * @returns 
     */
    lookup(obj: T): boolean {
        if (!this.LWWSetHas(this.addSet, obj)) { return false; }
        if (!this.LWWSetHas(this.removeSet, obj)) { return true;}
        return this.LWWSetGet(this.removeSet, obj) < this.LWWSetGet(this.addSet, obj);
    }

    /**
     * @todo update documents
     * @param other 
     * @returns 
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
     * @todo update documents
     * @param other 
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
     * @todo update documents
     */
    abstract postMergeFn(): void | Promise<void>;

    /**
     * @todo update documents
     * @param set 
     * @param obj 
     * @returns 
     */
    LWWSetHas = (set: LWWSet<string>, obj: T | string): boolean => 
        typeof(obj) === 'string' ? set.has(obj) : set.has(JSON.stringify(obj));
    
    /**
     * @todo update documents
     * @param set 
     * @param obj 
     * @param value 
     * @returns 
     */
    LWWSetSet = (set: LWWSet<string>, obj: T | string, value: Timestamp) => 
        typeof(obj) === 'string' ? set.set(obj, value) : set.set(JSON.stringify(obj), value);

    /**
     * @todo update documents
     * @param set 
     * @param obj 
     * @returns 
     */
    LWWSetGet = (set: LWWSet<string>, obj: T | string): Timestamp => 
        typeof(obj) === 'string' ? set.get(obj) : set.get(JSON.stringify(obj));
}