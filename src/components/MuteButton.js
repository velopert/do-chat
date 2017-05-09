import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import MuteIcon from 'react-icons/lib/md/volume-off';

const Wrapper = styled.div`
    position: absolute;
    font-size: 2.5rem;
    color: ${oc.gray[6]};
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
        color: ${oc.gray[5]};
    }

    &:active {
        color: ${oc.gray[1]};
    }

    ${props => props.muted && `
        color: ${oc.gray[1]};
        &:hover {
            color: ${oc.gray[2]};
        }
    `}
`;

const MuteButton = ({muted, onClick}) => (
    <Wrapper muted={muted} onClick={onClick}>
        <MuteIcon/>
    </Wrapper>
);

MuteButton.propTypes = {
    muted: PropTypes.bool,
    onClick: PropTypes.func
};

export default MuteButton;