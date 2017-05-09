import pop from 'static/pop.mp3';

/**
 * plays the pop sound when there is new message while window is not focused
 */
export default (() => {
    let mute = false;

    return {
        /**
         * play the audio
         */
        play() {
            if(mute) return;
            (new Audio(pop)).play();
        },
        /**
         * mute the sound
         */
        mute() {
            mute = true;
        },
        /**
         * unmute the sound
         */
        unmute() {
            mute = false;
        }
    }
})();