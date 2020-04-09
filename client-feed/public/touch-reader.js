// Source code: http://www.javascriptkit.com/javatutors/touchevents2.shtml
// Resources: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events

// Source: https://socket.io/docs/#Using-with-Express
// TODO: update this address with the current IP
let socket = io.connect('http://192.168.1.4')
socket.on('connection answer', function(data){
    console.log(data)
})

// Create listener and manages touchs
window.addEventListener('load', function(){
    let touchSurface = document,
    startY,
    elapsedTime,
    startTime,
    dist

    touchSurface.addEventListener('touchstart', function(e){
        let touchObj = e.changedTouches[0]
        dist = 0
        startX = touchObj.pageX
        startY = touchObj.pageY
        startTime = new Date().getTime()
        // e.preventDefault()
        // debug
        // socket.emit('click event', {click: 'Screen clicked'})
    }, false)

    touchSurface.addEventListener('touchmove', function(e){
        // e.preventDefault()
    }, false)

    touchSurface.addEventListener('touchend', function(e){
        let touchObj = e.changedTouches[0]
        dist = startY - touchObj.pageY
        elapsedTime = new Date().getTime() - startTime
        let speed = dist / elapsedTime
        // console.log('speed: ' + speed)
        socket.emit('speed event', {my: 'swiped', speed: speed})
        // e.preventDefault()
    }, false)

}, false)   