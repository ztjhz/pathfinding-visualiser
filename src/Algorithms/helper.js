export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class Node {
  constructor(r, c, parent, g, h) {
    this.r = r;
    this.c = c;
    this.parent = parent;
    this.g = g;
    this.h = h;
    this.f = this.g + this.h;
  }
}

export const getNeighbors = (pos, rowLen, colLen) => {
  const offset = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
    { r: 1, c: 1 },
    { r: 1, c: -1 },
    { r: -1, c: 1 },
    { r: -1, c: -1 },
  ];

  const neighbours = [];

  for (const i of offset) {
    const newR = pos.r + i.r;
    const newC = pos.c + i.c;
    if (newR >= 0 && newR < rowLen && newC >= 0 && newC < colLen) {
      neighbours.push(new Node(newR, newC, pos));
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
    path.unshift(currNode);
    currNode = currNode.parent;
  }
  return path;
};
