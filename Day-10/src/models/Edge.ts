import { Vertex } from '.';

/**
 * @description Edge as a component of 'Graph' which can represents 2 given 'Vertex' is connected.
 * 
 * @example
 * ```ts
 * // create a edge between vertex(value = 1) and vertex(value = 2)
 * // noted that it has the same meaning to Edge = [2, 1]
 * const edge: Edge = [1, 2];
 * ```
 */
export type Edge = [Vertex, Vertex];