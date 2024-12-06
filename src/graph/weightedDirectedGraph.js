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
      console.log(
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
      console.log(
        `src is not available with value of [${src}], or dest is not available with value of [${dest}]`
      );
    }
    if (this.adjList.has(src)) {
      this.adjList.set(
        src,
        this.adjList.get(src).filter((item) => item.node !== dest)
      );
    } else {
      console.log(`${src} does not exist as a start`);
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
  getNeighbours(node){
    if (!node){
      console.log(`Empty node argument: ${node}`);
      return
    }
    return this.adjList.has(node)?this.adjList.get(node):[];
  }

  //Display the graph
  display() {
    console.log(`adjList length is ${this.adjList.size}`)
    for(let [node, edges] of this.adjList){
      const edgeList = edges.map(edge=>`${edge.node} (distance: ${edge.distance})`).join(", ");
      console.log(`${node}: ${edgeList}`);
    }
  }

  //Calculat the path distance
  CalculatePath(...node){
    let distanceTtl= 0;
    if ((!node) || (node.length === 1)){
      console.log('Cannot calculate the path on unll node or only 1 node');
    }
    for(let i=0;i<node.length-1;i++){
      if (this.adjList.has(node[i])){
        const start = this.adjList.get(node[i]);
        const dest = start.filter(item=>item.node===node[i+1])
        if (!dest) {
            console.log(`No such route, break between ${node[i]} and ${node(i+1)}`);
        }
        distanceTtl +=dest[0].distance;
      }else{
        console.log(`${node[i]}  does not exists. `);
      }
    }
    return distanceTtl;
  }
}

module.exports = WeightedDirectedGraph;
