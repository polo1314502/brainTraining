import React, { useState, useEffect, ComponentType } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AllStackScreen from './util/AllStackScreen';

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AllStackScreen/>
      </NavigationContainer>
    </Provider>

  );
}

export default App;
