// https://espaciosconvergentes.blogspot.com/2013/03/guia-rapida-para-explicar-tu-obra-en.html

let concept = [
    'reality',
    'chile',
    'social media',
    'instagram',
    'facebook',
    'simulation',
    'capitalism',
    'scroll down',
    'time',
    'physical space',
    'virtual space',
    'mental space',
    'hypercube',
    'map',
    'internet',
    'web browser',
    'google maps'
]

let format = [
    'sound installation',
    'light installation',
    'audiovisual installation',
    'experience',
    'data visualization',
    'sculpture',
    'painting',
    'drawing',
    'fanzine',
    'mobile app',
    'song'
]

let verb = [
    'researches',
    'questions',
    'disrupts',
    'subverts',
    'connects',
    'critics',
    'acknowledges'
]

let adjs = [
    'metaphoric',
    'aesthetic',
    'critical',
    'conceptual',
    'subversive',
    'figurative',
    'post-human',
    'analog',
    'digital',
    'multi-sensorial',
    'recursive',
    'immersive',
    'hyperreal',
    'simulated',
    'expressive',
    'intimate',
    'meditative'
]

for (let i = 0; i < 15; i++) {
    let formIndex = Math.floor(Math.random()*format.length)
    let conceptIndex = Math.floor(Math.random()*concept.length)
    let adjsIndex = Math.floor(Math.random()*adjs.length)
    // console.log(format[formIndex] + ' ' + verb[Math.floor(Math.random()*verb.length)] + ' ' + concept[conceptIndex])    
    console.log('My thesis ' + verb[Math.floor(Math.random()*verb.length)] + ' about ' + concept[conceptIndex] + ' through a ' + adjs[adjsIndex] + ' ' + format[formIndex])
    format.splice(formIndex, 1)
    concept.splice(conceptIndex, 1)
    adjs.splice(adjsIndex, 1)
}
