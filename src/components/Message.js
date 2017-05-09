import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.25rem;
`;

const Username = styled.span`
    font-weight: 500;
    color: ${oc.gray[9]};
    margin-right: 0.25rem;
`;

const Text = styled.span`
    font-weight: 300;
    color: ${oc.gray[7]};
`;

class Message extends Component {

    static propTypes = {
        message: PropTypes.string,
        username: PropTypes.string
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.messageInstance !== this.props.messageInstance;
    }
    
    
    render() {
        const { message, username } = this.props;

        return (
            <Wrapper>
                <Username>{username}</Username>
                <Text>{message}</Text>
            </Wrapper>
        );
    }
}

export default Message;
