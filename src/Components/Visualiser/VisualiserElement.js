import styled from 'styled-components';

export const VisualiserContainer = styled.div`
  width: fit-content;
  height: fit-content;
  background: white;
  margin: auto;
  margin-top: 30px;
`;

export const NodeRow = styled.div`
  width: inherit;
  height: 30px;
  display: flex;
`;

export const Node = styled.div`
  width: 30px;
  height: 30px;
  background: ${(props) =>
    props.blockType === 'start'
      ? '#ef5350'
      : props.blockType === 'end'
      ? '#ab47bc'
      : props.blockType === 'path'
      ? '#66bb6a'
      : props.blockType === 'neutral'
      ? '#eeeeee'
      : props.blockType === 'open'
      ? '#4b636e'
      : props.blockType === 'closed'
      ? '#a7c0cd'
      : props.blockType === 'obstacle'
      ? '#212121'
      : '#eeeeee'};
  border: 1px solid #212121;
  box-sizing: border-box;
  transition: background 100ms linear;
`;

export const StartButton = styled.button`
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  background: white;
  border: 2px solid #212121;
  color: black;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background: #212121;
    color: white;
  }
`;
