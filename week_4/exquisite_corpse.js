// https://espaciosconvergentes.blogspot.com/2013/03/guia-rapida-para-explicar-tu-obra-en.html

let concept = [
    'reality',
    'national identity',
    'social media',
    'instagram',
    'facebook',
    'capitalism',
    'scrolling down',
    'time',
    'physical space',
    'virtual space',
    'mental space',
    'hypercube',
    'maps',
    'internet',
    'web browser',
    'google maps',
    'social revolt',
    'violence',
    'social injustice',
    'delusion',
    'hallucionation',
    'dissociation'
]

let format = [
    'sound installation',
    'light installation',
    'audiovisual installation',
    'experience',
    'data visualization',
    'sculpture',
    'painting',
    'fanzine',
    'mobile app',
    'music composition',
    'MR experience',
    'videogame',
    'video art',
    'chrome extension',
    'musical instrument',
    'collage',
    'archive',
    'collection',
    'library',
    'hologram'
]

let verb = [
    'researches',
    'questions',
    'disrupts',
    'subverts',
    'connects',
    'critics',
    'acknowledges',
    'tensions',
    'analizes',
    'deconstructs',
    'reconsiders',
    'praises',
    'plays',
    'simulates',
    'projects',
    'theorizes',
    'asimilates',
    'exposes',
    'condems',
    'associates',
    'dissociates',
    'portrays'
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
    'meditative',
    'simulated'
]

let materials = [
    'paper',
    'maps',
    'sand',
    'clay',
    'memes',
    'fabric',
    'AR filter',
    'whatsapp stickers',
    'lcd screen',
    'ipad',
    'mobile phone',
    'headphones',
    'speakers',
    'quadraphonic system',
    'projector',
    'paint',
    'arduino',
    'raspberry pi',
    'motors',
    'microphone',
    'mouse',
    'arcade joystick',
    'phono catridge',
    'printer',
    'axidraw',
    '3d print',
    'thread',
    'water',
    'cotton',
    'plants',
    'synthesizers',
    'legos'
]

let output = ''

for (let i = 0; i < 30; i++) {
    let formIndex = Math.floor(Math.random()*format.length)
    let conceptIndex = Math.floor(Math.random()*concept.length)
    let adjsIndex = Math.floor(Math.random()*adjs.length)
    let strOutput = '* My thesis ' + verb[Math.floor(Math.random()*verb.length)] + ' ' + concept[conceptIndex] + ' through a/an ' + adjs[adjsIndex] + ' ' + format[formIndex] + '. Components: ' + materials[Math.floor(Math.random()*materials.length)] + ' & ' + materials[Math.floor(Math.random()*materials.length)] + '\n'
    // console.log(strOutput)    
    output += strOutput
    // format.splice(formIndex, 1)
    // concept.splice(conceptIndex, 1)
    // adjs.splice(adjsIndex, 1)
}

console.log(output)