import React, { Component } from 'react';


import Screen from 'containers/Screen';
import CreateMessageContainer from 'containers/CreateMessageContainer';
import MessageListContainer from 'containers/MessageListContainer';
import OnlineUsersContainer from 'containers/OnlineUsersContainer';
import HeaderContainer from 'containers/HeaderContainer';

import Layout from 'components/Layout';
// import Helmet from react-helmet
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from 'modules/chat';



class App extends Component {

    handleWindowFocus = () => {
        const { unread, ChatActions } = this.props;

        if(unread > 0) {
            ChatActions.clearUnread();
        }
    }

    componentDidMount() {
        window.addEventListener('focus', this.handleWindowFocus);
    }
    
    render() {
        const { unread } = this.props;

        return (
            <div>
                <Helmet>

                    <meta name="theme-color" content="#343a40"/>
                    <title>{`do:chat${unread>0 ? ` (${unread})` : ''}`}</title>
                </Helmet>
                <Layout>
                    <HeaderContainer/>
                    <Layout.Main>
                        <OnlineUsersContainer/>
                        <Layout.ChatBlock>
                            <MessageListContainer/>
                            <CreateMessageContainer/>
                        </Layout.ChatBlock>
                    </Layout.Main>
                </Layout>
                <Screen/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        unread: state.chat.get('unread')
    }),
    (dispatch) => ({
        ChatActions: bindActionCreators(chatActions, dispatch)
    })
)(App);
