import {
  sleep,
  getNeighbors,
  insertAscending,
  Node,
  calculateDist,
} from '../helper';

const GreedyBestFirstSearch = async (appState, dispatch) => {
  const { start, end, obstacles, rLen, cLen } = appState;

  const startNode = new Node(
    start.r,
    start.c,
    null,
    null,
    calculateDist(start, end)
  );
  // open is a priority queue, ascending based on h value
  const open = [startNode];
  // closed is an array of visited nodes
  const closed = [];

  while (open.length > 0) {
    const currNode = open.shift();
    closed.push(currNode);
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
        let inOpenClose = false;
        for (const closedNode of closed) {
          if (closedNode.r === neighbor.r && closedNode.c === neighbor.c) {
            inOpenClose = true;
            break;
          }
        }

        for (let i = 0; i < open.length; i += 1) {
          if (open[i].r === neighbor.r && open[i].c === neighbor.c) {
            inOpenClose = true;
            break;
          }
        }

        if (!inOpenClose) {
          // calculate neighbor's heuristic value
          neighbor.h = calculateDist(neighbor, end);

          insertAscending(open, neighbor, (node) => node.h);
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

export default GreedyBestFirstSearch;
