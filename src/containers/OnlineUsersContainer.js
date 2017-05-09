import React, { Component } from 'react';
import OnlineUsers from 'components/OnlineUsers';

import { connect } from 'react-redux';

class OnlineUsersContainer extends Component {
    render() {
        const { online, hideOnMobile } = this.props;

        return (
            <OnlineUsers online={online} hideOnMobile={hideOnMobile}/>
        );
    }
}

export default connect(
    (state) => ({
        online: state.online.get('online'),
        hideOnMobile: state.online.get('hideOnMobile')
    })
)(OnlineUsersContainer);

