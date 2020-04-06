let path = './content-selection.json'
let contentSelection

fetch(path)
.then(response => response.json())
.then(json => 
        {
            contentSelection = json
    }); 