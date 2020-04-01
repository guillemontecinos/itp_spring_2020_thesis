// This script loads all images from a .json scraped from instagram

let jDat

// let toDate = new Date()
// toDate.setYear(2020)
// toDate.setMonth(0)
// toDate.setDate(10)
// toDate.setHours(23,0,0,0)

// let fromDate = new Date()
// fromDate.setYear(2019)
// fromDate.setMonth(9)
// fromDate.setDate(4)
// fromDate.setHours(0,0,0,0)

let path = "./thesis-scrapes/feed-content/feed-content.json"
// let path = "./thesis-scrapes/radiovillafrancia/radiovillafrancia.json"


fetch(path)
  .then(response => response.json())
  .then(json => 
        {
            jDat = json
            let datLen = jDat.GraphImages.length
            
            let i = 0
            for (; i < 2; i++) {
                appendDivElement(jDat.GraphImages[i])
            }

            $(window).scroll(function(){
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
                    // TODO: Improve Instagram look
                    // TODO: fetch data on every scroll, so I can send data that has been created on realtime
                    for(let j = 0; j < 2; j++)
                    {
                        appendDivElement(jDat.GraphImages[j + i])
                    }
                    i += 5
                    // TODO: See how to read touch events out of here so we have the actual direciton and speed of the gesture
                    // Sends each swipe's timestamp to the server
                    // let currentTime = new Date().getTime()
                    // socket.emit('speed event', {my: 'swiped', time: currentTime})
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
    name.innerText = "username"
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
    username.innerText = "username"
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


// function appendDivElement(jsonObject)
    // {
    //     if(jsonObject.__typename == "GraphVideo") return
    //     let div = document.createElement('div')
    //     let image = document.createElement('img')
    //     let date = document.createElement('p')
    //     let text = document.createElement('p')
    //     // image.src = jsonObject.thumbnail_resources[jsonObject.thumbnail_resources.length - 1].src
    //     image.src = jsonObject.display_url
    //     image.style.width = '100%'
    //     let timeStamp = new Date(Number(jsonObject.taken_at_timestamp) * 1000)
    //     date.innerText = timeStamp.toDateString()
    //     if(jsonObject.edge_media_to_caption.edges.length > 0){
    //         text.innerText = jsonObject.edge_media_to_caption.edges[0].node.text
    //     }
    //     else
    //     {
    //         text.innerText = ""
    //     }
        
    //     div.appendChild(date)
    //     div.appendChild(image)
    //     div.appendChild(text)
    //     $('.infinite').append(div)
    // }