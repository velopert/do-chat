import { combineReducers } from 'redux';


import screen from './screen';
import chat from './chat';
import online from './online';
import base from './base';

import penderMiddleware, { penderReducer }  from 'redux-pender';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


const reducers = combineReducers({
    screen,
    chat,
    online,
    base,
    pender: penderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(penderMiddleware(), thunk)
));



export default store;