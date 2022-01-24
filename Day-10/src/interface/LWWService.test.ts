import { LWWService } from './LWWService';


class TestLWWService extends LWWService<number> { }

describe('LWWService/add' , () => {
    test('should be able to add value into addSet', async () => {
        const lwwService = new TestLWWService();
        lwwService.add(1, 0);
        lwwService.add(2, 1);

        expect(lwwService.addSet.get(1)).toEqual(0);
        expect(lwwService.addSet.get(2)).toEqual(1);
    });

    test('same value should be written as the most recent timestamp in addSet', async () => {
        const lwwService = new TestLWWService();
        lwwService.add(1, 0);
        lwwService.add(1, 1);

        expect(lwwService.addSet.get(1)).toEqual(1);
    });

    test('timestamp should be add accordingly adding without parameter in addSet', async () => {
        const lwwService = new TestLWWService();
        lwwService.add(1);
        lwwService.add(2);
        expect(lwwService.addSet.get(1)).toBeLessThanOrEqual(lwwService.addSet.get(2));

        lwwService.add(1);
        expect(lwwService.addSet.get(2)).toBeLessThanOrEqual(lwwService.addSet.get(1));
    });
});

describe('LWWService/remove' , () => {
    test('should be able to add value into removeSet', async () => {
        const lwwService = new TestLWWService();
        lwwService.remove(1, 0);
        lwwService.remove(2, 1);

        expect(lwwService.removeSet.get(1)).toEqual(0);
        expect(lwwService.removeSet.get(2)).toEqual(1);
    });

    test('same value should be written as the most recent timestamp in removeSet', async () => {
        const lwwService = new TestLWWService();
        lwwService.remove(1, 0);
        lwwService.remove(1, 1);

        expect(lwwService.removeSet.get(1)).toEqual(1);
    });

    test('timestamp should be add accordingly adding without parameter in removeSet', async () => {
        const lwwService = new TestLWWService();
        lwwService.remove(1);
        lwwService.remove(2);
        expect(lwwService.removeSet.get(1)).toBeLessThanOrEqual(lwwService.removeSet.get(2));

        lwwService.remove(1);
        expect(lwwService.removeSet.get(2)).toBeLessThanOrEqual(lwwService.removeSet.get(1));
    });
});

describe('LWWService/lookup' , () => {
    test('lookup an existing value should be true', async () => {
        const lwwService = new TestLWWService();
        lwwService.add(1);
        lwwService.add(2);
        lwwService.add(3);
        
        expect(lwwService.lookup(1)).toBeTruthy();
        expect(lwwService.lookup(2)).toBeTruthy();
        expect(lwwService.lookup(3)).toBeTruthy();
    });

    test('lookup a non-existing value should be false', async () => {
        const lwwService = new TestLWWService();
        lwwService.add(1);
        lwwService.add(2);
        lwwService.add(3);
        lwwService.remove(2);
        lwwService.add(2);
        lwwService.remove(2);
        lwwService.remove(5);
        
        expect(lwwService.lookup(2)).toBeFalsy();
        expect(lwwService.lookup(4)).toBeFalsy();
        expect(lwwService.lookup(5)).toBeFalsy();
    });
});

describe('LWWService/compare' , () => {
    test('instance as a subset of the given params should return true', async () => {
        const lwwServiceA = new TestLWWService();
        lwwServiceA.add(1, 0);
        lwwServiceA.add(2, 0);
        lwwServiceA.add(3, 0);
        lwwServiceA.add(4, 1);
        lwwServiceA.add(5, 2);
        lwwServiceA.remove(5, 3);
        lwwServiceA.remove(4, 4);

        const lwwServiceB = new TestLWWService();
        lwwServiceB.add(1, 0);
        lwwServiceB.add(2, 0);
        lwwServiceB.add(3, 0);
        lwwServiceB.add(4, 1);
        lwwServiceB.add(5, 1);
        lwwServiceB.remove(5, 6);
        lwwServiceB.remove(4, 7);

        expect(lwwServiceA.compare(lwwServiceB)).toBeTruthy();
    });

    test('instance not as a subset of the given params should return false', async () => {
        const lwwServiceA = new TestLWWService();
        lwwServiceA.add(1, 0);
        lwwServiceA.add(2, 0);
        lwwServiceA.add(3, 0);
        lwwServiceA.add(4, 1);
        lwwServiceA.add(5, 2);
        lwwServiceA.add(6, 3);
        lwwServiceA.remove(5, 3);
        lwwServiceA.remove(4, 4);

        const lwwServiceB = new TestLWWService();
        lwwServiceB.add(1, 0);
        lwwServiceB.add(2, 0);
        lwwServiceB.add(3, 0);
        lwwServiceB.add(4, 1);
        lwwServiceB.add(5, 1);
        lwwServiceB.add(7, 4);
        lwwServiceB.remove(5, 6);
        lwwServiceB.remove(4, 7);

        expect(lwwServiceA.compare(lwwServiceB)).toBeFalsy();
    });
});

describe('LWWService/merge' , () => {
    test('merge should merge both addSet and removeSet with the given parameter', async () => {
        const lwwServiceA = new TestLWWService();
        const lwwServiceB = new TestLWWService();

        // same behaviors between A and B
        lwwServiceA.add(1, 0);
        lwwServiceA.add(2, 0);
        lwwServiceA.add(3, 0);
        lwwServiceA.add(4, 1);
        lwwServiceA.add(5, 2);
        lwwServiceA.remove(5, 3);
        // minor different behaviors
        lwwServiceA.add(6, 6);
        lwwServiceA.add(6, 7);
        lwwServiceA.add(7, 7);
        lwwServiceA.remove(1, 8);

        // same behaviors between A and B
        lwwServiceB.add(1, 0);
        lwwServiceB.add(2, 0);
        lwwServiceB.add(3, 0);
        lwwServiceB.add(4, 1);
        lwwServiceB.add(5, 2);
        lwwServiceB.remove(5, 3);
        // minor different behaviors
        lwwServiceB.add(6, 12);
        lwwServiceB.add(9, 15);
        lwwServiceB.remove(2, 15);
        lwwServiceB.remove(1, 17);

        lwwServiceA.merge(lwwServiceB);

        const expectedMergedAddSet = new Map<number, number>(
            [[1, 0], [2, 0], [3, 0], [4, 1], [5, 2], [6, 12], [7, 7], [9, 15]]
        );

        const expectedMergedRemoveSet = new Map<number, number>(
            [[5, 3], [1, 17], [2, 15]]
        )

        expect(lwwServiceA.addSet).toStrictEqual(expectedMergedAddSet);
        expect(lwwServiceA.removeSet).toStrictEqual(expectedMergedRemoveSet);

        expect(lwwServiceA.lookup(1)).toBeFalsy();
        expect(lwwServiceA.lookup(2)).toBeFalsy();
        expect(lwwServiceA.lookup(3)).toBeTruthy();
        expect(lwwServiceA.lookup(4)).toBeTruthy();
        expect(lwwServiceA.lookup(5)).toBeFalsy();
        expect(lwwServiceA.lookup(6)).toBeTruthy();
        expect(lwwServiceA.lookup(7)).toBeTruthy();
        expect(lwwServiceA.lookup(9)).toBeTruthy();
    });
});