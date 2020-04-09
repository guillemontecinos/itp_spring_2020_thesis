const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const OSC = require('osc-js')
const fs = require('fs')

const expressPort = 3000

let imageReg = []

app.use(bodyParser.urlencoded({ extended: false }))

// HTTP framework for socket
const httpPort = 80
server.listen(httpPort)

// OSC framework
const options = { send: { port: 12345 } }
const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) })

//=============
// get and post
//=============
// TODO: learn how to listen json fetch and respond to it
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/reality', function (req, res) {
	// console.log(req.query.id)
	if(imageReg.length > 0) {
		console.log('sending: ' + path.join(imageReg[Number(req.query.id)]))
		res.sendFile(path.join(imageReg[Number(req.query.id)]))
	}
	else {
		res.err
	}
})


//=====================
// osc connection to oF
//=====================
// Source: https://github.com/adzialocha/osc-js/wiki/Node.js-Server
osc.on('open', function(){
	osc.send(new OSC.Message('/hello'), { host: 'localhost'})
})

//=============================
// Sockets connection to client
//=============================
// Source: https://socket.io/docs/#Using-with-Express
io.on('connection', function(socket){
	console.log('Device Connected')
	socket.emit('connection answer', {hello: 'world'})
	socket.on('speed event', function(data){
		console.log(data.my + ' at ' + data.speed + ' px/s')
		let message = new OSC.Message(['swipetime'], data.speed.toString())
		osc.send(message, {host: 'localhost'})
	})

	// osc listener inside socket connection
	osc.on('/screenshot', message => {
		console.log(message.args)
		let aux = message.args[0].split('/')
		let localPath =  __dirname + '/private/' + aux[aux.length - 1]
		setTimeout(function(){
			fs.copyFile(message.args[0],localPath, (err) => {
				if (err) throw err;
				imageReg.push(localPath)
				socket.emit('screenshot added', {index: ''})
			})
		}, 300)
	})
})

app.listen(expressPort, function () {
	console.log("Example app listening on port " + expressPort)
})

osc.open({ port: 9000 }) // bind socket to localhost:9000