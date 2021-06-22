import { sleep, Node, getNeighbors, calculateDist } from '../helper';

const aStar = async (appState, dispatch) => {
  const { start, end, rLen, cLen, obstacles } = appState;
  const open = [new Node(start.r, start.c, null, 0, calculateDist(start, end))];
  const closed = [];

  while (open.length > 0) {
    // find node with the smallest f value and pop it out of open
    let smallestFIndex = 0;
    for (let i = 1; i < open.length; i += 1) {
      if (open[i].f < open[smallestFIndex].f) smallestFIndex = i;
    }
    const curr = open.splice(smallestFIndex, 1)[0];

    closed.push(curr);
    // update the color of the node in browser
    if (
      !(start.r === curr.r && start.c === curr.c) &&
      !(end.r === curr.r && end.c === curr.c)
    ) {
      dispatch({ type: 'CLOSED_NODE', payload: { r: curr.r, c: curr.c } });
      await sleep(1);
    }

    // reached the end
    if (curr.r === end.r && curr.c === end.c) {
      return curr;
    }

    // get neighbours of the current node
    const neighbours = getNeighbors(curr, rLen, cLen, true, true);

    for (const neighbour of neighbours) {
      // check if neighbour is an obstacle, skip it
      let blocked = false;
      for (const obstacle of obstacles) {
        if (obstacle.r === neighbour.r && obstacle.c === neighbour.c) {
          blocked = true;
        }
      }

      if (!blocked) {
        // calculate f value of neighbour nodes of the current node
        neighbour.g = curr.g + calculateDist(curr, neighbour);
        neighbour.h = calculateDist(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;

        let inOpenOrClosed = false;
        let push = false;

        for (let i = 0; i < open.length; i += 1) {
          const openNode = open[i];
          if (openNode.r === neighbour.r && openNode.c === neighbour.c) {
            inOpenOrClosed = true;
            if (neighbour.g < openNode.g) {
              // new path to the neighbour node is better,
              // so remove the existing one from open list and append the new one to the open list
              open.splice(i, 1);
              push = true;
            }
            break;
          }
        }

        for (let i = 0; i < closed.length; i += 1) {
          const closeNode = closed[i];
          if (closeNode.r === neighbour.r && closeNode.c === neighbour.c) {
            inOpenOrClosed = true;
            if (neighbour.g < closeNode.g) {
              // new path to the neighbour node is better,
              // so remove the existing one from closed list and append the new one to the open list
              closed.splice(i, 1);
              push = true;
            }
            break;
          }
        }

        // we ignore neighbour nodes that are already in the open/closed list but has higher g value
        if (!inOpenOrClosed || push) {
          open.push(neighbour);

          dispatch({
            type: 'OPEN_NODE',
            payload: { r: neighbour.r, c: neighbour.c },
          });
        }
      }
    }
  }
  // end point cannot be reached
  return null;
};

export default aStar;

// const endNode = aStar(
//   [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ],
//   { r: 0, c: 0 },
//   { r: 2, c: 2 }
// );

// if (endNode === null) {
//   console.log('end cannot be reached');
// } else {
//   let currNode = endNode;
//   while (currNode !== null) {
//     console.log(`${currNode.r}-${currNode.c}-${currNode.g}-${currNode.h}`);
//     currNode = currNode.parent;
//   }
// }
