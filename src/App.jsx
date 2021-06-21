import React, { useReducer } from 'react';
import { reducer, initialState } from './reducer';

import './App.css';
import Visualiser from './Components/Visualiser';
import Controller from './Components/Controller';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <h1>Pathfinding Visualiser</h1>
      <Visualiser appState={state} dispatch={dispatch} />
      <Controller appState={state} dispatch={dispatch} />
    </>
  );
}

export default App;
