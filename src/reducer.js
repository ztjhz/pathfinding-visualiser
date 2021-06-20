import aStar from './Algorithms/aStar';

const rLen = 20;
const cLen = 20;
const defaultStart = { r: 0, c: 4 };
const defaultEnd = { r: 18, c: 17 };
const obstacles = [
  { r: 1, c: 3 },
  { r: 1, c: 4 },
  { r: 1, c: 5 },
  { r: 1, c: 6 },
  { r: 0, c: 6 },
];

const initialiseNodes = (start, end) => {
  const nodes = Array(rLen);
  for (let i = 0; i < rLen; i += 1) {
    nodes[i] = Array(cLen);
    for (let j = 0; j < cLen; j += 1) {
      nodes[i][j] = 'neutral';
    }
  }

  nodes[start.r][start.c] = 'start';
  nodes[end.r][end.c] = 'end';
  for (let i = 0; i < obstacles.length; i += 1) {
    nodes[obstacles[i].r][obstacles[i].c] = 'obstacle';
  }
  return nodes;
};

export const initialState = {
  start: defaultStart,
  end: defaultEnd,
  path: [],
  nodes: initialiseNodes(defaultStart, defaultEnd),
  algorithms: {
    ASTAR: (start, end, dispatch) =>
      aStar(start, end, rLen, cLen, dispatch, obstacles),
  },
  obstacles,
};

export const reducer = (state, action) => {
  const temp = Array(rLen);
  for (let i = 0; i < rLen; i += 1) {
    temp[i] = [...state.nodes[i]];
  }
  const { payload } = action;
  const skip =
    (state.start.r === payload.r && state.start.c === payload.c) ||
    (state.end.r === payload.r && state.end.c === payload.c);

  switch (action.type) {
    case 'OPEN_NODE':
      if (!skip) {
        temp[payload.r][payload.c] = 'open';
      }
      return { ...state, nodes: temp };
    case 'CLOSED_NODE':
      if (!skip) {
        temp[payload.r][payload.c] = 'closed';
      }
      return { ...state, nodes: temp };
    case 'PATH_NODE':
      if (!skip) {
        temp[payload.r][payload.c] = 'path';
      }
      return {
        ...state,
        nodes: temp,
        path: [...state.path, { r: payload.r, c: payload.c }],
      };
    default:
      throw new Error('Wrong dispatch type!');
  }
};
