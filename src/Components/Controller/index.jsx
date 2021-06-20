import React from 'react';
import './index.css';
import { ControllerContainer, StartButton } from './ControllerElements';
import { sleep } from '../../Algorithms/helper';

const Controller = ({ appState, dispatch }) => {
  const { algorithms, start, end } = appState;
  const startAlgo = async (e) => {
    console.log(start, end);
    e.target.disabled = true;
    const endNode = await algorithms.ASTAR(start, end, dispatch);
    if (!endNode) {
      console.log('no path found');
    } else {
      let currNode = endNode;
      while (currNode) {
        if (
          !(
            (currNode.r === start.r && currNode.c === start.c) ||
            (currNode.r === end.r && currNode.c === end.c)
          )
        ) {
          dispatch({ type: 'PATH_NODE', payload: currNode });
          await sleep(1);
        }
        currNode = currNode.parent;
      }
    }
    e.target.disabled = false;
  };
  return (
    <>
      <ControllerContainer>
        <StartButton onClick={startAlgo}>Start</StartButton>
      </ControllerContainer>
    </>
  );
};

export default Controller;
