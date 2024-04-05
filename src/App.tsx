import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RootRouter from './navigation/RootRouter';
import WelcomeScreen from './modules/welcome/welcome.screen';
import { useSelector } from 'react-redux';
import { selectIsWelcome } from './store/modules/users/selectors/users.selector';
import RequestInterceptor from './service/base-api/RequestInterceptor';

function App() {
  const isWelcome = useSelector(selectIsWelcome);
  return (
    <Fragment>
      <RequestInterceptor>
        <BrowserRouter >
          {!isWelcome && <WelcomeScreen/>}
          <RootRouter />
        </BrowserRouter>
      </RequestInterceptor>
    </Fragment>
  );
}

export default App;
