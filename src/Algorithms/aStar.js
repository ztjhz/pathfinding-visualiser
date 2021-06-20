import { sleep, Node, getNeighbors, calculateDist } from './helper';

const aStar = async (startPos, endPos, rLen, cLen, dispatch, obstacles) => {
  const open = [
    new Node(startPos.r, startPos.c, null, 0, calculateDist(startPos, endPos)),
  ];
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
      !(startPos.r === curr.r && startPos.c === curr.c) &&
      !(endPos.r === curr.r && endPos.c === curr.c)
    ) {
      dispatch({ type: 'CLOSED_NODE', payload: { r: curr.r, c: curr.c } });
      await sleep(10);
    }

    // reached the end
    if (curr.r === endPos.r && curr.c === endPos.c) {
      console.log(open);
      return curr;
    }

    // get neighbours of the current node
    const neighbours = getNeighbors(curr, rLen, cLen);

    for (const neighbour of neighbours) {
      // check if neighbour is an obstacle, skip it
      let blocked = false;
      for (const obstacle of obstacles) {
        if (obstacle.r === neighbour.r && obstacle.c === neighbour.c) {
          blocked = true;
        }
      }

      if (!blocked) {
        // calculate f value
        neighbour.g = curr.g + calculateDist(curr, neighbour);
        neighbour.h = calculateDist(neighbour, endPos);
        neighbour.f = neighbour.g + neighbour.h;

        // ===============================================================================
        /* let inOpenOrClosed = false;

        // if neighbor in OPEN and g of neighbor less than g of the same node in the open list
        for (let i = 0; i < open.length; i += 1) {
          const openNode = open[i];
          if (
            openNode.r === neighbour.r &&
            openNode.c === neighbour.c &&
            neighbour.g < openNode.g
          ) {
            // remove neighbor from OPEN, because new path is better
            open.splice(i, 1);
            inOpenOrClosed = true;
            break;
          }
        }

        // if neighbor in CLOSED and cost less than g(neighbor)
        for (let i = 0; i < closed.length; i += 1) {
          const closeNode = closed[i];
          if (
            closeNode.r === neighbour.r &&
            closeNode.c === neighbour.c &&
            neighbour.g < closeNode.g
          ) {
            // remove neighbor from CLOSED
            closed.splice(i, 1);
            inOpenOrClosed = true;
            break;
          }
        }

        // if neighbor not in OPEN and neighbor not in CLOSED:
        if (!inOpenOrClosed) {
          open.push(neighbour);
          dispatch({
            type: 'OPEN_NODE',
            payload: { r: neighbour.r, c: neighbour.c },
          });
          await sleep(10);
        } */
        // ===============================================================================
        // if a node with the same position as i, but with a lower f, skip i
        /* let skip = false;
        for (const openNode of open) {
          if (
            openNode.f < neighbour.f &&
            openNode.r === neighbour.r &&
            openNode.c === neighbour.c
          ) {
            skip = true;
            break;
          }
        }

        // if neighbour is in the CLOSED list
        // a lower f than successor, skip this successor
        // otherwise, add  the node to the open list
        for (const closeNode of closed) {
          if (
            closeNode.f < neighbour.f &&
            closeNode.r === neighbour.r &&
            closeNode.c === neighbour.c
          ) {
            skip = true;
            break;
          }
        }

        if (!skip) {
          open.push(neighbour);

          // update the color of the node in browser
          if (
            !(startPos.r === neighbour.r && startPos.c === neighbour.c) &&
            !(endPos.r === neighbour.r && endPos.c === neighbour.c)
          ) {
            dispatch({
              type: 'OPEN_NODE',
              payload: { r: neighbour.r, c: neighbour.c },
            });
            // await sleep(1);
          }
        } */
        // ===============================================================================

        let skip = false;
        // neighbor has lower g value than current and is in the closed list
        for (const closeNode of closed) {
          if (
            neighbour.g < curr.g &&
            closeNode.r === neighbour.r &&
            closeNode.c === neighbour.c
          ) {
            closeNode.g = neighbour.g;
            closeNode.f = neighbour.f;
            closeNode.h = neighbour.h;
            closeNode.parent = curr;
            skip = true;
            break;
          }
        }
        // current g value is lower and this neighbor is in the open list
        for (const openNode of open) {
          if (
            neighbour.g > curr.g &&
            openNode.r === neighbour.r &&
            openNode.c === neighbour.c
          ) {
            openNode.g = neighbour.g;
            openNode.f = neighbour.f;
            openNode.h = neighbour.h;
            openNode.parent = curr;
            skip = true;
            break;
          }
        }

        if (!skip) {
          open.push(neighbour);
          dispatch({
            type: 'OPEN_NODE',
            payload: { r: neighbour.r, c: neighbour.c },
          });
          await sleep(10);
        }
        // ===============================================================================
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
