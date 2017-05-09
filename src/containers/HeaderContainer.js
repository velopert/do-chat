import { connect } from 'react-redux';
import Header from 'components/Header';
import * as baseActions from 'modules/base';

export default connect(
    (state) => ({
        muted: state.base.get('muted')
    }),
    (dispatch) => ({
        onToggleMute: () => dispatch(baseActions.toggleMute())
    })
)(Header);