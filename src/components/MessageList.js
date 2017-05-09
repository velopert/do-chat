import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import Message from './Message';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    position: relative;
`;

const ListContainer = styled.div`
    flex: 1;
    padding-left: 1rem;
    padding-right: 1rem;
    overflow: auto;
`;

const ScrollBottomButton = styled.div`
    position: absolute;
    right: 1.5rem;
    bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    background: ${oc.gray[8]};
    color: white;
    border: 1px solid ${oc.gray[9]};
    cursor: pointer;

    &:hover {
        background: ${oc.gray[7]};
    }

    &:active {
        background: ${oc.gray[9]};
    }

    ${props => !props.visible && `
        visibility: hidden
    `}
`;

class MessageList extends Component {
    static defaultProps = {
        message: List()
    }

    static propTypes = {
        messages: ImmutablePropTypes.listOf(
            ImmutablePropTypes.mapContains({
                key: PropTypes.string,
                message: PropTypes.string,
                username: PropTypes.string,
                time: PropTypes.number
            }),
        ),
        onDecreasePage: PropTypes.func,
        onIncreasePage: PropTypes.func,
        onResetPage: PropTypes.func,
        page: PropTypes.number
    }

    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.messages !== this.props.messages) {

            const { clientHeight, scrollHeight, scrollTop } = this.wrapper;

            // scroll to bottom when scroll is at bottom already
            if(scrollHeight - clientHeight- scrollTop < 200) {
                this.wrapper.scrollTop = this.wrapper.scrollHeight;
            }

            // scroll to bottom when initial data comes in
            if(prevProps.messages.size === 0 && this.props.messages.size !==0){
                this.wrapper.scrollTop = this.wrapper.scrollHeight;
            }           
        }
        
        // when current scrollToBottom is true, scroll it and toggle the value
        // this is executed when user writes new message.
        if(!prevProps.scrollToBottom && this.props.scrollToBottom) {
            this.handleScrollToBottom();
            this.props.onInformScrolledToBottom();
        }
    }


    // increases or decreases the page according to the scrollbar position
    handleScroll = async (e) => {

        const { clientHeight, scrollHeight, scrollTop } = e.target;
        const { messages, onIncreasePage, onDecreasePage, onFetchOlderMessages, page } = this.props;

        const scrollPercentage = scrollTop/(scrollHeight-clientHeight) ;

        // make sure that scrollTop never gets to 0
        // if the value is 0, it will stay at 0 when new data comes in at the top.
        if(scrollTop === 0) {
            this.wrapper.scrollTop = 1;
        }

        // if scoll is at 30%, and there is no more contents, try loading older messages
        if(scrollPercentage < 0.3 && messages.size - (page + 1) * 100 <= 0) {
            onFetchOlderMessages();
            return;
        }

        // scrollbar is at topmost, increase the page.
        if(scrollPercentage < 0.05) {        
            onIncreasePage();
        }

        // scrollbar is at bottom, decrease the page.
        if(scrollPercentage > 0.95 && page > 1) {
            onDecreasePage();
        }
    }

    // resets the page and scroll to bottom
    handleScrollToBottom = async () => {
        const { onResetPage } = this.props;
        
        await onResetPage();
        // make sure to change scrollTop after action is dispatched.
        this.wrapper.scrollTop = this.wrapper.scrollHeight;
    }
    

    render() {
        const { messages, page } = this.props;
        const { handleScroll, handleScrollToBottom } = this;

        const size = messages.size;

        // slice the messages for performance optimization
        // visible messages count is limited to 300.

        let start = size - (page + 1) * 100;
        let end = size - (page > 2 ? (page-2) * 100 : 0);

        const slicedMessages = messages.slice(start < 0 ? 0 : start, end < 300 ? 300 : end);

        const messageList = slicedMessages.map(
            (message) => (
                <Message
                    {...message.toJS()}
                    messageInstance={message}
                />
            )
        )

        return (
            <Wrapper>
                <ListContainer innerRef={ref=>{this.wrapper = ref}} onScroll={handleScroll}>
                    {messageList}
                </ListContainer>
                <ScrollBottomButton visible={page > 2} onClick={handleScrollToBottom}>
                    GO TO BOTTOM
                </ScrollBottomButton>
            </Wrapper>
        )
    }
}

export default MessageList;