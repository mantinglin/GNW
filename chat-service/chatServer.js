var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var chatService = require('../chat-data-service/chatDataServer')

var serverId = 'msgServer1'
let local_session = new Map()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

function fakeAuth(jwt) {
    return jwt
}

function getSocketUid(socketId) {
    return local_session.get(socketId)['uid']
}

io.on('connection', (socket) => {
    //{'cId': conversationId, 'message': {'type': str, 'payload': data}}
    socket.on('chatMessage', (data) => {
        let _ts = Date.now()
        data['message']['timestamp'] = _ts
        data['message']['from'] = getSocketUid(socket.id)
        console.log(data)
        chatService.addChatTo(data['cId'], data['message'])
        io.to(data['cId']).emit('chatMessage',data['message'])
    });

    //{'token': jwtToken}
    socket.on('connection', (data) => {
        console.log("New connection: %s",data)
        let uid = fakeAuth(data)
        local_session[socket.id] = {'uid': uid}
    })

    //{'cIds': [conversationId], 'timestamps': [timestampOfLastSeen]}
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