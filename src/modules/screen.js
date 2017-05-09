import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const CHANGE_INPUT = 'screen/CHANGE_INPUT';
const CLOSE_SCREEN = 'screen/CLOSE_SCREEN';

export const changeInput = createAction(CHANGE_INPUT);
export const closeScreen = createAction(CLOSE_SCREEN);

const initialState = Map({
    input: '',
    visible: true
})

export default handleActions({
    [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
    [CLOSE_SCREEN]: (state, action) => state.set('visible', false)
}, initialState);