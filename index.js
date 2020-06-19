var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var cache = require('./cache/cache')
var chatService = require('./conversationServer/chatServer')
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


var serverId = 'msgServer1'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

function fakeAuth(jwt) {
    return jwt
}

io.on('connection', (socket) => {
    //io.emit("newConn", "asddasadsasd")
    //console.log("New connection: %s", socket)
    //{'cId': conversationId, 'message': {'type': str, 'payload': data}}
    socket.on('chatMessage', (data) => {
        let _ts = Date.now()
        data['message'].timestamp = _ts
        console.log(data)
        chatService.addChatTo(data['cId'], data['message'])
        io.to(data['cId']).emit('chatMessage',data['message'])
    });

    //{'token': jwtToken}
    socket.on('connection', (data) => {
        console.log("New connection: %s",data)
        //let uid = fakeAuth(data)
        //cache.fakeCache[uid] = serverId
    })

    //{'cIds': [conversationId], 'timestamps': [messageIdOfLastSeen]}
    socket.on('fetchChat', (data) => {
        console.log(data)
        let cIds = data['cIds']
        let timestamps = data['timestamps']
        let chatToPush = {}
        for(let c=0;c<cIds.length;c++) {
            console.log("Joining %s", cIds[c])
            socket.join(cIds[c])
            chatToPush[cIds[c]] = chatService.getChatAfter(cIds[c], timestamps[c])
        }
        socket.emit('fetchChat', chatToPush)
    })
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});