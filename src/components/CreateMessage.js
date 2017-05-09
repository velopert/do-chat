import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    height: 4rem;
    background: white;
    border-top: 1px solid ${oc.gray[2]};
    display: flex;
    padding: 0.5rem;

`;

const Input = styled.input`
    flex: 1;
    font-size: 1.5rem;
    border: none;
    font-weight: 200;
    &:focus {
        outline: none;
    }
`;

const CreateMessage = ({value, onChange, onPressEnter, onToggleHideOnMobile}) => (
    <Wrapper>
        <Input 
            value={value} 
            onKeyPress={(e) => {if(e.key === 'Enter') 
            onPressEnter()}} 
            onChange={onChange}
            onFocus={()=>onToggleHideOnMobile()}
            onBlur={()=>onToggleHideOnMobile()}
        />
    </Wrapper>
);

CreateMessage.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    onToggleHideOnMobile: PropTypes.func
};

export default CreateMessage;