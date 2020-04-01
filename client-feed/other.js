function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo()
{
    while(true){
        console.log("$(window).scrollTop(): " + $(window).scrollTop())
        console.log("$(document).height(): " + $(document).height())
        console.log("$(window).height(): " + $(window).height())
        // console.log($(document).height() - $(window).height())
        
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
            let div = document.createElement('div')
            let p = document.createElement('p')
            p.innerText = "..."
            div.appendChild(p)
            // document.body.append
            // $('.infinite').append('<div></div>')
            $('.infinite').append(div)
        }
        
        await sleep(50)
    }
}

// await sleep(50)



demo()