import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { media } from 'lib/style-utils';

const Wrapper = styled.div`
    margin-top: 2rem;
    display: flex;
`;

const Input = styled.input`
    font-size: 3.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-weight: 100;
    text-align: center;
    border: 1px solid ${oc.gray[4]};
    width: 25rem;

    &:focus {
        outline: none;
        color: ${oc.indigo[6]};
        border: 1px solid ${oc.indigo[6]};
    }

    ${media.mobile`
        font-size: 1.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        width: 50vw;
    `}
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 9rem;
    background: ${oc.indigo[6]};
    border: 1px solid ${oc.indigo[8]};
    color: white;
    font-size: 2rem;
    cursor: pointer;

    &:hover {
        background: ${oc.indigo[5]};
    }

    &:active {
        background: ${oc.indigo[7]};
    }

    ${media.mobile`
        font-size: 1.2rem;
        line-height: 2rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        width: 6rem;
    `}
`;

const InputUsername = ({value, onChange, onSubmit, loading, onKeyPress}) => (
    <Wrapper>
        <Input placeholder="name" autoFocus onChange={onChange} value={value} onKeyPress={onKeyPress}/>
        <Button onClick={onSubmit}>
           { loading ? <Spinner/> : 'ENTER' }
        </Button>
    </Wrapper>
);

InputUsername.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onKeyPress: PropTypes.func,
    loading: PropTypes.bool
};

export default InputUsername;