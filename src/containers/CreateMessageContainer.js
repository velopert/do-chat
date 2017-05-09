import React, { Component } from 'react';
import CreateMessage from 'components/CreateMessage';
import * as chatActions from 'modules/chat';
import * as onlineActions from 'modules/online';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class CreateMessageContainer extends Component {

    // we are not putting input's state in the redux store for better performance

    state = {
        message: ''
    }

    handleChange = (e) => {
        this.setState({message: e.target.value});
    }

    handlePressEnter = () => {
        const { ChatActions, username } = this.props;
        const { message } = this.state;

        if(message==='') return;

        this.setState({
            message: ''
        });

        ChatActions.pushMessage({
            username,
            message: message
        });

        ChatActions.scrollToBottom();
    }
    

    render() {
        const { message } = this.state;

        const { handleChange, handlePressEnter } = this;
        const { OnlineActions } = this.props;
        

        return (
            <CreateMessage 
                value={message}
                onChange={handleChange} 
                onPressEnter={handlePressEnter} 
                onToggleHideOnMobile={OnlineActions.toggleHideOnMobile}
            />
        );
    }
}

export default connect(
    (state) => ({
        username: state.chat.get('username')
    }),
    (dispatch) => ({
        ChatActions: bindActionCreators(chatActions, dispatch),
        OnlineActions: bindActionCreators(onlineActions, dispatch)
    })


)(CreateMessageContainer);