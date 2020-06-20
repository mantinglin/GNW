const PROTO_PATH = '../protos/message_chat.proto'

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
var ChatService = protoDescriptor.ChatService
//var Server = new grpc.Server();

function NewMessage(call, callback) {
    //console.log(call)
    //addChatTo(call.request.cId, call.request.msg)
    callback(null, {status: 200})
}

function FetchOfflineChat(call, callback) {
    call.on('data', function (req) {
        console.log(req)
        call.write({
            cId: req.cId,
            msgs: getChatAfter(req.cId, req.timestamp)
        })
    });
    call.on('end', function () {
        call.end();
    });
}

function main() {
    var server = new grpc.Server();
    server.addService(ChatService.ChatService.service, { NewMessage: NewMessage, FetchOfflineChat: FetchOfflineChat });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

var chatHistory = new Map()
chatHistory.set('1', [
    { type: 'text', payload: 'ruarua', timestamp: 0 },
    { type: 'text', payload: 'ruaruarua', timestamp: 5 }
])

chatHistory.set('2', [
    { type: 'text', payload: 'ruarua2', timestamp: 3 },
    { type: 'text', payload: 'ruaruarua2', timestamp: 11 }
])

function getChatAfter(cId, ts) {
    let chat = chatHistory.get(cId)
    //if(chat === null) chat = []
    for(let i = chat.length-1;i>=0;i--) {
        //console.log(chat[i])
        if(chat[i]['timestamp'] > ts) {
            console.log(chat.slice(i))
            return chat.slice(i)
        }
    }
    console.log("No chat history")
    return []
}

function addChatTo(cId, chat) {
    chatHistory.get(cId).push(chat)
    return 200
}

main()