import styled from 'styled-components';

export const ControllerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 800px;
  margin: auto;
  padding-left: 10px;

  @media (max-width: 640px) {
    margin-left: 2px;
  }
`;

export const ControllerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
  gap: 10px 0;
`;

export const StartButton = styled.button`
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  background: #66bb6a;
  border: 2px solid #212121;
  color: #212121;
  font-weight: bold;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: #66bb6a;
    color: #fff;
  }

  &:disabled {
    background: #66bb6a;
    color: #fff;
    opacity: 0.5;
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

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  margin-top: 5px;
  background-color: #f9f9f9;
  width: fit-content;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: pointer;
  border-radius: 3px;
  border: 2px solid #212121;

  & p {
    color: black;
    padding: 12px 16px;
    margin: 0;
    text-decoration: none;
    display: block;
  }

  & p:hover {
    background-color: ${(props) => (props.highlight ? '#212121' : 'white')};
    color: ${(props) => (props.highlight ? 'white' : '#212121')};
  }
`;
export const DropdownBtn = styled.button`
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  border: 2px solid #212121;
  background: white;
  color: #212121;
  font-weight: bold;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: #212121;
    color: white;
  }
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const Slider = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 150px; /* Full-width */
  height: 15px; /* Specified height */
  border-radius: 10px;
  background: #ffffff;
  border: 2px solid #212121;
  outline: none; /* Remove outline */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 10px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    opacity: 0.8;
    background: #212121;
    cursor: pointer; /* Cursor on hover */
  }

  &::-moz-range-thumb {
    width: 10px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    opacity: 0.8;
    background: #212121;
    cursor: pointer; /* Cursor on hover */
  }

  &::-webkit-slider-thumb:hover {
    opacity: 1;
  }

  &::-moz-range-thumb:hover {
    opacity: 1;
  }
`;
