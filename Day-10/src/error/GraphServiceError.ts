/**
 * @description GraphServiceError defines all the possible error happens in the GraphService
 */
export const GraphServiceError = {
    vertex: {
        add: {
            isDuplicate: new Error('GraphService/addVertex: the given Vertex already exist'),
            isNaN: new Error('GraphService/addVertex: given Vertex is not a number')
        },
        remove: {
            vertexNotFound: new Error('GraphService/removeVertex: vertex not found')
        },
        findConnectedVertices: {
            vertexIsNotExist: new Error('GraphService/findAllConnectedVertices: vertex is not exist')
        },
        findPathBetweenVertices: {
            paramFromIsNotExist: new Error('GraphService/findPathBetweenVertices: param `from` is not an existing vertex'),
            paramToIsNotExist: new Error('GraphService/findPathBetweenVertices: param `to` is not an existing vertex')
        }

    },
    edge: {
        add: {
            shouldHaveDifferentVertex: new Error('GraphService/addEdge: an edge should have different vertex'),
            isDuplicate: new Error('GraphService/addEdge: the given Edge already exist'),
            containNaN: new Error('GraphService/addEdge: given Edge contain at least one vertex with NaN')
        },
        remove: {
            edgeIsNotExist: new Error('GraphService/removeEdge: edge is not exist')
        }
    }
}