import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RootRouter from './navigation/RootRouter';
import WelcomeScreen from './modules/welcome/welcome.screen';
import { useSelector } from 'react-redux';
import { selectIsUserInfoComplete, selectIsWelcome } from './store/modules/users/selectors/users.selector';
import RequestInterceptor from './service/base-api/RequestInterceptor';
import { searchContext } from './context/searchContext';
import UserInfoScreen from './modules/user/userInfo.screen';

function App() {

  const isWelcome = useSelector(selectIsWelcome);
  const isUserInfoComplete = useSelector(selectIsUserInfoComplete);
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
            {isUserInfoComplete && <UserInfoScreen/>}
            <RootRouter />
          </BrowserRouter>
        </searchContext.Provider>
      </RequestInterceptor>
    </Fragment>
  );
}

export default App;
