// This script loads all images from a .json scraped from instagram

let jDat

let path = "/feed-content/feed-content.json"

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
                    for(let j = 0; j < 3; j++)
                    {
                        if(j + i >= datLen) i = 0
                        appendDivElement(jDat.GraphImages[j + i][1])
                    }
                    i += 3                    
                    // TODO: See how to read touch events out of here so we have the actual direciton and speed of the gesture
                }
            })
    });

function appendDivElement(jsonObject){
    if(jsonObject.__typename == "GraphVideo") return

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
    name.innerText = jsonObject.username
    let locationDiv = document.createElement('div')
    locationDiv.className = "location"
    locationDiv.innerText = "New York, New York"
    let time = document.createElement('div')
    time.className = "time"
    let content = document.createElement('div')
    content.className = "content"
    let contentImg = document.createElement('img')
    contentImg.src = jsonObject.display_url
    let cardFooter = document.createElement('div')
    cardFooter.className = "card-footer"
    let likes = document.createElement('div')
    likes.className = "likes"
    let description = document.createElement('div')
    description.className = "description"
    let p = document.createElement('p') 
    // p.innerText = " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    let username = document.createElement('span')
    username.className = "name"
    username.innerText = jsonObject.username
    let descriptionText = document.createElement('span')
    descriptionText.className = "description-text"
    if(jsonObject.edge_media_to_caption.edges.length > 0){
        descriptionText.innerText = " " + jsonObject.edge_media_to_caption.edges[0].node.text
    }
    else
    {
        descriptionText.innerText = ""
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