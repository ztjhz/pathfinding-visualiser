import { Node, getNeighbors, sleep } from '../helper';

const BFS = async (appState, dispatch) => {
  const { start, end, rLen, cLen, obstacles } = appState;

  const startNode = new Node(start.r, start.c, null);
  const explored = [];
  const queue = [startNode];

  while (queue.length > 0) {
    const currNode = queue.shift();
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
      // check if neighbor is an obstacle
      let blocked = false;
      for (const obstacle of obstacles) {
        if (obstacle.r === neighbor.r && obstacle.c === neighbor.c) {
          blocked = true;
        }
      }
      if (!blocked) {
        // check if neighbor has already been explored
        let skip = false;
        for (const exploredNode of explored) {
          if (exploredNode.r === neighbor.r && exploredNode.c === neighbor.c) {
            skip = true;
          }
        }
        if (!skip) {
          explored.push({ r: neighbor.r, c: neighbor.c });
          queue.push(neighbor);
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

export default BFS;
