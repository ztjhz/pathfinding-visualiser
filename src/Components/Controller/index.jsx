import React, { useEffect, useState } from 'react';
import './index.css';
import {
  ControllerContainer,
  StartButton,
  ControlButton,
  ControllerWrapper,
} from './ControllerElements';
import { sleep } from '../../Algorithms/helper';

const Controller = ({ appState, dispatch }) => {
  const { algorithms } = appState;
  const [activeBtn, setactiveBtn] = useState(null);

  const startAlgo = async (e) => {
    e.target.disabled = true;
    dispatch({ type: 'CLEAR_PATH' });
    dispatch({ type: 'START_ALGO' });
    const btns = [
      document.querySelector('#create_obstacle_btn'),
      document.querySelector('#clear_obstacle_btn'),
      document.querySelector('#set_start_btn'),
      document.querySelector('#set_end_btn'),
      document.querySelector('#clear_board_btn'),
    ];
    btns.forEach((btn) => {
      btn.disabled = true;
    });
    const endNode = await algorithms.ASTAR(appState, dispatch);
    dispatch({ type: 'END_ALGO' });
    btns.forEach((btn) => {
      btn.disabled = false;
    });
    if (!endNode) {
      console.log('no path found');
    } else {
      let currNode = endNode;
      const stack = [];
      while (currNode) {
        stack.push(currNode);
        currNode = currNode.parent;
      }
      while (stack.length > 0) {
        dispatch({ type: 'PATH_NODE', payload: stack.pop() });
        await sleep(1);
      }
    }
    e.target.disabled = false;
  };

  const toggleControl = (e) => {
    const btn = e.target;
    if (btn === activeBtn) {
      setactiveBtn(null);
    } else {
      setactiveBtn(btn);
    }
  };

  useEffect(() => {
    const createBtn = document.querySelector('#create_obstacle_btn');
    const clearBtn = document.querySelector('#clear_obstacle_btn');
    const setStartBtn = document.querySelector('#set_start_btn');
    const setEndBtn = document.querySelector('#set_end_btn');

    if (activeBtn === createBtn) {
      clearBtn.classList.remove('active');
      setStartBtn.classList.remove('active');
      setEndBtn.classList.remove('active');
      createBtn.classList.add('active');
      dispatch({ type: 'TOGGLE_CONTROL_STATE', payload: 1 });
    } else if (activeBtn === clearBtn) {
      createBtn.classList.remove('active');
      setStartBtn.classList.remove('active');
      setEndBtn.classList.remove('active');
      clearBtn.classList.add('active');
      dispatch({ type: 'TOGGLE_CONTROL_STATE', payload: 2 });
    } else if (activeBtn === setStartBtn) {
      createBtn.classList.remove('active');
      clearBtn.classList.remove('active');
      setEndBtn.classList.remove('active');
      setStartBtn.classList.add('active');
      dispatch({ type: 'TOGGLE_CONTROL_STATE', payload: 3 });
    } else if (activeBtn === setEndBtn) {
      createBtn.classList.remove('active');
      clearBtn.classList.remove('active');
      setStartBtn.classList.remove('active');
      setEndBtn.classList.add('active');
      dispatch({ type: 'TOGGLE_CONTROL_STATE', payload: 4 });
    } else {
      createBtn.classList.remove('active');
      clearBtn.classList.remove('active');
      setEndBtn.classList.remove('active');
      setStartBtn.classList.remove('active');
      dispatch({ type: 'TOGGLE_CONTROL_STATE', payload: 0 });
    }
  }, [activeBtn]);
  return (
    <>
      <ControllerContainer>
        <ControllerWrapper>
          <StartButton onClick={startAlgo}>Start</StartButton>
          <ControlButton
            id="create_obstacle_btn"
            onClick={(e) => toggleControl(e)}
          >
            Create Obstacle
          </ControlButton>
          <ControlButton
            id="clear_obstacle_btn"
            onClick={(e) => toggleControl(e)}
          >
            Clear Obstacle
          </ControlButton>
          <ControlButton
            className="start"
            id="set_start_btn"
            onClick={(e) => toggleControl(e)}
          >
            Set Start
          </ControlButton>
          <ControlButton
            className="end"
            id="set_end_btn"
            onClick={(e) => toggleControl(e)}
          >
            Set End
          </ControlButton>
          <ControlButton
            id="clear_board_btn"
            onClick={() => dispatch({ type: 'CLEAR_BOARD' })}
          >
            Clear Board
          </ControlButton>
        </ControllerWrapper>
      </ControllerContainer>
    </>
  );
};

export default Controller;
