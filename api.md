+ auth : {'token': str}
+ message : {'data': str, 'dest': conversationId}
+ 
message sequence

grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../messageServer --grpc_out=../messageServer/static_codegen --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` message_chat.proto