import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import oc from 'open-color';
import { media } from 'lib/style-utils';

const Text = styled.div`
    height: 3rem;
    font-size: 3rem;
    font-weight: 100;
    color: ${oc.gray[8]};
    transition: all .5s;

    ${media.mobile`
        font-size: 1.5rem;
    `}
`;

class Typewriter extends Component {
    timeOutId = null

    state = {
        index: 0,
        cursorPos: 0,
        erase: false
    }

    static defaultProps = {
        texts: ['sample text1', 'sample text2']
    }

    static ropTypes = {
        texts: PropTypes.arrayOf(PropTypes.string)
    }
    
    nextText = () => {
        const { texts } = this.props;
        const nextIndex = this.state.index + 1;
        this.setState({
            index: nextIndex === texts.length ? 0 : nextIndex,
            erase: false
        });
    }

    nextCursorPos = () => {
        const { erase, index } = this.state;
        const { texts } = this.props;
        
        const pos = this.state.cursorPos + (erase ? -1 : 1);

        // transition to erase when done with writing
        if(!erase && pos === texts[index].length + 1) {
            this.setState({
                erase: true
            });

            // show 3 seconds, then continue
            this.timeoutId = setTimeout(this.nextCursorPos, 3000);
            return;
        }

        // show next text when everything is erased
        if(erase && pos === -1) {
            this.nextText();
            this.timeoutId = setTimeout(this.nextCursorPos, 150);
            return;
        }

        this.setState({
            cursorPos: pos
        });

        // repeat 50ms later
        this.timeoutId = setTimeout(this.nextCursorPos, 50);
    }

    componentDidMount() {
        this.nextCursorPos();
    }
    

    render() {
        const { index, cursorPos } = this.state;
        const { texts } = this.props;

        return (
            <Text>{texts[index].slice(0, cursorPos)}</Text>
        );
    }
}

export default Typewriter;