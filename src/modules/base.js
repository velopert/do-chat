import { handleActions } from 'redux-actions';

import { Map } from 'immutable';

import notify from 'lib/notify';

// action types
const TOGGLE_MUTE = 'base/header/TOGGLE_MUTE';

// action creator
export const toggleMute = () => (dispatch, getState) => {
    // get current muted status
    const muted = getState().base.get('muted');
    // mute or unmute
    muted ? notify.unmute() : notify.mute();
    // dispatch the action
    dispatch({
        type: TOGGLE_MUTE
    });
}

// initial state
const initialState = Map({
    muted: false
});

// reducer
export default handleActions({
    [TOGGLE_MUTE]: (state, action) => {
        // reverse the value
        return state.set('muted', !state.get('muted'));
    }
}, initialState);