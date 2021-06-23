import {
  getNeighbors,
  sleep,
  Node,
  calculateDist,
  insertAscending,
} from '../helper';

const dijkstra = async (appState, dispatch) => {
  const { start, end, rLen, cLen, obstacles } = appState;

  // open is a priority queue based on node's g value
  const open = [new Node(start.r, start.c, null, 0)];
  const visited = [];

  while (open.length > 0) {
    // open is sorted in ascending order based on their g
    const currNode = open.shift();

    visited.push(currNode);
    dispatch({
      type: 'CLOSED_NODE',
      payload: { r: currNode.r, c: currNode.c },
    });
    await sleep(1);

    // reached the end
    if (currNode.r === end.r && currNode.c === end.c) {
      return currNode;
    }

    const neighbors = getNeighbors(currNode, rLen, cLen, true, true);
    for (const neighbor of neighbors) {
      // check if its an obstacle
      let blocked = false;
      for (const obstacle of obstacles) {
        if (obstacle.r === neighbor.r && obstacle.c === neighbor.c) {
          blocked = true;
        }
      }

      if (!blocked) {
        neighbor.g = calculateDist(currNode, neighbor) + currNode.g;
        let inOpen = false;

        // check if neighbor is already in the open list
        for (let i = 0; i < open.length; i += 1) {
          const openNode = open[i];
          if (openNode.r === neighbor.r && openNode.c === neighbor.c) {
            inOpen = true;
            // if the new path is shorter, replace the old one
            if (neighbor.g < openNode.g) {
              open.splice(i, 1);
              insertAscending(open, neighbor, (node) => node.g);
              dispatch({
                type: 'OPEN_NODE',
                payload: { r: neighbor.r, c: neighbor.c },
              });
            }
          }
        }

        // check if neighbor has not been visited
        let isVisited = false;
        for (const visitedNode of visited) {
          if (visitedNode.r === neighbor.r && visitedNode.c === neighbor.c) {
            isVisited = true;
          }
        }

        // neighbor not in open list
        if (!inOpen && !isVisited) {
          insertAscending(open, neighbor, (node) => node.g);
          dispatch({
            type: 'OPEN_NODE',
            payload: { r: neighbor.r, c: neighbor.c },
          });
        }
      }
    }
  }
  return null;
};

export default dijkstra;
