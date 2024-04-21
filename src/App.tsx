import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RootRouter from './navigation/RootRouter';
import WelcomeScreen from './modules/welcome/welcome.screen';
import { useSelector } from 'react-redux';
import { selectIsWelcome } from './store/modules/users/selectors/users.selector';
import RequestInterceptor from './service/base-api/RequestInterceptor';
import { searchContext } from './context/searchContext';

function App() {

  const isWelcome = useSelector(selectIsWelcome);
  const [searching, setSearching] = useState<boolean>(false);

  return (
    <Fragment>
      <RequestInterceptor>
        <searchContext.Provider value={{
          searching,
          setSearching
        }}>
          <BrowserRouter >
            {!isWelcome && <WelcomeScreen/>}
            <RootRouter />
          </BrowserRouter>
        </searchContext.Provider>
      </RequestInterceptor>
    </Fragment>
  );
}

export default App;
