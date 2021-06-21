/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { VisualiserContainer, NodeRow, Node } from './VisualiserElement';
import './index.css';

const Visualiser = ({ appState, dispatch }) => {
  const { nodes, controlState, isFinding } = appState;
  const [drag, setDrag] = useState(false);

  const toggleObstacles = (r, c, click) => {
    if (!isFinding && (drag || click)) {
      if (controlState === 1) {
        dispatch({ type: 'CREATE_OBSTACLE', payload: { r, c } });
      } else if (controlState === 2) {
        dispatch({ type: 'REMOVE_OBSTACLE', payload: { r, c } });
      } else if (controlState === 3 && !drag) {
        dispatch({ type: 'SET_START', payload: { r, c } });
      } else if (controlState === 4 && !drag) {
        dispatch({ type: 'SET_END', payload: { r, c } });
      }
    }
  };
  return (
    <>
      <VisualiserContainer>
        {nodes.map((nodeRow, r) => (
          <NodeRow key={`row-${r}`}>
            {nodeRow.map((node, c) => (
              <Node
                blockType={nodes[r][c]}
                controlState={controlState}
                isFinding={isFinding}
                id={`${r}${c}`}
                key={`${r}${c}`}
                onMouseDown={() => setDrag(true)}
                onMouseUp={() => setDrag(false)}
                onClick={() => {
                  toggleObstacles(r, c, true);
                }}
                onMouseMove={() => {
                  toggleObstacles(r, c, false);
                }}
              />
            ))}
          </NodeRow>
        ))}
      </VisualiserContainer>
    </>
  );
};

export default Visualiser;
