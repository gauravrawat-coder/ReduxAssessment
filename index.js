/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import Home from './src/Components/Home';
import {name as appName} from './app.json';

import RootReducer from './src/rootReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createStore, applyMiddleware, compose} from 'redux';
import React from 'react';
import Reactotron from './ReactotronConfig';
export const store = createStore(
  RootReducer,
  undefined,
  compose(applyMiddleware(thunk), Reactotron.createEnhancer()),
);

const ReduxApp = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
