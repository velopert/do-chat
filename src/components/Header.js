import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import MuteButton from './MuteButton';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
    background: ${oc.gray[8]};
    color: white;
    z-index: 5;
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);
    position: relative;
`;

const Text = styled.div`
    font-size: 2em;
    font-family: 'Inknut Antiqua';
`;

const Header = ({muted, onToggleMute}) => (
    <Wrapper>
        <Text>do:chat</Text>
        <MuteButton onClick={onToggleMute} muted={muted}/>
    </Wrapper>
);

Header.propTypes = {
    muted: PropTypes.bool,
    onToggleMute: PropTypes.func
};

export default Header;