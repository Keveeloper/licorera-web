import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RootRouter from './navigation/RootRouter';

function App() {
  return (
    <Fragment>
      <BrowserRouter >
        <RootRouter />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
