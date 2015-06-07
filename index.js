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
  connection.on('message', handleMessage)
}

function handleMessage (message) {
  console.log(message)
}

