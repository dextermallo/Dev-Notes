import { GraphService } from './GraphService';
import { GraphServiceError } from '../error/GraphServiceError';


describe('GraphService/addVertex', () => {
    test('should be able to add a vertex', async () => {
        const graphService = new GraphService();
        graphService.addVertex(1);
        graphService.addVertex(2);

        expect(graphService.graph[1]).toEqual(new Set<number>());
        expect(graphService.graph[2]).toEqual(new Set<number>());
    });

    test('NaN should not abe able to add', async () => {
        const graphService = new GraphService();
        try {
            graphService.addVertex(NaN);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.vertex.add.isNaN);
        }
    });

    test('vertex should not be duplicated', async () => {
        const graphService = new GraphService();
        graphService.addVertex(1);

        try {
            graphService.addVertex(1);            
        } catch (err) {
            expect(err).toEqual(GraphServiceError.vertex.add.isDuplicate);
        }
    });
});

describe('GraphService/addEdge', () => {
    test('should be able to add an edge', async () => {
        const graphService = new GraphService();
        graphService.addEdge([1, 2]);
        graphService.addEdge([1, 3]);
        graphService.addEdge([2, 4]);

        expect(graphService.graph[1]).toEqual(new Set<number>([2, 3]));
        expect(graphService.graph[2]).toEqual(new Set<number>([1, 4]));
        expect(graphService.graph[3]).toEqual(new Set<number>([1]));
    });

    test('edge should not be duplicated', async () => {
        const graphService = new GraphService();
        graphService.addEdge([1, 2]);
        try {
            graphService.addEdge([1, 2]);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.edge.add.isDuplicate);
        }

        try {
            graphService.addEdge([2, 1]);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.edge.add.isDuplicate);
        }
    });

    test('a given edge should have different vertex', async () => {
        const graphService = new GraphService();
        try {
            graphService.addEdge([1, 1]);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.edge.add.shouldHaveDifferentVertex);
        }
    });

    test('a given edge should have different vertex', async () => {
        const graphService = new GraphService();
        try {
            graphService.addEdge([1, NaN]);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.edge.add.containNaN);
        }

        try {
            graphService.addEdge([NaN, 1]);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.edge.add.containNaN);
        }

        try {
            graphService.addEdge([NaN, NaN]);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.edge.add.containNaN);
        }
    });
});

describe('GraphService/removeVertex', () => {
    test('should be able to remove an existing vertex', async () => {
        const graphService = new GraphService();
        graphService.addVertex(1);
        expect(graphService.graph[1]).toEqual(new Set<number>());

        graphService.removeVertex(1);
        expect(graphService.graph[1]).toEqual(undefined);
    });

    test('vertex should be exist when trying to remove', async () => {
        const graphService = new GraphService();
        try {
            graphService.removeVertex(1);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.vertex.remove.vertexNotFound);
        }
    });
});

describe('GraphService/removeEdge', () => {
    test('should be able to remove an existing edge', async () => {
        const graphService = new GraphService();
        graphService.addEdge([1, 2]);
        graphService.addEdge([1, 3]);
        graphService.addEdge([2, 4]);

        graphService.removeEdge([1, 2]);
        expect(graphService.graph[1]).toEqual(new Set<number>([3]));
        expect(graphService.graph[2]).toEqual(new Set<number>([4]));
    });

    test('edge should be exist when trying to remove', async () => {
        const graphService = new GraphService();
        try {
            graphService.removeEdge([1, 2]);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.edge.remove.edgeIsNotExist);
        }
    });
});

describe('GraphService/vertexIsExist', () => {
    test('should return true if given vertex is exist', async () => {
        const graphService = new GraphService();
        graphService.addVertex(1);
        graphService.addVertex(2);
        expect(graphService.vertexIsExist(1)).toBeTruthy();
        expect(graphService.vertexIsExist(2)).toBeTruthy();
    });

    test('should return false if given vertex is not exist', async () => {
        const graphService = new GraphService();
        expect(graphService.vertexIsExist(1)).toBeFalsy();
        expect(graphService.vertexIsExist(2)).toBeFalsy();
    });

    test('functionality should work after running GraphService/merge', async () => {
        const graphServiceA = new GraphService();
        const graphServiceB = new GraphService();

        graphServiceA.addVertex(1);
        graphServiceA.addVertex(2);
        graphServiceA.addEdge([6, 7]);

        graphServiceB.addVertex(2);
        graphServiceB.addVertex(3);
        graphServiceB.addEdge([1, 5]);
        graphServiceB.addEdge([2, 4]);
        graphServiceB.addEdge([6, 7]);
        graphServiceB.removeVertex(2);
        graphServiceB.removeVertex(4);

        await graphServiceA.merge(graphServiceB);

        expect(graphServiceA.vertexIsExist(1)).toBeTruthy();
        expect(graphServiceA.vertexIsExist(2)).toBeFalsy();
        expect(graphServiceA.vertexIsExist(3)).toBeTruthy();
        expect(graphServiceA.vertexIsExist(4)).toBeFalsy();
        expect(graphServiceA.vertexIsExist(5)).toBeTruthy();
        expect(graphServiceA.vertexIsExist(6)).toBeTruthy();
        expect(graphServiceA.vertexIsExist(7)).toBeTruthy();
    });
});

describe('GraphService/edgeIsExist', () => {
    test('should return true if given edge is exist', async () => {
        const graphService = new GraphService();
        graphService.addEdge([1, 2]);
        expect(graphService.edgeIsExist([1, 2])).toBeTruthy();
        expect(graphService.edgeIsExist([2, 1])).toBeTruthy();
    });

    test('should return false if given edge is not exist', async () => {
        const graphService = new GraphService();
        graphService.addEdge([1, 2]);
        graphService.addEdge([2, 3]);
        expect(graphService.edgeIsExist([1, 3])).toBeFalsy();
        expect(graphService.edgeIsExist([1, 4])).toBeFalsy();
        expect(graphService.edgeIsExist([3, 4])).toBeFalsy();
    });

    test('functionality should work after running GraphService/merge', async () => {
        const graphServiceA = new GraphService();
        const graphServiceB = new GraphService();

        graphServiceA.addEdge([1, 2]);
        graphServiceA.addEdge([1, 3]);
        graphServiceA.addEdge([2, 4]);
        graphServiceA.addEdge([4, 5]);
        graphServiceA.removeEdge([1, 2]);
        graphServiceA.removeEdge([4, 5]);

        graphServiceB.addEdge([1, 5]);
        graphServiceB.addEdge([2, 6]);
        graphServiceB.addEdge([3, 4]);
        graphServiceB.addEdge([3, 2]);
        graphServiceB.addEdge([1, 7]);
        graphServiceB.removeEdge([1, 7]);
        graphServiceB.removeEdge([1, 5]);

        await graphServiceA.merge(graphServiceB);

        expect(graphServiceA.edgeIsExist([1, 2])).toBeFalsy();
        expect(graphServiceA.edgeIsExist([1, 3])).toBeTruthy();
        expect(graphServiceA.edgeIsExist([2, 4])).toBeTruthy();
        expect(graphServiceA.edgeIsExist([3, 1])).toBeTruthy();
        expect(graphServiceA.edgeIsExist([4, 5])).toBeFalsy();
        expect(graphServiceA.edgeIsExist([2, 1])).toBeFalsy();
        expect(graphServiceA.edgeIsExist([1, 5])).toBeFalsy();
        expect(graphServiceA.edgeIsExist([2, 6])).toBeTruthy();
        expect(graphServiceA.edgeIsExist([3, 4])).toBeTruthy();
        expect(graphServiceA.edgeIsExist([3, 2])).toBeTruthy();
        expect(graphServiceA.edgeIsExist([1, 7])).toBeFalsy();
        expect(graphServiceA.edgeIsExist([7, 1])).toBeFalsy();
    });
});

describe('GraphService/findAllConnectedVertices', () => {
    test('a vertex connected with at least one vertex should return a valid array', async () => {
        const graphService = new GraphService();
        graphService.addEdge([1, 2]);
        graphService.addEdge([2, 3]);
        graphService.addEdge([1, 3]);
        graphService.addEdge([2, 4]);
        graphService.addEdge([3, 4]);

        expect(graphService.findAllConnectedVertices(1)).toEqual([2, 3]);
        expect(graphService.findAllConnectedVertices(2)).toEqual([1, 3, 4]);
        expect(graphService.findAllConnectedVertices(3)).toEqual([1, 2, 4]);
        expect(graphService.findAllConnectedVertices(4)).toEqual([2, 3]);
    });

    test('an isolated vertex should return an empty array', async () => {
        const graphService = new GraphService();
        graphService.addVertex(1);
        expect(graphService.findAllConnectedVertices(1)).toEqual([]);
    });

    test('graph with great volume (5000 edges) is capable of finding all the connected vertices', async () => {
        const graphService = new GraphService();
        let expectedResp: number[] = [];
        for (let i = 1; i <= 5000; ++i) {
            graphService.addEdge([0, i]);
            expectedResp.push(i);
        }
        expect(graphService.findAllConnectedVertices(0)).toEqual(expectedResp);
    });

    test('graph with great volume (50000 edges) is capable of finding all the connected vertices', async () => {
        const graphService = new GraphService();
        let expectedResp: number[] = [];
        for (let i = 1; i <= 50000; ++i) {
            graphService.addEdge([0, i]);
            expectedResp.push(i);
        }
        expect(graphService.findAllConnectedVertices(0)).toEqual(expectedResp);
    });

    test('given vertex should be exist', async () => {
        try {
            const graphService = new GraphService();
            const _ = graphService.findAllConnectedVertices(1);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.vertex.findConnectedVertices.vertexIsNotExist);
        }
    });

    test('functionality should work after running GraphService/merge', async () => {
        const graphServiceA = new GraphService();
        const graphServiceB = new GraphService();

        graphServiceA.addEdge([1, 2]);
        graphServiceA.addEdge([1, 3]);
        graphServiceA.addEdge([1, 4]);
        graphServiceA.addEdge([1, 5]);
        graphServiceA.removeEdge([1, 2]);

        graphServiceB.addEdge([1, 6]);
        graphServiceB.addEdge([1, 7]);
        graphServiceB.addEdge([1, 8]);
        graphServiceB.removeEdge([1, 8]);

        await graphServiceA.merge(graphServiceB);
        expect(graphServiceA.findAllConnectedVertices(1)).toEqual([3, 4, 5, 6, 7]);
    });
});

describe('GraphService/findPathBetweenVertices', () => {
    test('success to find a path between the given vertices', async () => {
        const graphService = new GraphService();

        graphService.addEdge([1, 2]);
        graphService.addEdge([2, 3]);
        graphService.addEdge([3, 4]);
        graphService.addEdge([1, 5]);

        expect(graphService.findPathBetweenVertices(1, 5)).toStrictEqual({ find: true, value: [1, 5] });
        expect(graphService.findPathBetweenVertices(5, 1)).toStrictEqual({ find: true, value: [5, 1] });
        expect(graphService.findPathBetweenVertices(1, 4)).toStrictEqual({ find: true, value: [1, 2, 3, 4] });
        expect(graphService.findPathBetweenVertices(4, 1)).toStrictEqual({ find: true, value: [4, 3, 2, 1] });
    });

    test('fail to find a path between the given vertices', async () => {
        const graphService = new GraphService();

        graphService.addEdge([1, 2]);
        graphService.addEdge([2, 3]);
        graphService.addEdge([3, 4]);
        graphService.addEdge([1, 5]);
        graphService.addEdge([7, 8]);

        expect(graphService.findPathBetweenVertices(2, 7)).toEqual({ find: false });
        expect(graphService.findPathBetweenVertices(7, 2)).toEqual({ find: false });
        expect(graphService.findPathBetweenVertices(4, 7)).toEqual({ find: false });
        expect(graphService.findPathBetweenVertices(7, 4)).toEqual({ find: false });
    });

    test('parameter `from` should be an existing vertex', async () => {
        const graphService = new GraphService();

        graphService.addVertex(2);

        try {
            graphService.findPathBetweenVertices(1, 2);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.vertex.findPathBetweenVertices.paramFromIsNotExist);
        }
    });

    test('parameter `to` should be an existing vertex', async () => {
        const graphService = new GraphService();

        graphService.addVertex(2);

        try {
            graphService.findPathBetweenVertices(2, 1);
        } catch (err) {
            expect(err).toEqual(GraphServiceError.vertex.findPathBetweenVertices.paramToIsNotExist);
        }
    });

    test('graph with great volume (5000 edges) is capable of finding paths between given vertices', async () => {
        const graphService = new GraphService();

        let expectedResp: number[] = [];

        for (let i = 1; i < 5000; ++i) {
            graphService.addEdge([i, i + 1]);
            expectedResp.push(i);
        }

        expectedResp.push(5000);
        expect(graphService.findPathBetweenVertices(1, 5000)).toEqual({ find: true, value: expectedResp });
    });

    test('graph with great volume (10000 edges) is capable of finding paths between given vertices', async () => {
        const graphService = new GraphService();

        let expectedResp: number[] = [];

        for (let i = 1; i < 10000; ++i) {
            graphService.addEdge([i, i + 1]);
            expectedResp.push(i);
        }

        expectedResp.push(10000);
        expect(graphService.findPathBetweenVertices(1, 10000)).toEqual({ find: true, value: expectedResp });
    });

    test('functionality should work after running GraphService/merge', async () => {
        const graphServiceA = new GraphService();
        const graphServiceB = new GraphService();

        graphServiceA.addEdge([1, 2]);
        graphServiceA.addEdge([2, 3]);
        graphServiceA.addEdge([3, 4]);
        graphServiceA.addEdge([4, 5]);
        graphServiceA.addEdge([5, 7]);
        graphServiceA.addEdge([4, 6]);
        graphServiceA.addEdge([6, 7]);

        graphServiceB.addEdge([1, 5]);
        graphServiceB.addEdge([5, 7]);
        graphServiceB.removeEdge([5, 7]);

        expect(graphServiceA.findPathBetweenVertices(1, 7).find).toBeTruthy();
        expect(graphServiceA.findPathBetweenVertices(1, 7).value).toEqual([1, 2, 3, 4, 6, 7]);

        await graphServiceA.merge(graphServiceB);

        expect(graphServiceA.findPathBetweenVertices(1, 7).find).toBeTruthy();
        expect(graphServiceA.findPathBetweenVertices(1, 7).value).toEqual([1, 5, 4, 6, 7]);

        graphServiceA.removeEdge([4, 6]);
        expect(graphServiceA.findPathBetweenVertices(1, 7).find).toBeFalsy();

        graphServiceB.addEdge([1, 7]);
        await graphServiceA.merge(graphServiceB);
        expect(graphServiceA.findPathBetweenVertices(1, 7).find).toBeTruthy();
        expect(graphServiceA.findPathBetweenVertices(1, 7).value).toEqual([1, 7]);
    });
});