import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { media } from 'lib/style-utils';

const Wrapper = styled.div`
    width: 13rem;
    background: white;
    border-right: 1px solid ${oc.gray[2]};
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);
    z-index: 3;
    display: flex;
    flex-direction: column;

    ${media.mobile`
        width: auto;
        min-height: 7rem;
        height: 15vh;
        transition: all .5s;

        ${props => props.hideOnMobile && `
            min-height: 0rem;
            height: 0vh;
            overflow: hidden;
        `}
    `}
`;

const Count = styled.div`
    font-weight: 200;
    color: ${oc.gray[7]};
    text-align: center;
    line-height: 1rem;
    padding: 1rem;
`;

const BoldNumber = styled.span`
    font-weight: 600;
    color: ${oc.gray[9]};
`;

const UserContainer = styled.div`
    border-top: 1px solid ${oc.gray[3]};
    flex: 1;
    overflow-y: auto;
    
`;

const User = styled.div`
    line-height: 1rem;
    padding: 0.5rem;

    /* adds ... when username is too long */
    text-overflow: ellipsis; 
    white-space: nowrap; 
    overflow: hidden;

    & + & {
        border-top: 1px solid ${oc.gray[1]};
    }
`;

class OnlineUsers extends Component {

    static propTypes = {
        online: ImmutablePropTypes.listOf(
            ImmutablePropTypes.mapContains({
                key: PropTypes.string,
                username: PropTypes.string
            }),
        ),
    }

    static defaultProps = {
        online: List()
    }

    render() {
        const { online, hideOnMobile } = this.props;

        const count = online.size;

        const onlineList = online.map(
            user => (
                <User key={user.get('key')}>
                    {user.get('username')}
                </User>
            )
        )

        return (
            <Wrapper hideOnMobile={hideOnMobile}>
                <Count>
                    { count === 1 ? 'You are alone here :(' : <div><BoldNumber>{count}</BoldNumber> users are online</div> }
                </Count>
                <UserContainer>
                    { onlineList }
                </UserContainer>
            </Wrapper>
        )
    }
}

export default OnlineUsers;