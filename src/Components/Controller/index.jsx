/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import './index.css';
import {
  ControllerContainer,
  StartButton,
  ControlButton,
  ControllerWrapper,
  Dropdown,
  DropdownContent,
  DropdownBtn,
  Slider,
} from './ControllerElements';
import { sleep } from '../../Algorithms/helper';

const Controller = ({ appState, dispatch }) => {
  const {
    pathAlgorithms,
    mazeAlgorithms,
    currentAlgorithm,
    visualisationDelay,
  } = appState;
  const [activeBtn, setactiveBtn] = useState(null);

  const startAlgo = async (e) => {
    e.target.disabled = true;
    dispatch({ type: 'CLEAR_PATH' });
    dispatch({ type: 'START_ALGO' });
    const inputs = [
      document.querySelector('#create_obstacle_btn'),
      document.querySelector('#clear_obstacle_btn'),
      document.querySelector('#set_start_btn'),
      document.querySelector('#set_end_btn'),
      document.querySelector('#clear_board_btn'),
      document.querySelector('#generate_maze_btn'),
      document.querySelector('.slider'),
      document.querySelector('.slider').parentElement.parentElement,
    ];
    inputs.forEach((input) => {
      input.disabled = true;
      input.style.opacity = 0.5;
    });
    const endNode = await pathAlgorithms[currentAlgorithm.path](
      appState,
      dispatch
    );
    dispatch({ type: 'END_ALGO' });
    inputs.forEach((input) => {
      input.disabled = false;
      input.style.opacity = 1;
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

  const generateMaze = () => {
    dispatch({ type: 'CLEAR_BOARD' });
    mazeAlgorithms[currentAlgorithm.maze](appState, dispatch);
  };
  useEffect(() => {
    generateMaze();
  }, []);

  const ToggleDropdown = (e) => {
    const dropdown = e.target.parentElement.querySelector('.dropdownContent');
    dropdown.style.display =
      dropdown.style.display === 'block' ? 'none' : 'block';
  };

  const changeAlgo = (e, algo) => {
    e.target.parentElement.style.display = 'none';
    dispatch({ type: 'CHANGE_ALGO', payload: algo });
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
        {/* Edit board buttons */}
        <ControllerWrapper>
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
            Remove Obstacle
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

        {/* maze generation buttons */}
        <ControllerWrapper>
          <Dropdown>
            <DropdownBtn
              onClick={(e) => {
                ToggleDropdown(e);
              }}
            >
              Maze algorithm: {currentAlgorithm.maze}
            </DropdownBtn>
            <DropdownContent className="dropdownContent">
              {Object.keys(mazeAlgorithms).map((algo) => (
                <p
                  key={algo}
                  onClick={(e) => {
                    changeAlgo(e, { ...currentAlgorithm, maze: algo });
                  }}
                >
                  {algo}
                </p>
              ))}
            </DropdownContent>
          </Dropdown>
          <ControlButton
            id="generate_maze_btn"
            onClick={() => {
              generateMaze();
            }}
          >
            Generate Maze
          </ControlButton>
        </ControllerWrapper>

        {/* pathfinding buttons */}
        <ControllerWrapper>
          <Dropdown>
            <DropdownBtn
              onClick={(e) => {
                ToggleDropdown(e);
              }}
            >
              Pathfinding algorithm: {currentAlgorithm.path}
            </DropdownBtn>
            <DropdownContent className="dropdownContent" highlight>
              {Object.keys(pathAlgorithms).map((algo) => (
                <p
                  key={algo}
                  onClick={(e) => {
                    changeAlgo(e, { ...currentAlgorithm, path: algo });
                  }}
                >
                  {algo}
                </p>
              ))}
            </DropdownContent>
          </Dropdown>
          <StartButton onClick={startAlgo}>Start</StartButton>
        </ControllerWrapper>

        {/* Slider for speed control */}
        <ControllerWrapper>
          <Dropdown>
            <DropdownBtn
              onClick={(e) => {
                ToggleDropdown(e);
              }}
            >
              Visualisation Speed:
            </DropdownBtn>
            <DropdownContent className="dropdownContent" highlight={false}>
              <p>
                <Slider
                  type="range"
                  min="1"
                  max="500"
                  value={visualisationDelay}
                  className="slider"
                  id="speed"
                  style={{ direction: 'rtl' }}
                  onChange={(e) => {
                    dispatch({
                      type: 'CHANGE_SPEED',
                      payload: Number(e.target.value),
                    });
                  }}
                />
              </p>
            </DropdownContent>
          </Dropdown>
        </ControllerWrapper>
      </ControllerContainer>
    </>
  );
};

export default Controller;
