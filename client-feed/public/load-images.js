// This script loads all images from a .json scraped from instagram

let jDat
let screenshotCount = 0

let path = "/feed-content/feed-content.json"

socket.on('screenshot added', function(data){
    console.log(data)
    screenshotCount++
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
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
                    // TODO: Improve Instagram look
                    // TODO: fetch data on every scroll, so I can send data that has been created on realtime
                    if(screenshotCount > 0){
                        appendDivElement(null, true)
                        screenshotCount--
                        for(let j = 0; j < 2; j++)
                        {
                            if(j + i >= datLen) i = 0
                            appendDivElement(jDat.GraphImages[j + i][1], false)
                        }
                        i += 2                    
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
        contentImg.src = '/reality'
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