const {
  MinPriorityQueue
} = require("@datastructures-js/priority-queue");

//Weighted directed graph class
class WeightedDirectedGraph {
  constructor() {
    this.adjList = new Map();
  }
  //Add one node
  addNode(node) {
    if (!this.adjList.has(node)) {
      this.adjList.set(node, []);
    }
  }
  //Single direction edge
  addEdge(src, dest, weight) {
    if (!src || !dest) {
      console.error(
        `src is not available with value of [${src}], or dest is not available with value of [${dest}]`
      );
    }
    if (!this.adjList.has(src)) {
      this.adjList.set(src, []);
    }
    if (!this.adjList.has(dest)) {
      this.adjList.set(dest, []);
    }
    this.adjList.get(src).push({ node: dest, distance: weight });
  }

  //single direction remove
  removeEdge(src, dest) {
    if (!src || !dest) {
      console.error(
        `src is not available with value of [${src}], or dest is not available with value of [${dest}]`
      );
    }
    if (this.adjList.has(src)) {
      this.adjList.set(
        src,
        this.adjList.get(src).filter((item) => item.node !== dest)
      );
    } else {
      console.warerrorn(`${src} does not exist as a start`);
    }
  }
  // Remove a node and all its outgoing and incoming edges
  removeNode(node) {
    if (this.adjList.has(node)) {
      this.adjList.delete(node);

      // Remove all edges pointing to the deleted node
      for (let [currentNode, edges] of this.adjList) {
        this.adjList.set(
          currentNode,
          edges.filter((edge) => edge.node !== node)
        );
      }
    }
  }

  //Get the outgoing neighbours of a node
  getNeighbours(node) {
    if (!node) {
      console.error(`Empty node argument: ${node}`);
      return;
    }
    return this.adjList.has(node) ? this.adjList.get(node) : [];
  }

  //Display the graph
  display() {
    console.log(`adjList length is ${this.adjList.size}`);
    for (let [node, edges] of this.adjList) {
      const edgeList = edges
        .map((edge) => `${edge.node} (distance: ${edge.distance})`)
        .join(", ");
      console.log(`${node}: ${edgeList}`);
    }
  }

  //Calculat the path distance
  CalculatePathDistance(...node) {
    let distanceTtl = 0;
    if (!node || node.length === 1) {
      console.error("Cannot calculate the path on unll node or only 1 node");
      return distanceTtl;
    }
    for (let i = 0; i < node.length - 1; i++) {
      if (this.adjList.has(node[i]) && this.adjList.has(node[i + 1])) {
        const start = this.adjList.get(node[i]);
        const dest = start.filter((item) => item.node === node[i + 1]);
        if (!dest) {
          console.error(
            `No such route, break between ${node[i]} and ${node(i + 1)}`
          );
          return 0;
        }
        distanceTtl += dest[0].distance;
      } else {
        console.error(`${node[i]} or ${node[i + 1]} does not exists. `);
        return distanceTtl;
      }
    }
    return distanceTtl;
  }

  //Use Dijkstra algorithm to calculate the shortest
  //path between two nodes
  shortestPathDijkstra(start, end) {
    if (!this.adjList.has(start) || !this.adjList.has(end)) {
      console.error(
        `One or both nodes do not exist: start=${start}, end=${end}`
      );
      return -1;
    }
    const distances = new Map();
    const priQ = new MinPriorityQueue((a,b)=>a-b);
    const visited = new Set();

    for (const node of this.adjList.keys()) {
      distances.set(node, Infinity);
    }
    distances.set(start, 0);
    priQ.enqueue({ node: start, distance: 0 });

    while (!priQ.isEmpty()) {
      const { node: currentNode, distance: currentDistance } = priQ.dequeue();
      if (visited.has(currentNode)) continue;
      visited.add(currentNode);

      if (currentNode === end) {
        return currentDistance;
      }

      for (const neighbour of this.getNeighbours(currentNode)) {
        const newDistance = currentDistance + neighbour.distance;
        if (newDistance < distances.get(neighbour.node)) {
          distances.set(neighbour.node, newDistance);
          priQ.enqueue({
            node: neighbour.node,
            distance: newDistance,
          });
        }
      }
    }

    return distances.get(end) === Infinity?-1:distances.get(end);
  }
}

module.exports = WeightedDirectedGraph;
