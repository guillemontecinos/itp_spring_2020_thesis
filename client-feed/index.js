const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const OSC = require('osc-js')
const fs = require('fs')

const expressPort = 3000

let imageReg = [
	__dirname + '/private/0.jpg',
	__dirname + '/private/1.jpg',
	__dirname + '/private/2.jpg',
	__dirname + '/private/3.jpg',
	__dirname + '/private/4.jpg',
	__dirname + '/private/5.jpg',
	__dirname + '/private/6.jpg',
	__dirname + '/private/7.jpg',
	__dirname + '/private/8.jpg',
	__dirname + '/private/9.jpg',
	__dirname + '/private/10.jpg',
	__dirname + '/private/11.jpg',
	__dirname + '/private/12.jpg',
	__dirname + '/private/13.jpg',
	__dirname + '/private/14.jpg',
	__dirname + '/private/15.jpg',
	__dirname + '/private/16.jpg',
	__dirname + '/private/17.jpg',
	__dirname + '/private/18.jpg',
	__dirname + '/private/19.jpg',
	__dirname + '/private/20.jpg'
]

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
	if(imageReg.length > 0) {
		let reqPath = path.join(imageReg[Number(req.query.id)])
		console.log('sending: ' + reqPath)
		res.sendFile(reqPath)
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
		// console.log(data.my + ' at ' + data.speed + ' px/s')
		let message = new OSC.Message(['swipespeed'], data.speed.toString())
		osc.send(message, {host: 'localhost'})
	})

	// osc listener inside socket connection
	osc.on('/screenshot', message => {
		let aux = message.args[0].split('/')
		let localPath =  __dirname + '/private/' + aux[aux.length - 1]
		setTimeout(function(){
			fs.copyFile(message.args[0],localPath, (err) => {
				if (err) throw err;
				// this is to avoid duplications in the image reg because as the osc.on is declared inside the io.on, every event gets duplicated
				if(imageReg.length == 0 || imageReg.length > 0 && imageReg[imageReg.length - 1] != localPath) {
					imageReg.push(localPath)
					console.log('receiving: ' + message.args[0])
				} 
				socket.emit('screenshot added', {index: ''})
			})
		}, 300)
	})
})

app.listen(expressPort, function () {
	console.log("Example app listening on port " + expressPort)
})

osc.open({ port: 9000 }) // bind socket to localhost:9000