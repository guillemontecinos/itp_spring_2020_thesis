
$(window).scroll(function(){
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
        appendDivElement()        
    }
})

function appendDivElement(){
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
    contentImg.src = "./assets/71281304_614547185751139_617902837111917208_n.jpg"
    let cardFooter = document.createElement('div')
    cardFooter.className = "card-footer"
    let likes = document.createElement('div')
    likes.className = "likes"
    let description = document.createElement('div')
    description.className = "description"
    let p = document.createElement('p') 
    p.innerText = " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    let username = document.createElement('span')
    username.className = "username"
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
    description.appendChild(p)
    cardFooter.appendChild(likes)
    cardFooter.appendChild(description)
    cardFooter.appendChild(comments)
    cardFooter.appendChild(form)
    card.appendChild(cardFooter)

    $('.container').append(card)
}