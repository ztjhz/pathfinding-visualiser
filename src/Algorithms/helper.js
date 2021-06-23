export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class Node {
  constructor(r, c, parent, g, h) {
    this.r = r;
    this.c = c;
    this.parent = parent;
    this.g = g;
    this.h = h;
    this.f = null;
    if (this.g && this.h) {
      this.f = this.g + this.h;
    }
  }
}

export const getNeighbors = (
  currNode,
  rowLen,
  colLen,
  allowDiagonal = true,
  returnNode = true
) => {
  const offset = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
  ];
  // diagonal movement
  if (allowDiagonal) {
    offset.push(
      { r: 1, c: 1 },
      { r: 1, c: -1 },
      { r: -1, c: 1 },
      { r: -1, c: -1 }
    );
  }

  const neighbours = [];

  for (const i of offset) {
    const newR = currNode.r + i.r;
    const newC = currNode.c + i.c;
    if (newR >= 0 && newR < rowLen && newC >= 0 && newC < colLen) {
      if (returnNode) {
        neighbours.push(new Node(newR, newC, currNode));
      } else {
        neighbours.push({ r: newR, c: newC });
      }
    }
  }
  return neighbours;
};

export const calculateDist = (start, end) =>
  Math.sqrt(Math.abs(start.r - end.r) ** 2 + Math.abs(start.c - end.c) ** 2);
// Math.abs(start.r - end.r) + Math.abs(start.c - end.c);

export const getParentPath = (rootNode) => {
  let currNode = rootNode;
  const path = [];
  while (currNode) {
    path.unshift({ r: currNode.r, c: currNode.c });
    currNode = currNode.parent;
  }
  return path;
};

export const fillBoardObstacles = (rLen, cLen, dispatch) => {
  // fill up the entire board with obstacles
  for (let r = 0; r < rLen; r += 1) {
    for (let c = 0; c < cLen; c += 1) {
      dispatch({ type: 'CREATE_OBSTACLE', payload: { r, c } });
    }
  }
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const insertAscending = (array, item, key) => {
  for (let i = 0; i < array.length; i += 1) {
    if (key(item) < key(array[i])) {
      array.splice(i, 0, item);
      return;
    }
  }
  array.splice(array.length, 0, item);
};
