// This script loads all images from a .json scraped from instagram

let jDat

let prevTime = 0
let prevTop = 0

let screenshotCue = 0
let screenshotDisplay = 0

let path = "/feed-content/feed-content.json"

// Source: https://socket.io/docs/#Using-with-Express
// TODO: update this address with the current IP
let socket = io.connect('http://192.168.1.8')
socket.on('connection answer', function(data){
    console.log(data)
})

socket.on('screenshot added', function(data){
    screenshotCue++
    console.log('screenshotCue: ' + screenshotCue)
})

fetch(path)
  .then(response => response.json())
  .then(json => 
        {
            jDat = json
            let datLen = jDat.GraphImages.length
            
            let i = 0
            for (; i < 2; i++) {
                appendDivElement(jDat.GraphImages[i][1])
            }

            $(window).scroll(function(){
                // calculates and sends scroll speed
                let currentTop = $(window).scrollTop()
                let currentTime = new Date().getTime()
                let pixDelta = currentTop - prevTop
                let deltaTime = currentTime - prevTime
                let speed = pixDelta / deltaTime
                socket.emit('speed event', {my: 'swiping', speed: speed})
                prevTime = currentTime
                prevTop = currentTop

                // implements append divs under scroll
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
                    // TODO: Improve Instagram look
                    // TODO: fetch data on every scroll, so I can send data that has been created on realtime
                    if(screenshotCue > 0){
                        for(let j = 0; j < 2; j++)
                        {
                            if(j + i >= datLen) i = 0
                            appendDivElement(jDat.GraphImages[j + i][1], false)
                        }
                        i += 2
                        appendDivElement(null, true)
                        screenshotCue--
                        console.log('screenshotCue: ' + screenshotCue)
                    }
                    else{
                        for(let j = 0; j < 3; j++)
                        {
                            if(j + i >= datLen) i = 0
                            appendDivElement(jDat.GraphImages[j + i][1], false)
                        }
                        i += 3                    
                    }
                    
                    // TODO: See how to read touch events out of here so we have the actual direciton and speed of the gesture
                }
            })
    });

function appendDivElement(jsonObject, isScreenshot){
    if(!isScreenshot){
        if(jsonObject.__typename == "GraphVideo") return
    }

    let card = document.createElement('div')
    card.className = "card"
    let cardHeader = document.createElement('div')
    cardHeader.className = "card-header"
    let profileImage = document.createElement('div')
    profileImage.className = "profile-image"
    let profileInfo = document.createElement('div')
    profileInfo.className = "profile-info"
    let name = document.createElement('div')
    name.className = "name"
    // name.innerText = jsonObject.username
    name.innerText = "deformedrealities"
    let locationDiv = document.createElement('div')
    locationDiv.className = "location"
    locationDiv.innerText = "Santiago, Chile"
    let time = document.createElement('div')
    time.className = "time"
    let content = document.createElement('div')
    content.className = "content"
    let contentImg = document.createElement('img')
    if(isScreenshot)
    {
        // get from certain path
        contentImg.src = '/reality?id=' + screenshotDisplay
        screenshotDisplay++ 
        console.log('screenshotDisplay: ' + screenshotDisplay)
    }
    else
    {
        contentImg.src = jsonObject.display_url
    }
    let cardFooter = document.createElement('div')
    cardFooter.className = "card-footer"
    let likes = document.createElement('div')
    likes.className = "likes"
    let description = document.createElement('div')
    description.className = "description"
    let p = document.createElement('p') 
    let username = document.createElement('span')
    username.className = "name"
    // username.innerText = jsonObject.username
    username.innerText = "deformedrealities"
    let descriptionText = document.createElement('span')
    descriptionText.className = "description-text"
    if (isScreenshot) {
        // set caption with quotes
    }
    else {
        if(jsonObject.edge_media_to_caption.edges.length > 1){
            descriptionText.innerText = " " + jsonObject.edge_media_to_caption.edges[1].node.text
        }
        else if(jsonObject.edge_media_to_caption.edges.length > 0){
            descriptionText.innerText = " " + jsonObject.edge_media_to_caption.edges[0].node.text
        }
        else
        {
            descriptionText.innerText = ""
        }
    }
    let comments = document.createElement('div')
    comments.className = "comments"
    let form = document.createElement('div')
    form.className = "form"


    profileInfo.appendChild(name)
    profileInfo.appendChild(locationDiv)
    cardHeader.appendChild(profileImage)
    cardHeader.appendChild(profileInfo)
    cardHeader.appendChild(time)
    card.appendChild(cardHeader)

    content.appendChild(contentImg)
    card.appendChild(content)

    p.appendChild(username)
    p.appendChild(descriptionText)
    description.appendChild(p)
    cardFooter.appendChild(likes)
    cardFooter.appendChild(description)
    cardFooter.appendChild(comments)
    cardFooter.appendChild(form)
    card.appendChild(cardFooter)

    $('.container').append(card)
}