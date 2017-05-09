import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender'

import { Map, List, fromJS } from 'immutable';
import { convertSnapshotToArray } from 'lib/shared';
import firebaseApp from 'firebase-app';

// action types
const FETCH_INITIAL_ONLINE_LIST = 'online/FETCH_INITIAL_ONLINE_LIST';
const ENTER = 'online/ENTER';
const LEAVE = 'online/LEAVE';
const TOGGLE_HIDE_ON_MOBILE = 'online/TOGGLE_HIDE_ON_MOBILE';

// action creator
export const fetchInitialOnlineList = createAction(FETCH_INITIAL_ONLINE_LIST, firebaseApp.fetchInitialOnlineList);
export const enter = createAction(ENTER); // { key, username }
export const leave = createAction(LEAVE); // key
export const toggleHideOnMobile = createAction(TOGGLE_HIDE_ON_MOBILE);

// initial state
const initialState = Map({
    online: List(),
    hideOnMobile: false
});

// reducer
export default handleActions({
    ...pender({
        type: FETCH_INITIAL_ONLINE_LIST,
        onSuccess: (state, action) => {
            const online = fromJS(convertSnapshotToArray(action.payload));
            return state.set('online', online);
        }
    }),
    [ENTER]: (state, action) => {
        const online = state.get('online');
        return state.set(
            'online', 
            online.push(
                Map(action.payload)
            )
        );
    },
    [LEAVE]: (state, action) => {
        const online = state.get('online');
        const index = online.findIndex(info => info.get('key') === action.payload);
        return state.set(
            'online',
            online.delete(index)
        );
    },
    [TOGGLE_HIDE_ON_MOBILE]: (state, action) => {
        return state.set('hideOnMobile', !state.get('hideOnMobile'));
    }
}, initialState);