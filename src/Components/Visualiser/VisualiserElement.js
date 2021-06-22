import styled from 'styled-components';

export const VisualiserContainer = styled.div`
  width: fit-content;
  height: fit-content;
  background: white;
  margin: auto;
  margin-top: 30px;
  padding: 10px 10px;
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
  transition: background 200ms ease-in-out;

  &:hover {
    background: ${(props) =>
      !props.isFinding &&
      props.blockType !== 'start' &&
      props.blockType !== 'end' &&
      (props.controlState === 1
        ? '#212121'
        : props.controlState === 2
        ? '#eeeeee'
        : props.controlState === 3
        ? '#ef5350'
        : props.controlState === 4
        ? '#ab47bc'
        : null)};
    cursor: ${(props) =>
      !props.isFinding &&
      props.blockType !== 'start' &&
      props.blockType !== 'end' &&
      props.controlState
        ? 'pointer'
        : 'default'};
  }
`;
