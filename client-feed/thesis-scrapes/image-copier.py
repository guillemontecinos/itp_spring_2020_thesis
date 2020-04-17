import json
from shutil import copyfile

data = json.load(open('content-selection.json', 'r'))
dest = './feed-content/'


for pic in data['GraphImages']:
    database = pic[0]
    picName = pic[1]['display_url'].split('/')[6].split('?')[0]
    if picName[0] == 's' or picName[0] == 'p':
        picName = pic[1]['display_url'].split('/')[7].split('?')[0]
    path = './' + database + '/' + picName
    try:
        copyfile(path,dest + picName)
    except IOError:
        print('cannot copy file: ' + picName + ', from database: ' + database)
    # else:
        # print('file copied succesfully: ' + picName)