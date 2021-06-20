/* eslint-disable react/no-array-index-key */
import React from 'react';
import { VisualiserContainer, NodeRow, Node } from './VisualiserElement';
import './index.css';

const Visualiser = ({ appState }) => {
  const { nodes } = appState;

  return (
    <>
      <VisualiserContainer>
        {nodes.map((nodeRow, r) => (
          <NodeRow key={`row-${r}`}>
            {nodeRow.map((node, c) => (
              <Node blockType={nodes[r][c]} key={`${r}${c}`} />
            ))}
          </NodeRow>
        ))}
      </VisualiserContainer>
    </>
  );
};

export default Visualiser;
