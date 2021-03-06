const DOWNLOAD_DIR = 'PASTE_YOUR_DOWNLOAD_DIR_PATH_HERE';
const DEST_DIR = 'PASTE_DESTINATION_DIR_PATH';
const fs = require('fs');
const path = require('path');
let alreadyExistsFiles = [];
const watcher = require('watcher');

let watch = new watcher(DOWNLOAD_DIR);

watch.on('ready', () => {
    fs.readdir(DOWNLOAD_DIR, (err, files) => {
        if (err) throw err;
       files = files.map(file => {
            return DOWNLOAD_DIR+'\\'+file;
        })
        alreadyExistsFiles = files;

    })
});

watch.on('add', (file) => {
    if(!ifAlreadyExists(file)){
        if(file.endsWith('.tmp')){
            return; 
        }

        let destPath = path.join(DEST_DIR, path.basename(file));
            moveTo(file, destPath);
    }

    
});


function ifAlreadyExists(file){
    if(alreadyExistsFiles.includes(file)){
        return true;
    }
    return false;
}

function moveTo(from, to){
    fs.copyFile( from, to, (err) => {
        if (err) throw err;
        fs.unlink(from, (err) => {
            console.log(`${from} moved to ${to}`);
        })
    })
}
