import aStar from './Algorithms/Pathfinding/aStar';
import binaryTreeMaze from './Algorithms/Maze Generation/binaryTree';
import BFS from './Algorithms/Pathfinding/BreathFirstSearch';
import dijkstra from "./Algorithms/Pathfinding/Dijkstra's";
import GreedyBestFirstSearch from './Algorithms/Pathfinding/GreedyBestFirstSearch';

const rLen = 20;
const cLen = 20;
const defaultStart = { r: 2, c: 2 };
const defaultEnd = { r: 18, c: 17 };
const obstacles = [
  // { r: 0, c: 1 },
  // { r: 1, c: 2 },
  // { r: 1, c: 3 },
  // { r: 1, c: 4 },
  // { r: 1, c: 5 },
  // { r: 1, c: 6 },
  // { r: 0, c: 0 },
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
  rLen,
  cLen,
  path: [],
  nodes: initialiseNodes(defaultStart, defaultEnd),
  pathAlgorithms: {
    ASTAR: (appState, dispatch) => aStar(appState, dispatch),
    'Greedy Best First Search': (appState, dispatch) =>
      GreedyBestFirstSearch(appState, dispatch),
    'Breath First Search': (appState, dispatch) => BFS(appState, dispatch),
    "Dijkstra's": (appState, dispatch) => dijkstra(appState, dispatch),
  },
  mazeAlgorithms: {
    'Binary Tree': (appState, dispatch) => binaryTreeMaze(appState, dispatch),
  },
  currentAlgorithm: { path: 'ASTAR', maze: 'Binary Tree' },
  obstacles,
  isFinding: false,
  controlState: 0,
};

export const reducer = (state, action) => {
  const { payload } = action;
  // eslint-disable-next-line no-shadow
  const { nodes, path, obstacles, start, end } = state;
  const skip =
    payload &&
    ((state.start.r === payload.r && state.start.c === payload.c) ||
      (state.end.r === payload.r && state.end.c === payload.c));

  switch (action.type) {
    /* updating of board during path finding */
    case 'OPEN_NODE':
      if (!skip) {
        nodes[payload.r][payload.c] = 'open';
      }
      return { ...state };
    case 'CLOSED_NODE':
      if (!skip) {
        nodes[payload.r][payload.c] = 'closed';
      }
      return { ...state };
    case 'PATH_NODE':
      if (!skip) {
        nodes[payload.r][payload.c] = 'path';
      }
      return {
        ...state,
        path: [...path, { r: payload.r, c: payload.c }],
      };

    /* edit the board state */
    case 'CREATE_OBSTACLE':
      if (!skip) {
        nodes[payload.r][payload.c] = 'obstacle';
        obstacles.push({ r: payload.r, c: payload.c });
      }
      return {
        ...state,
        obstacles,
      };
    case 'REMOVE_OBSTACLE':
      if (!skip) {
        nodes[payload.r][payload.c] = 'neutral';
      }
      for (let i = 0; i < obstacles.length; i += 1) {
        if (obstacles[i].r === payload.r && obstacles[i].c === payload.c) {
          obstacles.splice(i, 1);
        }
      }
      return {
        ...state,
        obstacles,
      };
    case 'TOGGLE_CONTROL_STATE':
      return { ...state, controlState: payload };
    case 'SET_START':
      nodes[payload.r][payload.c] = 'start';
      nodes[start.r][start.c] = 'neutral';
      return { ...state, start: { r: payload.r, c: payload.c } };
    case 'SET_END':
      nodes[payload.r][payload.c] = 'end';
      nodes[end.r][end.c] = 'neutral';
      return { ...state, end: { r: payload.r, c: payload.c } };
    case 'CLEAR_BOARD':
      // everything except start and end points
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = 0; j < nodes[i].length; j += 1) {
          if (nodes[i][j] !== 'start' && nodes[i][j] !== 'end') {
            nodes[i][j] = 'neutral';
          }
        }
      }
      return { ...state, obstacles: [], path: [] };
    case 'CLEAR_PATH':
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = 0; j < nodes[i].length; j += 1) {
          if (
            nodes[i][j] !== 'start' &&
            nodes[i][j] !== 'end' &&
            nodes[i][j] !== 'obstacle'
          ) {
            nodes[i][j] = 'neutral';
          }
        }
      }
      return { ...state, path: [] };

    /* start and stop the algorithm */
    case 'START_ALGO':
      return { ...state, isFinding: true };
    case 'END_ALGO':
      return { ...state, isFinding: false };
    default:
      throw new Error('Wrong dispatch type!');

    /* change algorithms */
    case 'CHANGE_ALGO':
      return {
        ...state,
        currentAlgorithm: payload,
      };
  }
};
