import React, { Component } from 'react';

import Logo from 'components/Logo';
import Typewriter from 'components/Typewriter';
import Fullscreen from 'components/Fullscreen';
import InputUsername from 'components/InputUsername';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as chatActions from 'modules/chat';
import * as screenActions from 'modules/screen';
import * as onlineActions from 'modules/online';

import firebaseApp from 'firebase-app';

class Screen extends Component {

    handleChange = (e) => {
        const { ScreenActions } = this.props;
        
        ScreenActions.changeInput(e.target.value);
    }

    handleSubmit = async () => {
        const { ScreenActions, ChatActions, OnlineActions, input, pender } = this.props;

        if(input.trim() === '') return;

        if(pender.pending['chat/JOIN']) return;

        /* start listening to new messages / online list first
           data retrieved before initial fetch will be ignored. */
        firebaseApp.startListening();
        
        // wait until everything finishes
        await Promise.all([ChatActions.fetchInitialMessages(), OnlineActions.fetchInitialOnlineList(), ChatActions.join(input)]);

        ScreenActions.closeScreen();
    }

    handleKeyPress = (e) => {
        if(e.key==='Enter') this.handleSubmit();
    }

    render() {
        const { input, visible, pender } = this.props;
        const { handleChange, handleSubmit, handleKeyPress } = this;

        return (
            <Fullscreen visible={visible}>
                <Logo/>
                <Typewriter texts={[
                    'What is your name?',
                    'Please tell me your name.',
                    'Just tell it.',
                    'Say out your name!',
                    'For god\'s sake, write down anything.'
                ]}/>
                <InputUsername 
                    value={input}
                    onChange={handleChange} 
                    onSubmit={handleSubmit} 
                    onKeyPress={handleKeyPress}
                    loading={
                        pender.pending['chat/JOIN'] 
                        || pender.pending['chat/FETCH_INITIAL_MESSAGES']
                        || pender.pending['chat/online/FETCH_INITIAL_ONLINE_LIST']
                    }/>
            </Fullscreen>
        );
    }
}

export default connect(
    (state) => ({
        ...state.screen.toJS(),
        pender: state.pender
    }),
    (dispatch) => ({
        ScreenActions: bindActionCreators(screenActions, dispatch),
        ChatActions: bindActionCreators(chatActions, dispatch),
        OnlineActions: bindActionCreators(onlineActions, dispatch)
    })
)(Screen);