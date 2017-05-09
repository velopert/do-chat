import React from 'react';
import styled from 'styled-components';
import { media } from 'lib/style-utils';

const Wrapper = styled.div`
    font-family: 'Inknut Antiqua';
    font-size: 5rem;
    margin-bottom: 2.5rem;
    transition: all .5s;

    ${media.mobile`
        font-size: 3rem;
        line-height: 3rem;
        margin-bottom: 1rem;
    `}
`;

const Logo = () => (
    <Wrapper>
        do:chat
    </Wrapper>
);

export default Logo;