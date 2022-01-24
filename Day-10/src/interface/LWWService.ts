type Timestamp = number;

type LWWSet<T> = Map<T, Timestamp>;

export abstract class LWWService<T> {
    addSet: LWWSet<T>;
    removeSet: LWWSet<T>;

    constructor() {
        this.addSet = new Map<T, Timestamp>();
        this.removeSet = new Map<T, Timestamp>();
    }

    add(obj: T, timestamp: Timestamp = undefined) {
        timestamp = timestamp ?? Date.now();
        if (this.addSet.has(obj)) {
            const curTimestamp = this.addSet.get(obj);
            if (curTimestamp < timestamp) {
                this.addSet.set(obj, timestamp);
            }
        } else {
            this.addSet.set(obj, timestamp);
        }
    }

    remove(obj: T, timestamp: Timestamp = undefined) {
        timestamp = timestamp ?? Date.now();
        if ((this.removeSet.has(obj) && timestamp > this.removeSet.get(obj)) || !this.removeSet.has(obj)) {
            this.removeSet.set(obj, timestamp);
        }
    }

    lookup(obj: T) {
        if (!this.addSet.has(obj)) { return false; }
        if (!this.removeSet.has(obj)) { return true; }
        return this.removeSet.get(obj) < this.addSet.get(obj);
    }

    compare(other: LWWService<T>): boolean {

        for (const prop of this.addSet.keys()) {
            if (!other.addSet.has(prop)) { return false; }
        }

        for (const prop of this.removeSet.keys()) {
            if (!other.removeSet.has(prop)) { return false; }
        }

        return true;
    }

    merge(other: LWWService<T>) {

        const mergeSet = (a: LWWSet<T>, b: LWWSet<T>): LWWSet<T> => {
            let res = new Map<T, Timestamp>();

            a.forEach((val, key) => {
                if (!b.has(key)) {
                    res.set(key, val);
                } else {
                    res.set(key, Math.max(b.get(key)!, val))
                }
            });            
            b.forEach((val, key) => { if (!res.has(key)) { res.set(key, val); }});

            return res;
        }

        this.addSet = mergeSet(this.addSet, other.addSet);
        this.removeSet = mergeSet(this.removeSet, other.removeSet);
    }
}