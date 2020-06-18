var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// var firebase = require("firebase/app");
// var firestore = require("firebase/firestore");

// var firebaseConfig = {
//     apiKey: "AIzaSyCvPH0-BlduvaKqgPDQGT8qpn8S-g40gGs",
//     authDomain: "im-server-50ced.firebaseapp.com",
//     databaseURL: "https://im-server-50ced.firebaseio.com",
//     projectId: "im-server-50ced",
//     storageBucket: "im-server-50ced.appspot.com",
//     messagingSenderId: "493840400213",
//     appId: "1:493840400213:web:31061332eeb4038c2739dc"
// };
// firebase.initializeApp(firebaseConfig);

// firebase.firestore().collection()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    //{'target': conversationId, 'type': ['text', ...],'message': content}
    socket.on('chatMessage', (data) => {
        io.emit('chat message', msg);
    });

    //{'token': jwtToken}
    socket.on('connection', (data) => {

    })

    //{'conversation': [conversationId], 'lastSeen': [messageIdOfLastSeen]}
    socket.on('fetchChat', (data) => {

    })
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});