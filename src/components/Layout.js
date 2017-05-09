import styled from 'styled-components';
import { media } from 'lib/style-utils';

const Layout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

Layout.Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;

    ${media.mobile`
        flex-direction: column;
    `}
`;

Layout.ChatBlock = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export default Layout;