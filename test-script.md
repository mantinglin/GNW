#### test `addUser`
```sh
curl localhost:8080/addUser -d username=mantinglin -d displayName=Tinglin%20Man -d email=me@me.com -d password=12315

curl localhost:8080/addUser -d username=xiaoleiluo -d displayName=Xiaolei%20Luo -d email=me1@me.com -d password=12316

curl localhost:8080/addUser -d username=xiaoleiluo2 -d displayName=Xiaolei%20Luo2 -d email=me2@me.com -d password=12317

curl localhost:8080/addUser -d username=xiaoleiluo3 -d displayName=Xiaolei%20Luo3 -d email=me3@me.com -d password=12318

curl localhost:8080/addUser -d username=xiaoleiluo4 -d displayName=Xiaolei%20Luo4 -d email=me4@me.com -d password=12319
```

#### test `getRequestsFromMe`, `getRequestsFromMe`
```sh
curl localhost:8080/addFriend -d uuid=1 -d friendUUID=2
curl localhost:8080/addFriend -d uuid=3 -d friendUUID=2

curl localhost:8080/getRequestsFromMe -d uuid=1
curl localhost:8080/getRequestsFromMe -d uuid=2
```

#### test `acceptRequest`
```sh
curl localhost:8080/acceptRequest -d uuid=2 -d requesterUUID=1
curl localhost:8080/acceptRequest -d uuid=2 -d requesterUUID=3

curl localhost:8080/getContacts -d uuid=2
```

#### test `unfriend`
```sh
curl localhost:8080/unfriend -d uuid=2 -d friendUUID=1

curl localhost:8080/getContacts -d uuid=2
curl localhost:8080/getContacts -d uuid=1
curl localhost:8080/getContacts -d uuid=3
```
