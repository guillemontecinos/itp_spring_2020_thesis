document.getElementById("fromDate").addEventListener("click", setValues)
let path, fromDate, toDate, database

// let path = './piensaprensarespaldo/piensaprensarespaldo.json'
// let path = './radiovillafrancia/radiovillafrancia.json'
// let path = './plazadeladignidad/plazadeladignidad.json'

function setValues(){
    let list = document.getElementById("card")
    if(list != null)
    {
        for(let i = 0; i < list.length; i++) list.removeChild(list.childNodes[i])
    }
    database = document.getElementById("database").value
    path = './' + database + '/' + database +'.json'

    fromDate = new Date()
    fromDate.setYear(document.getElementById("fromYear").value)
    fromDate.setMonth(document.getElementById("fromMonth").value - 1)
    fromDate.setDate(document.getElementById("fromDay").value)
    fromDate.setHours(0,0,0,0)
    
    toDate = new Date()
    toDate.setYear(document.getElementById("toYear").value)
    toDate.setMonth(document.getElementById("toMonth").value - 1)
    toDate.setDate(document.getElementById("toDay").value)
    toDate.setHours(0,0,0,0)

    loadData()
}

function loadData()
{
fetch(path)
    .then(response => response.json())
    .then(json => 
            {
                jDat = json
                let datLen = jDat.GraphImages.length
                
                
                for (let i = datLen - 1; i >= 0; i--) {
                    let picDat = Number(jDat.GraphImages[i].taken_at_timestamp * 1000)
                    if(picDat >= fromDate && picDat <= toDate) appendDivElement(jDat.GraphImages[i], i)
                }
        });  
}

function appendDivElement(jsonObject, id){
    if(jsonObject.__typename == "GraphVideo") return

    let div = document.createElement('div')
    div.id = "card"
    let date = document.createElement('div')
    let caption = document.createElement('div')
    let dt = new Date(jsonObject.taken_at_timestamp * 1000)
    date.innerText = dt.toDateString()
    let content = document.createElement('img')
    content.src = jsonObject.display_url
    let metadata = document.createElement('div')
    metadata.innerText = 'metadata: ' + database + ', ' + id
    if(jsonObject.edge_media_to_caption.edges.length > 0){
        caption.innerText = " " + jsonObject.edge_media_to_caption.edges[0].node.text
    }
    else
    {
        caption.innerText = ""
    }
    div.appendChild(date)
    div.appendChild(content)
    div.appendChild(caption)
    div.appendChild(metadata)

    $('.container').append(div)
}