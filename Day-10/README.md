# Day-10

This folder is an implementation of [Day 10. Implementation of CRDT](https://github.com/dextermallo/SWE-Question-Daily/issues/10).

```markdown
Implements a state-based LWW-Element-Graph with the following functionalities:

add a vertex.
remove a vertex.
add an edge.
remove an edge.
check whether a vertex is in the graph.
query for all vertices connected to a vertex.
find any path between two vertices.
merge with concurrent changes from other graphs.
```

# Prerequisite

- node v14.17.6 (recommend)

# How-to

to run the test, run the following command:

```shell
npm i
npm run build
npm run test
```