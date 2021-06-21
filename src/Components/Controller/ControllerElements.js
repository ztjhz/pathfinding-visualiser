import styled from 'styled-components';

export const ControllerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ControllerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;

export const StartButton = styled.button`
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  background: white;
  border: 2px solid #212121;
  color: #212121;
  font-weight: bold;
  padding: 5px 10px;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: #212121;
    color: white;
  }

  &:disabled {
    background: #212121;
    color: white;
    cursor: default;
  }
`;

export const ControlButton = styled.button`
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  background: white;
  border: 2px solid #212121;
  color: #212121;
  font-weight: bold;
  padding: 5px 10px;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: #212121;
    color: white;
  }

  &.active {
    background: #212121;
    color: white;
  }

  &.start.active {
    background: #ef5350;
  }

  &.start:hover {
    background: #ef5350;
  }

  &.end.active {
    background: #ab47bc;
  }

  &.end:hover {
    background: #ab47bc;
  }

  &:disabled {
    cursor: default;
    background: white;
    border: 2px solid #212121;
    color: #212121;
  }
`;
