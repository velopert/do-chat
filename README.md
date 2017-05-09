## do-chat

This is a sample ChatApp project that uses [redux-pender](https://github.com/velopert/redux-pender) to handle asynchronous actions. This project is a good examplary project that uses [Ducks Structure](https://github.com/erikras/ducks-modular-redux) for redux. It is very well-commented, so reading through the codes of this project might be useful if you are a React beginner.

Firebase is used as backend in this app.

Preview is available at: https://dochat.vlpt.us/

## Features

- Realtime chat
- Optimized Infinite Scrollable MessageList component 
- Notification sound when the page is not focused.

## Getting Started

### Create Firebase Project
This chat application uses firebase to store messages. Go to [Firebase Console](https://console.firebase.google.com/?hl=ko) and create a new project. Then, open the database from the sidebar, then click the Rules tab.

Copy & Paste the rule below:

```json
{
  "rules": {
    "online": {
      ".write": true,
      ".read": true
    },
    "messages": {
      ".write": true,
      ".read": true,
      ".indexOn": "time"
    }
  }
}
```

Since this project is just a sample project, this database is not secured enough, and allows every data read & write on `online` and `messages`.  To make it more secure, you will need to implement the user authentication part, and alter the database rules accordingly.

### Prerequisites
- yarn (or npm)

That's all!

### Installing

```sh
yarn
# or npm install
```

> Use yarn, it is way faster than npm.

### Development Server
This command will start the webpack-dev-server
```sh
yarn start
```

### Build
This command will create optimized bundle files of the project.
```sh
yarn build
```

This project does not come with a backend server. Every data logic is dependant on firebase.
Serve the `public` directory on your static web server. (You can use [surge](http://surge.sh/) or [now](http://now.sh/))

