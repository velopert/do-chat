import React, { Component } from 'react';
import MessageList from 'components/MessageList';
import { connect } from 'react-redux';
import * as chatActions from 'modules/chat';
import { bindActionCreators } from 'redux';


class MessageListContainer extends Component {

    handleFetchOlderMessages = async () => {
        const { ChatActions, messages, lastFetchedTime, fetching } = this.props;

        // cancel the task when message list is empty or fetching
        if(messages.size === 0 || fetching) return;
        
        // get the time of the first message
        const time = messages.getIn([0, 'time']);

        // if it is same as last fetched time, return
        if(lastFetchedTime === time) return;
        await ChatActions.fetchOlderMessages(time);
        ChatActions.increasePage();
    }

    render() {
        const { messages, ChatActions, page, scrollToBottom } = this.props;
        const { handleFetchOlderMessages } = this;

        return (
            <MessageList
                messages={messages}
                page={page}
                scrollToBottom={scrollToBottom}
                onFetchOlderMessages={handleFetchOlderMessages}
                onIncreasePage={ChatActions.increasePage}
                onDecreasePage={ChatActions.decreasePage}
                onResetPage={ChatActions.resetPage}
                onInformScrolledToBottom={ChatActions.scrollToBottom}
            />
        );
    }
}

export default connect(
    (state) => ({
        messages: state.chat.get('messages'),
        page: state.chat.get('page'),
        lastFetchedTime: state.chat.get('lastFetchedTime'),
        fetching: state.pender.pending['chat/FETCH_OLDER_MESSAGES'],
        scrollToBottom: state.chat.get('scrollToBottom')
    }),
    (dispatch) => ({
        ChatActions: bindActionCreators(chatActions, dispatch)
    })
)(MessageListContainer);