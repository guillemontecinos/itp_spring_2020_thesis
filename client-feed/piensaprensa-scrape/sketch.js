let jDat

let toDate = new Date()
toDate.setYear(2020)
toDate.setMonth(0)
toDate.setDate(10)
toDate.setHours(23,0,0,0)

let fromDate = new Date()
fromDate.setYear(2019)
fromDate.setMonth(9)
fromDate.setDate(4)
fromDate.setHours(0,0,0,0)

// let path = "./thesis-scrapes/piensaprensarespaldo/piensaprensarespaldo.json"
let path = "./thesis-scrapes/radiovillafrancia/radiovillafrancia.json"


fetch(path)
  .then(response => response.json())
  .then(json => 
        {
            jDat = json
            let datLen = jDat.GraphImages.length

            for (let i = 0; i < datLen; i++) {
                if(Number(jDat.GraphImages[i].taken_at_timestamp) * 1000 > Number(fromDate) && Number(jDat.GraphImages[i].taken_at_timestamp) * 1000 < Number(toDate)) {
                    let div = document.createElement('div')
                    let image = document.createElement('img')
                    let date = document.createElement('p')
                    let text = document.createElement('p')
                    image.src = jDat.GraphImages[i].display_url
                    let timeStamp = new Date(Number(jDat.GraphImages[i].taken_at_timestamp) * 1000)
                    date.innerText = timeStamp.toDateString()
                    if(jDat.GraphImages[i].edge_media_to_caption.edges.length > 0){
                        text.innerText = jDat.GraphImages[i].edge_media_to_caption.edges[0].node.text
                    }
                    else
                    {
                        text.innerText = ""
                    }
                    
                    div.appendChild(date)
                    div.appendChild(image)
                    div.appendChild(text)
                    document.body.append(div)
                }
            }
    });

