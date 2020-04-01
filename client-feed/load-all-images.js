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

let path = "./thesis-scrapes/piensaprensarespaldo/piensaprensarespaldo.json"
// let path = "./thesis-scrapes/radiovillafrancia/radiovillafrancia.json"


fetch(path)
  .then(response => response.json())
  .then(json => 
        {
            jDat = json
            let datLen = jDat.GraphImages.length
            
            let i = 0
            for (; i < 6; i++) {
                appendDivElement(jDat.GraphImages[i])
            }

            $(window).scroll(function(){
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
                    // TODO: Test requesting get from server instead from IG
                    // TODO: fetch data on every scroll, so I can send data that has been created on realtime
                    for(let j = 0; j < 6; j++)
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

    function appendDivElement(jsonObject)
    {
        if(jsonObject.__typename == "GraphVideo") return
        let div = document.createElement('div')
        let image = document.createElement('img')
        let date = document.createElement('p')
        let text = document.createElement('p')
        image.src = jsonObject.thumbnail_resources[jsonObject.thumbnail_resources.length - 1].src
        image.style.width = '100%'
        let timeStamp = new Date(Number(jsonObject.taken_at_timestamp) * 1000)
        date.innerText = timeStamp.toDateString()
        if(jsonObject.edge_media_to_caption.edges.length > 0){
            text.innerText = jsonObject.edge_media_to_caption.edges[0].node.text
        }
        else
        {
            text.innerText = ""
        }
        
        div.appendChild(date)
        div.appendChild(image)
        div.appendChild(text)
        $('.infinite').append(div)
    }
