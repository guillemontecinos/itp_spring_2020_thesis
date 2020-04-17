let pathpp = './piensaprensarespaldo/piensaprensarespaldo.json'
let pathrvf = './radiovillafrancia/radiovillafrancia.json'
let pathpdld = './plazadeladignidad/plazadeladignidad.json'
let pathnk = './nicole_kramm/nicole_kramm.json'
let pathaton = './atonchile/atonchile.json'
let pathcsv = './content-selection.txt'
let output = { "GraphImages": []}
let input
let pdld, pp, rvf, nk, aton


fetch(pathcsv)
    .then(response => response.text())
    .then((data) => 
            {
                input = data.split('\n')
                for(let i = 0; i < input.length; i++)
                {
                    input[i] = input[i].split(',')
                    input[i][1] = Number(input[i][1])
                }
                console.log(input)

                fetch(pathpdld)
                    .then(response => response.json())
                    .then(json => 
                            {
                                pdld = json

                                fetch(pathrvf)
                                    .then(response => response.json())
                                    .then(json => 
                                            {
                                                rvf = json

                                                fetch(pathpp)
                                                    .then(response => response.json())
                                                    .then(json => 
                                                            {
                                                                pp = json

                                                                fetch(pathnk)
                                                                    .then(response => response.json())
                                                                    .then(json => 
                                                                            {
                                                                                nk = json

                                                                                fetch(pathaton)
                                                                                    .then(response => response.json())
                                                                                    .then(json => 
                                                                                            {
                                                                                                aton = json
                                                                                                console.log("loaded")
                                                                                                
                                                                                                // fulfill output object
                                                                                                for(let i = 0; i < input.length; i++)
                                                                                                {
                                                                                                    if(input[i][0] == "radiovillafrancia")
                                                                                                    {   
                                                                                                        let aux = [input[i][0], rvf.GraphImages[input[i][1]]]
                                                                                                        output.GraphImages.push(aux)
                                                                                                    }
                                                                                                    else if(input[i][0] == "piensaprensarespaldo")
                                                                                                    {
                                                                                                        let aux = [input[i][0], pp.GraphImages[input[i][1]]]
                                                                                                        output.GraphImages.push(aux)
                                                                                                    }
                                                                                                    else if(input[i][0] == "plazadeladignidad")
                                                                                                    {
                                                                                                        let aux = [input[i][0], pdld.GraphImages[input[i][1]]]
                                                                                                        output.GraphImages.push(aux)
                                                                                                    }
                                                                                                    else if(input[i][0] == "nicole_kramm")
                                                                                                    {
                                                                                                        let aux = [input[i][0], nk.GraphImages[input[i][1]]]
                                                                                                        output.GraphImages.push(aux)
                                                                                                    }
                                                                                                    else if(input[i][0] == "atonchile")
                                                                                                    {
                                                                                                        let aux = [input[i][0], aton.GraphImages[input[i][1]]]
                                                                                                        output.GraphImages.push(aux)
                                                                                                    }
                                                                                                }
                                                                                                console.log(JSON.stringify(output)) 
                                                                                        });  
                                                                        });  
                                                        }); 
                                        });  
                        });
        })




// fetch(path)
//     .then(response => response.json())
//     .then(json => 
//             {
//                 jDat = json
//         });  