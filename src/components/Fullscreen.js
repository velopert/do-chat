import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import oc from 'open-color';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: white;
    z-index: 10;

    transition: all .5s ease-in;

    ${props => !props.visible && `
        border-right: 1px solid ${oc.gray[6]};
        transform: translate(-100%);
        opacity: 0;
    `}
`;

const Fullscreen = ({children, visible}) => (
    <Wrapper visible={visible}>
        {children}
    </Wrapper>
);

Fullscreen.propTypes = {
    visible: PropTypes.bool
};

export default Fullscreen;