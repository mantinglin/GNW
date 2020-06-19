const PROTO_PATH = './protos/message_chat.proto'

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

function main() {
    var client = new ChatService.ChatService('localhost:50051',
        grpc.credentials.createInsecure());
    var user;
    // if (process.argv.length >= 3) {
    //     user = process.argv[2];
    // } else {
    //     user = 'world';
    // }
    let call = client.FetchOfflineChat()

    call.on('data', function(d) {
        console.log(d)
    })
    call.on('end', function (d,e) {
        console.log('END')
    })
    let fakechats = [{ cId: 1, timestamp: 5 }, { cId: 2, timestamp: 0 }]
    for(let i=0;i<fakechats.length;i++) {
        call.write(fakechats[i])
    }
    call.end()

    client.NewMessage({cId:1, msg:{type:'text', payload: 'RUA!'}}, function(e, d){console.log(d)})
    // client.sayHello({ name: user }, function (err, response) {
    //     console.log('Greeting:', response.message);
    // });
}

main();