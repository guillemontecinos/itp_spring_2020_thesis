const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const OSC = require('osc-js')

const expressPort = 3000

app.use(bodyParser.urlencoded({ extended: false }))

// HTTP framework for socket
const httpPort = 80
server.listen(httpPort)

// OSC framework
const options = { send: { port: 11245 } }
const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) })
const oscPort = 9005

//=============
// get and post
//=============
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
})

//=====================
// osc connection to oF
//=====================
// Source: https://github.com/adzialocha/osc-js/wiki/Node.js-Server
osc.on('open', function(){
	osc.send(new OSC.Message('/hello/'), { port: oscPort })
})

//=============================
// Sockets connection to client
//=============================
// Source: https://socket.io/docs/#Using-with-Express
io.on('connection', function(socket){
	console.log('Device Connected')
	socket.emit('connection answer', {hello: 'world'})
	socket.on('speed event', function(data){
		console.log(data.my)
		console.log('Elapsed time: ' + data.time + ' ms')
		osc.send(new OSC.Message('/data/' + data.time), { port: oscPort })
	})
})

app.listen(expressPort, function () {
	console.log("Example app listening on port " + expressPort)
})

osc.open({ port: 9913 }) // bind socket to localhost:9912