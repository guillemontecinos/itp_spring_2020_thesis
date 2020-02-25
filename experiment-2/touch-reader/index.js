const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
// const url = require('url')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const OSC = require('osc-js')
const expressPort = 3000
const httpPort = 80

server.listen(httpPort)


app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// OSC framework
const options = { send: { port: 11245 } }
const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) })
const oscPort = 9005

// array of notes
// let midiBuffer = []
// let currentArray = []

//=============
// get and post
//=============

app.get("/", function (req, res) {
	// Send UI
	res.sendFile(path.join(__dirname + '/index.html'))
})

//=============================
// Sockets connection to client
//=============================
// Source: https://socket.io/docs/#Using-with-Express
// Resources: https://www.youtube.com/watch?v=soerr09FYCw
io.on('connection', function(socket){
	console.log('Device Connected')
	socket.emit('connection answer', {hello: 'world'})
	// socket.on('click event', function(data){
	// 	console.log(data.click)
	// })
	socket.on('speed event', function(data){
		console.log(data.my)
		console.log('Elapsed time: ' + data.time + ' ms')
	})
})

//=====================
// osc connection to oF
//=====================
// TODO: Connect server with oF app via osc

// osc.on('/time', message => {
//     // console.log(midiBuffer)
//     let tempo = message.args[0]
//     console.log(tempo)
//     if(tempo == 1){
//         // send currentArray[1]
//         if(currentArray.length >= 1){
            // osc.send(new OSC.Message('/off/ 0'), { port: oscPort })
//             osc.send(new OSC.Message('/data/ ' + JSON.stringify(currentArray[1])), { port: oscPort })
//         }
//         else{
//             osc.send(new OSC.Message('/off/ 1'), { port: oscPort })
//             osc.send(new OSC.Message('/data/ nodata'), { port: oscPort })
//         }
//     }
//     else if (tempo == 2) {
//         // send currentArray[2]
//         if(currentArray.length >= 1){
//             osc.send(new OSC.Message('/off/ 0'), { port: oscPort })
//             osc.send(new OSC.Message('/data/ ' + JSON.stringify(currentArray[2])), { port: oscPort })
//         }
//         else{
//             osc.send(new OSC.Message('/off/ 1'), { port: oscPort })
//             osc.send(new OSC.Message('/data/ nodata'), { port: oscPort })
//         }
//     }
//     else if (tempo == 3) {
//         // send currentArray[3]
//         if(currentArray.length >= 1){
//             osc.send(new OSC.Message('/off/ 0'), { port: oscPort })
//             osc.send(new OSC.Message('/data/ ' + JSON.stringify(currentArray[3])), { port: oscPort })
//         }
//         else{
//             osc.send(new OSC.Message('/off/ 1'), { port: oscPort })
//             osc.send(new OSC.Message('/data/ nodata'), { port: oscPort })
//         }
//     }
//     else if (tempo == 4) {
//         if(midiBuffer.length >= 1){
//             // update currentArray
//             currentArray = []
//             for (let i = 0; i < midiBuffer[0].length; i++) {
//                 let auxStr = ''
//                 for (let j = 0; j < midiBuffer[0][i].length; j++) {
//                     auxStr += midiBuffer[0][i][j]
//                     auxStr += ' '
//                 }
//                 currentArray.push(auxStr)
//             }
//             console.log('currentArray: ' + currentArray)
//             // send currentArray[0]
//             osc.send(new OSC.Message('/off/ 0'), { port: oscPort })
//             osc.send(new OSC.Message('/data/ ' + JSON.stringify(currentArray[0])), { port: oscPort })
//             // update midiBuffer
//             for (let i = 0; i < midiBuffer.length - 1; i++) {
//                 midiBuffer[i] = midiBuffer[i + 1]
//             }
//             midiBuffer.pop()
//             console.log('midiBuffer: ' + midiBuffer)
//         }
//         else{
//             currentArray = []
//             osc.send(new OSC.Message('/off/ 1'), { port: oscPort })
//         }
//     }
// })

app.listen(expressPort, function () {
	console.log("Example app listening on port " + expressPort)
})

osc.open({ port: 9913 }) // bind socket to localhost:9912