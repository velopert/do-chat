import * as firebase from 'firebase';
import { bindActionCreators } from 'redux';
import notify from 'lib/notify';

/**
 * modularized firebase instance
 */
export default (function() {
    const config = {
        apiKey: "AIzaSyAREjI6fd8LhfbI5tO5jo0y5DShOVM-beQ",
        authDomain: "do-chat.firebaseapp.com",
        databaseURL: "https://do-chat.firebaseio.com",
        projectId: "do-chat",
        storageBucket: "do-chat.appspot.com",
        messagingSenderId: "376465104742"
    };

    const subscription = [];

    let ChatActions = null;
    let OnlineActions = null;

    /*
        Trick to retrieve only new data from firebase:
        http://stackoverflow.com/questions/18270995/how-to-retrieve-only-new-data 
    */

    let fetchedInitialMessages = false;
    let fetchedInitialOnlineList = false;

    return {
        /**
         * initializes firebase
         * 
         * @param {object} store 
         */
        initialize(store) {
            firebase.initializeApp(config);

            // load actions creators using require, to make sure firebaseApp loads first before they load.
            // if the modules load first, there will be an error when it creates the penderAction
            const onlineActions = require('modules/online');
            const chatActions = require('modules/chat');

            // binds the action creators for easier use
            ChatActions = bindActionCreators(chatActions, store.dispatch);
            OnlineActions = bindActionCreators(onlineActions, store.dispatch);
        },

        /**
         * joins to the chatroom
         * 
         * @param {string} username 
         * @returns {Promise}
         */
        join(username) {
            const online = firebase.database().ref().child('online').push({username});
            // removes the data when connections goes down
            online.onDisconnect().remove();
            return online;
        },

        /**
         * push new message
         * 
         * @param {object} messageInfo
         * @param {string} messageInfo.username
         * @param {string} messageInfo.message
         * @returns {Promise}
         */
        pushMessage({username, message}) {
            return firebase.database().ref().child('messages').push({
                username,
                message,
                time: firebase.database.ServerValue.TIMESTAMP
            });
        },

        /**
         * retrieve older messages
         * 
         * @param {number} time 
         * @returns {Promise}
         */
        fetchOlderMessages(time) {
            return firebase.database().ref().child('messages')
                                      .orderByChild('time').limitToLast(100).endAt(time-1).once('value')
        },
        
        /**
         * retrieves initial messages
         * 
         * @returns {Promise}
         */
        fetchInitialMessages() {
            const p = firebase.database().ref().child('messages')
                              .limitToLast(100).once('value'); // load last 100
            
            p.then(
                () => {
                    fetchedInitialMessages = true;
                }
            )

            return p;
        },


        /**
         * retrieves initial online list
         * 
         * @returns {Promise}
         */
        fetchInitialOnlineList() {
           const p = firebase.database().ref().child('online').once('value');
           p.then(() => {
               fetchedInitialOnlineList = true;
           })
           return p;
        },

        /**
         * starts listening to the database change
         * (new messages, user enter / leave)
         * 
         */
        startListening() {
            const messages = firebase.database().ref().child('messages').limitToLast(10);
            const online = firebase.database().ref().child('online').limitToLast(10)
            
            // subscription object is added to the array, to unsubscribe later.

            
            subscription.push(
                // listen for new messages
                messages.on('child_added', snapshot => {
                    if(!fetchedInitialMessages) return;
                    
                    ChatActions.receiveMessage([{
                        key: snapshot.key,
                        ...snapshot.val()
                    }]);

                    if(!document.hasFocus()) {
                        notify.play();
                        ChatActions.increaseUnreadCount();
                    }
                }),
                // listen for user enter
                online.on('child_added', snapshot => {
                    if(!fetchedInitialOnlineList) return;

                    OnlineActions.enter({
                        key: snapshot.key,
                        username: snapshot.val().username
                    });
                }),
                // listen for user leave
                online.on('child_removed', snapshot => {
                    OnlineActions.leave(snapshot.key);
                })
            )
        }
    }
})()

