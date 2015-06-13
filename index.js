var WebSocket = require('ws')
var nconf = require('nconf')

var config = nconf.argv().env().file({
  file: 'config.json'
})
var server = new WebSocket.Server({
  port: config.get('HUB_PORT')
})

server.on('connection', handleConnection)

function handleConnection (connection) {
  console.log('new connection')
  connection.on('message', handleMessage)
}

function handleMessage (message) {
  var json = JSON.parse(message)

  if (json.channel) {
    registerChannel(this, json.channel)
  } else if (this.sender) {
    console.log('new message received')
    console.log('broadcasting')
    server.clients.forEach(function (socket) {
      if (socket.receiver) {
        socket.send(message)
      }
    })
  }
}

function registerChannel(socket, channel) {
  if (channel.indexOf('sender') > -1) {
    socket.sender = true
    console.log('sender registered')
  }
  if (channel.indexOf('receiver') > -1) {
    socket.receiver = true
    console.log('receiver registered')
  }
}
