const findPrimeBelow = (n: number): number[] => {
    if (n < 2) { return []; }

    const res: number[] = [2];
    
    for (let i = 3; i < n; i += 2) {
        let isPrime = true;
        for (let j = 0; j < res.length && res[j] ** 2 < i; ++j) {
            if (i % res[j] === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) { res.push(i); }
    }

    return res;
};

const gcd = (a: number, b: number): number => {
    if (!b) { return a; }
    return gcd(b, a % b);
}