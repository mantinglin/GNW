# GNW Documentation
***GNW YES!***

## Terms
+ Conversation
    A conversation is a collection of a group of participants who wants to send messages to each other.
      + conversationId: globally unique identifier for each conversation
      + participants: all users that can talk and receive message in this conversation
+ Message Server
    A server instance that handles user's websocket connection.
+ Conversation Server
    A server that provides conversations, act like a in memory database, conversation persistence and do query over conversations.

## API Design

### Customs Service
#### sign up
- @POST `url/signup`
- req: `username`, `password`, `email`, `display_name`, `birthday`.
- res: (char_id to db), `200` / `4XX` / `5XX`
#### login
- @POST `url/login`
- req: `username`, `password`
- res: `200` / `4XX` / `5XX`, `JWT_token`
#### send passcode
- @POST `url/send-passcode`
- req: `username`
- res (RPC call to communication service), `200` / `4XX` / `5XX`
#### change password
- @POST `url/change-password`
- req: `username`, `passcode`, `opaque_token`, `new_password`
- res: `200` / `4XX` / `5XX` (depends on whether the req carries opaque token or not)
#### check authorization
- @POST `url/check-authorization`
- req: `username`, `opaque_token`
- res: `200` / `4XX` / `5XX`
#### Note
- Everytime the client sends a `opaque_token`, the API Gateway would translate the `opaque_token` to `JWT_token`. What the customs service gets is a `JWT_token`.
- Everytime the custom service response with a `JWT_token`, the API Gateway would map the `JWT_token` to `opaque_token`. What the client gets is a `opaque_token`.
- To ensure that the `opaque_token` will not be stolen, the API Gateway must response the `opaque_token` in the Set-Cookie header with the Secure attribute and the HttpOnly attribute.



### User Service

#### get contacts
- @POST `url/getContacts`
- req: jwt, *(username)*
- res: `200` / others
- payload:
```javascript
// alphabetically ordered

[
  {username: "mantinglin", displayName: "Tinglin Man", chatID: "gnw_id_10086"},
  {username: "luoxiaolei", displayName: "Xiaolei Luo", chatID: "gnw_id_10010"},
]
```

#### get incoming friend requests
- @POST `url/getIncomingFriendRequests`
- req: jwt, *(username)*
- res: `200` / others
- payload:
```javascript
// chronologically ordered

[
  {username: "mantinglin", displayName: "Tinglin Man", chatID: "gnw_id_10086"},
  {username: "luoxiaolei", displayName: "Xiaolei Luo", chatID: "gnw_id_10010"},
]
```

#### get pending friend requests
- @POST `url/getPendingFriendRequests`
- req: jwt, *(username)*
- res: `200` / others
- payload:
```javascript
// chronologically ordered

[
  {username: "mantinglin", displayName: "Tinglin Man", chatID: "gnw_id_10086"},
  {username: "luoxiaolei", displayName: "Xiaolei Luo", chatID: "gnw_id_10010"},
]
```
#### add friend
- @POST `url/addFriend`
- req: jwt, friend_username, *(username)*
- res: `200` / others

#### unfriend
- @POST `url/unfriend`
- req: jwt, friend_username, *(username)*
- res: `200` / others

#### invite friend
- @POST `url/inviteFriends`
- req: jwt, friend_email, *(username)*
- res: `200` / others

#### get pending results
**upon friend is added, the server should generate the `conversationId` and associate it with the contact**
- @GET `url/pending`
- req: jwt
- res: All pending friend requests and potential result(approved/denied, conversationId)


## Database Schema
```sql
create table user (
    uuid int not null auto_increment,
    username varchar(255) not null,
    display_name varchar(255) not null,
    email varchar(255) not null,
    primary key (uuid),
    unique (username)
);

create table auth (
    uuid int not null,
    hashed_password varchar(255) not null,
    primary key (uuid)
);

create table contact (
    id int not null auto_increment,
    uuid_a int not null,
    uuid_b int not null,
    primary key (id)
);

create table friend_request (
    id int not null auto_increment,
    uuid_a int not null,
    uuid_b int not null,
    primary key (id)
);

create table p2p_chat (
    chat_id varchar(255) not null,
    uuid_a int not null,
    uuid_b int not null,
    primary key (chat_id)
);

create table p2g_chat (
    chat_id varchar(255) not null,
    uuid int not null,
);
```
