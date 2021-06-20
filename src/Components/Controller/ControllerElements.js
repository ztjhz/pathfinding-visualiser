import styled from 'styled-components';

export const ControllerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StartButton = styled.button`
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  background: white;
  border: 2px solid black;
  color: black;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
  }

  &:disabled {
    background: black;
    color: white;
    cursor: default;
  }
`;
