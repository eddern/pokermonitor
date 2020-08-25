// const {HelloRequest, HelloReply} = require('./helloworld_pb.js');
// const {GreeterClient} = require('./helloworld_grpc_web_pb.js');
//
// var client = new GreeterClient('http://localhost:8080');
//
// var request = new HelloRequest();
// request.setName('World');
//
// client.sayHello(request, {}, (err, response) => {
//     console.log(response.getMessage());
// });
const {JoinGameRequest, GameInfo} = require("./Pokermonitor_pb")
const {PokermonitorClient} = require("./Pokermonitor_grpc_web_pb")


const client = new PokermonitorClient("http://localhost:8080", null, null)

let joinRequest = new JoinGameRequest()
joinRequest.setName("espen")
joinRequest.setGameid("01EGH44Z9EDFE01C7DJ72Z1NTH")

client.joinGame(joinRequest, {},(err, res ) => {
    console.log(err)
    console.log(res)
})

let listRequest = new GameInfo()
listRequest.setId("01EGH44Z9EDFE01C7DJ72Z1NTH")


let stream = client.listPlayers(listRequest, {})

stream.on("data", (data) => {
    console.log(data)
})