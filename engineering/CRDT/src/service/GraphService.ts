import { LWWService } from '../interface/LWWService';
import { GraphServiceError } from '../error/GraphServiceError';
import { Edge, Vertex } from '../models';


/**
 * @description GraphService provides a graph constructed by vertices and edges.
 * Noted that GraphService as a class inherit from LWWService, the following method will be recorded as a state change:
 * - addVertex
 * - addEdge
 * - removeVertex
 * - removeEdge
 * 
 * All the data is immutable (from service's perspective) once the function `LWWService.merge` is been called.
 * 
 * @example
 * ```ts
 * const graphService = new GraphService();
 * // add a vertex
 * graphService.addVertex(1);
 * graphService.addVertex(3);
 * // add an edge
 * graphService.addEdge([1, 2]);
 * 
 * // check if a vertex is exist
 * graphService.vertexIsExist(1); // true
 * graphService.vertexIsExist(4); // false
 * 
 * // check if an edge is exist
 * graphService.edgeIsExist([1, 2]); // true
 * graphService.edgeIsExist([1, 3]); // false
 * 
 * // remove a vertex
 * graphService.removeVertex(3);
 * 
 * // remove an edge
 * graphService.removeEdge([1, 2]);
 * 
 * // find all the connected vertices by given vertex
 * graphService.addEdge([1, 2]);
 * graphService.addEdge([1, 3]);
 * graphService.addEdge([1, 4]);
 * graphService.findAllConnectedVertices(1); // [2, 3, 4]
 * 
 * // find a path from given params `from` to `to`
 * graphService.addEdge([4, 5]);
 * graphService.findPathBetweenVertices(5, 1); // [5, 4, 1]
 * 
 * // merge with other graphService
 * const graphServiceB = new GraphService();
 * await graphService.merge(graphServiceB);
 * ```
 */
export class GraphService extends LWWService<Vertex | Edge> {

    /**
     * @description GraphService stores its vertex and edge in attribute `graph`.
     * Vertex: the key of record represents an existing vertex.
     * Edge: any of two vertices have each other in their set<number> regard they have edge between each other.
     * 
     * @example
     * {
     *   1: Set<[2]>,
     *   2: Set<[1]>
     *   3: Set<[]>
     * }
     * 
     * in this case:
     * Vertex: [1, 2, 3]
     * Edge: [1, 2]
     */
    graph: Record<number, Set<number>> = [];

    /**
     * @description add a vertex into the graph. Error will be thrown if the given vertex already exist.
     * @param vertex - `required`. Error will be thrown if:
     *  1. the given vertex already exists
     *  2. the given vertex is NaN
     * @param saveState - `optional`. To indicate whether the state should be stored in the LWWset
     */
    addVertex(vertex: Vertex, saveState: boolean = true) {
        if (isNaN(vertex)) { throw GraphServiceError.vertex.add.isNaN; }

        if (this.graph[vertex] === undefined) {
            this.graph[vertex] = new Set<number>();
            if (saveState) {  this.add(vertex); }
        } else {
            throw GraphServiceError.vertex.add.isDuplicate;
        }
    }

    /**
     * @description add an edge into the graph
     * @param edge - `required`. Error will be thrown if:
     *  1. the given edge has two equal vertices
     *  2. the given edge contains at least one NaN
     *  3. the given edge already exists
     * @param saveState - `optional`. To indicate whether the state should be stored in the LWWset
     */
    addEdge(edge: Edge, saveState: boolean = true) {
        if (edge[0] === edge[1]) { throw GraphServiceError.edge.add.shouldHaveDifferentVertex; }
        if (isNaN(edge[0]) || isNaN(edge[1])) { throw GraphServiceError.edge.add.containNaN; }
        if (this.edgeIsExist(edge)) { throw GraphServiceError.edge.add.isDuplicate; }

        // if any of the vertex in the given edge is not exist,
        // create a vertex automatically
        if (this.graph[edge[0]] === undefined) { this.graph[edge[0]] = new Set<number>(); }
        if (this.graph[edge[1]] === undefined) { this.graph[edge[1]] = new Set<number>(); }

        this.graph[edge[0]].add(edge[1]);
        this.graph[edge[1]].add(edge[0]);
        
        if (saveState) { this.add(edge); }
    }

    /**
     * @description remove an existing vertex.
     * @param vertex - `required`. Error will be thrown if:
     *  1. vertex is not exist 
     * @param saveState - `optional`. To indicate whether the state should be stored in the LWWset
     */
    removeVertex(vertex: Vertex, saveState: boolean = true) {
        if (!this.vertexIsExist(vertex)) { throw GraphServiceError.vertex.remove.vertexNotFound; }

        for (const v of this.graph[vertex]) {
            // remove corresponding edge
            this.graph[v].delete(vertex);
            if (saveState) {
                this.remove([v, vertex]);
                this.remove([vertex, v]);
            }
        }
        delete this.graph[vertex]; 
        if (saveState) { this.remove(vertex); }
    }

    /**
     * @description remove an existing edge.
     * @param edge - `required`. Error will be thrown if:
     *  1. edge is not exist
     * @param saveState - `optional`. To indicate whether the state should be stored in the LWWset
     */
    removeEdge(edge: Edge, saveState: boolean = true) {
        if (!this.edgeIsExist(edge)) { throw GraphServiceError.edge.remove.edgeIsNotExist; }
        this.graph[edge[0]].delete(edge[1]);
        this.graph[edge[1]].delete(edge[0]);
        
        if (saveState) { this.remove(edge); }
    }

    /**
     * 
     * @param vertex - `required`.
     * @returns true if a vertex is exist
     */
    vertexIsExist(vertex: Vertex): boolean { return this.graph[vertex] !== undefined; }

    /**
     * 
     * @param edge - `required`.
     * @returns true if an edge is exist
     */
    edgeIsExist(edge: Edge): boolean {
        if (!this.vertexIsExist(edge[0]) || !this.vertexIsExist(edge[1])) { return false; }
        if (!this.graph[edge[0]].has(edge[1]) || !this.graph[edge[1]].has(edge[0])) { return false; }
        return true;
    }

    /**
     * @description find all the connected vertices by given vertex
     * @param vertex - `required`. Error will be thrown if:
     *  1. vertex is not exist
     * @returns Array<number> - represents the connected vertices.
     */
    findAllConnectedVertices(vertex: Vertex): number[] {
        if (!this.vertexIsExist(vertex)) { throw GraphServiceError.vertex.findConnectedVertices.vertexIsNotExist; }
        return Array.from(this.graph[vertex] ?? []).sort((a: number, b: number) => a - b);
    }

    /**
     * @description find a path between two vertices `from` and `to`.
     * @param from - `required`. The starting vertex of the path
     * @param to - `required`. The destination vertex of the path
     * @returns
     * if any path is found, return { find: true, value: number[] }, value will start from the `from` and end with `to`.
     * Otherwise, return { find: false }
     */
    findPathBetweenVertices(from: Vertex, to: Vertex): { find: boolean, value?: number[] } {
        if (!this.vertexIsExist(from)) { throw GraphServiceError.vertex.findPathBetweenVertices.paramFromIsNotExist; }
        if (!this.vertexIsExist(to)) { throw GraphServiceError.vertex.findPathBetweenVertices.paramToIsNotExist; }

        let isVisited: Record<number, boolean> = {};
        for (const vertex in this.graph) { isVisited[vertex] = false; }

        let queue: [number, number[]][] = [];
        queue.push([from, []]);
        isVisited[from] = true;

        while (queue.length > 0) {
            let cur = queue.pop();
            if (cur[0] === to) { return { find: true, value: cur[1].concat(cur[0]) }; }
            for (const next of this.graph[cur[0]]) {
                if (!isVisited[next]) {
                    isVisited[next] = true;
                    queue.push([next, cur[1].concat(cur[0])]);
                }
            }
        }

        return { find: false };
    }

    /**
     * @description once the LWWService.merge is called, the GraphService will automatically update its' graph
     */
    postMergeFn(): void | Promise<void> {
        this.graph = [];
        for (let [element, _] of this.addSet) {
            const transElement = JSON.parse(element) as Edge | Vertex;
            if (this.lookup(transElement)) {
                if (this.isVertex(transElement) && !this.vertexIsExist(transElement as Vertex)) {
                    this.addVertex(transElement as Vertex, false);
                } else if (this.isEdge(transElement) && !this.edgeIsExist(transElement as Edge)){
                    this.addEdge(transElement as Edge, false);
                }
            }
        }
    }

    /**
     * @description to identify an object is a Vertex
     * @param obj - `required`. Object which requires to check
     * @returns true if the given `obj` is a Vertex
     */
    private isVertex = (obj: any) => typeof(obj) === 'number';

    /**
     * @description to identify an object is an edge
     * @param obj - `required`. Object which requires to check
     * @returns true if the given `obj` is an Edge
     */
    private isEdge =(obj: any): boolean => 
        Array.isArray(obj) && obj.length === 2 && typeof(obj[0]) === 'number' && typeof(obj[1]) === 'number';
}