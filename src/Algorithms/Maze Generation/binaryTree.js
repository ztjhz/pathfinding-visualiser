import { fillBoardObstacles } from '../helper';
/* eslint-disable prefer-destructuring */
const binaryTreeMaze = (appState, dispatch) => {
  // east and south direction
  const directions = [
    { r: 0, c: 1 },
    { r: 1, c: 0 },
  ];

  const { rLen, cLen } = appState;

  // fill up the entire board with obstacles
  fillBoardObstacles(rLen, cLen, dispatch);

  // create passageway
  for (let r = 0; r < rLen; r += 2) {
    for (let c = 0; c < cLen; c += 1) {
      let dir;
      if (r === rLen - 1 && c === cLen - 1) {
        dir = { r: 0, c: 0 };
      } else if (r === rLen - 1) {
        dir = directions[0];
      } else if (c === cLen - 1) {
        dir = directions[1];
      } else {
        dir = directions[Math.round(Math.random())];
      }
      const pos = { r: r + dir.r, c: c + dir.c };
      dispatch({ type: 'REMOVE_OBSTACLE', payload: { r: pos.r, c: pos.c } });
    }
  }
};

export default binaryTreeMaze;
