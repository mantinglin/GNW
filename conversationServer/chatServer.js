
module.exports = {
    getChatAfter: getChatAfter,
    addChatTo: addChatTo
}

var chatHistory = new Map()
chatHistory['1'] = [
    { type: 'text', payload: 'ruarua', timestamp: 0},
    { type: 'text', payload: 'ruaruarua', timestamp: 5 }
]

chatHistory['2'] = [
    { type: 'text', payload: 'ruarua2', timestamp: 3 },
    { type: 'text', payload: 'ruaruarua2', timestamp: 11 }
]

function getChatAfter(cId, ts) {
    //console.log(cId)
        let chat = chatHistory[cId]
    //console.log(chat)
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
        chatHistory[cId].push(chat)
    }
