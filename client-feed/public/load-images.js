// This script loads all images from a .json scraped from instagram

let jDat

let prevTime = 0
let prevTop = 0

let screenshotCue = 22
let screenshotDisplay = 0

let path = "/feed-content/feed-content.json"

const today = new Date()
const week = 7 * 24 * 60 * 60 * 1000 //ms in a week 

// Source: https://socket.io/docs/#Using-with-Express
// TODO: update this address with the current IP
let socket = io.connect('http://192.168.1.5')
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
    let user
    if(isScreenshot){
        user = 'therevoltofreplicas'
    }
    else{
        if(jsonObject.__typename == "GraphVideo") return
        // TODO: urls are not working anymore, so images have to be loaded from public folder
        if(jsonObject.username != null && jsonObject.username != 'radiovillafrancia') user = jsonObject.username
        else user = 'plazadeladignidad'
    }

    // creates card =========================
    let card = document.createElement('div')
    card.className = "card"
    
    // creates card headers and components =========================
    let cardHeader = document.createElement('div')
    cardHeader.className = "card-header"
    let profileImage = document.createElement('div')
    profileImage.className = "profile-image"
    let avatar = document.createElement('img')
    avatar.className = "avatar"

    if(isScreenshot) avatar.src = '/thumbnails/revoltofreplicas-1.jpg'
    else {
        if(user != null) avatar.src = '/thumbnails/' + user + '.jpg'
    }
    
    let profileInfo = document.createElement('div')
    profileInfo.className = "profile-info"
    let name = document.createElement('div')
    name.className = "name"
    name.innerText = user
    let locationDiv = document.createElement('div')
    locationDiv.className = "location"
    locationDiv.innerText = "Santiago, Chile"
    let menu = document.createElement('div')
    menu.className = "menu"
    let menuIcon = document.createElement('img')
    menuIcon.className = "menu-icon"
    menuIcon.src = '/thumbnails/menu.png'
    
    // creates content and image content =========================
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
    
    // creates cardFooter and components =========================
    let cardFooter = document.createElement('div')
    cardFooter.className = "card-footer"
    let interaction = document.createElement('div')
    interaction.className = "interaction"
    let heart = document.createElement('div')
    heart.className = "heart"
    let heartIcon = document.createElement('img')
    heartIcon.className =  "heart-icon"
    heartIcon.src = "/thumbnails/heart.png"
    let dialog = document.createElement('div')
    dialog.className = "dialog"
    let dialogIcon = document.createElement('img')
    dialogIcon.className =  "dialog-icon"
    dialogIcon.src = "/thumbnails/chat.png"
    let share = document.createElement('div')
    share.className = "share"
    let shareIcon = document.createElement('img')
    shareIcon.className = "share-icon"
    shareIcon.src = "/thumbnails/share.png"
    let save = document.createElement('div')
    save.className = "save"
    let saveIcon = document.createElement('img')
    saveIcon.className = "save-icon"
    saveIcon.src = "/thumbnails/save.png"
    let likes = document.createElement('div')
    likes.className = "likes"
    let likesDisp = document.createElement('p')
    likesDisp.className = "likes-display"
    if(isScreenshot){
        likesDisp.innerText = Math.trunc(Math.random() * 2000) + ' likes'
    }
    else {
        likesDisp.innerText = jsonObject.edge_media_preview_like.count + ' likes'
    }
    let description = document.createElement('div')
    description.className = "description"
    let p = document.createElement('p') 
    let username = document.createElement('span')
    username.className = "name"
    username.innerText = user
    let descriptionText = document.createElement('span')
    descriptionText.className = "description-text"
    if (isScreenshot) {
        descriptionText.innerText = ' ' + captions[Math.trunc(Math.random() * captions.length)]
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
    // let comments = document.createElement('div')
    // comments.className = "comments"
    // let form = document.createElement('div')
    // form.className = "form"
    let elapsedTime = document.createElement('div')
    elapsedTime.className = "elapsed-time"
    let timeDisplay = document.createElement('div')
    timeDisplay.className = "time-display"

    if(isScreenshot) {
        timeDisplay.innerText = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear()
    }
    else {
        let dt = new Date(Number(jsonObject.taken_at_timestamp) * 1000)
        timeDisplay.innerText = months[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear()
    }

    // appends cardHeader components =========================
    profileImage.appendChild(avatar)
    profileInfo.appendChild(name)
    profileInfo.appendChild(locationDiv)
    menu.appendChild(menuIcon)
    cardHeader.appendChild(profileImage)
    cardHeader.appendChild(profileInfo)
    cardHeader.appendChild(menu)
    card.appendChild(cardHeader)

    // appends content to card
    content.appendChild(contentImg)
    card.appendChild(content)

    // appends cardFooter components =========================
    heart.appendChild(heartIcon)
    dialog.appendChild(dialogIcon)
    share.appendChild(shareIcon)
    save.appendChild(saveIcon)
    interaction.appendChild(heart)
    interaction.appendChild(dialog)
    interaction.appendChild(share)
    interaction.appendChild(save)

    likes.appendChild(likesDisp)

    p.appendChild(username)
    p.appendChild(descriptionText)
    description.appendChild(p)

    cardFooter.appendChild(interaction)
    cardFooter.appendChild(likes)
    cardFooter.appendChild(description)
    // cardFooter.appendChild(comments)
    // cardFooter.appendChild(form)
    elapsedTime.appendChild(timeDisplay)
    cardFooter.appendChild(elapsedTime)
    card.appendChild(cardFooter)

    $('.container').append(card)
}

const captions = [
    'The territory no longer precedes the map, nor does it survive it.',
    'It is no longer really the real, because no imaginary envelops it anymore.',
    'Simulation threatens the difference between the "true" and the false, the \"real\" and the \"imaginary.\"',
    'The transition from signs that dissimulate something to signs that dissimulate that there is nothing marks a decisive turning point.',
    'Illusion is no longer possible, because the real is no longer posible.',
    'The hyperrealism of simulation is translated by the hallucinatory resemblance of the real to itself.',
    'Ideology only corresponds to a corruption of reality through signs; simulation corresponds to a short circuit of reality and to its duplication through signs.',
    'There is no real: the third dimension is only the imaginary of a two-dimensional world, the fourth that of a three-dimensional universe.',
    'No cultural object can retain its power when there are no longer new eyes to see it.',
    'In the conversion of practices and rituals into merely aesthetic objects, the beliefs of previous cultures are objectively ironized, transformed into artifacts.',
    'Capitalism is what is left when beliefs have collapsed at the level of ritual and symbolic elaboration, and all that is left is the consumer-spectator, trudging through the ruins and the relics.',
    'The \'realism\' is analogous to the deflationary perspective of a depressive who believes that any positive states, any hope, is a dangerous illusion.',
    'For Lacan, the Real is what any \'reality\' must supress; indeed, reality constitutes itself through just this repression.',
    'Abstract space is destined not to last forever, and already contains the birth of a new space within itself.',
    'The most effectively appropriated spaces are those occupied by symbols, appropriation offering the chance to invert social relations and meanings and so create a kind of heterotopic space.',
    'Space is a social and political product.',
    'Space is produced in two ways: as a social formation (mode of production), and as a mental construction (conception).',
    'Our mode of reaction to space is not geometric, only our mode of abstraction is. There is an opposition established between our conception of space — abstract, mental and geometric — and our perception of space — concrete, material and physical.'
]

const months = [
    'January',
    'February',
    'March',
    'Abril',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]