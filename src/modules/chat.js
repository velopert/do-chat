import { createAction, handleActions } from 'redux-actions';

import { List, Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import firebaseApp from 'firebase-app';

import { convertSnapshotToArray } from 'lib/shared';


// action types
const JOIN = 'chat/JOIN';
const PUSH_MESSAGE = 'chat/PUSH_MESSAGE';

const FETCH_INITIAL_MESSAGES = 'chat/FETCH_INITIAL_MESSAGES';
const RECEIVE_MESSAGE = 'chat/RECEIVE_MESSAGE';
const FETCH_OLDER_MESSAGES = 'chat/FETCH_OLDER_MESSAGES';

const INCREASE_PAGE = 'chat/INCREASE_PAGE';
const DECREASE_PAGE = 'chat/DECREASE_PAGE';
const RESET_PAGE = 'chat/RESET_PAGE';

const SCROLL_TO_BOTTOM = 'chat/SCROLL_TO_BOTTOM';

const INCREASE_UNREAD_COUNT = 'chat/INCREASE_UNREAD_COUNT';
const CLEAR_UNREAD = 'chat/CLEAR_UNREAD';


// action creator
export const join = createAction(JOIN, firebaseApp.join, payload=>payload); // username
export const pushMessage = createAction(PUSH_MESSAGE, firebaseApp.pushMessage); // { message, username }

export const fetchInitialMessages =createAction(FETCH_INITIAL_MESSAGES, firebaseApp.fetchInitialMessages);

export const receiveMessage = createAction(RECEIVE_MESSAGE); // [{ key, message, time, username }]
export const fetchOlderMessages = createAction(FETCH_OLDER_MESSAGES, firebaseApp.fetchOlderMessages, payload=>payload); // time

export const increasePage = createAction(INCREASE_PAGE);
export const decreasePage = createAction(DECREASE_PAGE);
export const resetPage = createAction(RESET_PAGE);

export const scrollToBottom = createAction(SCROLL_TO_BOTTOM);

export const increaseUnreadCount = createAction(INCREASE_UNREAD_COUNT);
export const clearUnread = createAction(CLEAR_UNREAD);

// initial state
const initialState = Map({
    username: '',
    messages: List(),
    page: 0,
    lastFetchedTime: null,
    scrollToBottom: false,
    unread: 0
});

// reducer
export default handleActions({
    ...pender({
        type: JOIN,
        onSuccess: (state, action) => {
            return state.set('username', action.meta);
        }
    }),

    ...pender({
        type: PUSH_MESSAGE,
        onPending: (state, action) => {
            return state.set('message', '');
        }
    }),

    ...pender({
        type: FETCH_INITIAL_MESSAGES,
        onSuccess: (state, action) => {
            const messages = fromJS(convertSnapshotToArray(action.payload))
            return state.set('messages', messages);
        }
    }),

    [RECEIVE_MESSAGE]: (state, action) => {
        const messages = state.get('messages');

        return state.set('messages', messages.concat(action.payload.map(message=>Map(message))));
    },

    ...pender({
        type: FETCH_OLDER_MESSAGES,
        onPending: (state, action) => {
            return state.set('lastFetchedTime', action.meta);
        },
        onSuccess: (state, action) => {
            const oldMessages = fromJS(convertSnapshotToArray(action.payload))

            const messages = state.get('messages');
            
            // place the old messages at the top
            return state.set('messages', oldMessages.concat(messages));
        }
    }),

    [INCREASE_PAGE]: (state, action) => {
        return state.set('page', state.get('page') + 1);
    },

    [DECREASE_PAGE]: (state, action) => {
        return state.set('page', state.get('page') - 1);
    },

    [RESET_PAGE]: (state, action) => {
        return state.set('page', 0);
    },

    [SCROLL_TO_BOTTOM]: (state, action) => {
        return state.set('scrollToBottom', !state.get('scrollToBottom'));
    },

    [INCREASE_UNREAD_COUNT]: (state, action) => {
        return state.set('unread', state.get('unread') + 1);
    },

    [CLEAR_UNREAD]: (state, action) => {
        return state.set('unread', 0);
    }
    
}, initialState);