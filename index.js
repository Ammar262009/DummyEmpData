// You have to write a Node.js program to clear clutter inside of a directory and organize the contents of that directory into different folders

// for example, these files become:

// 1. name.jpg
// 2. name.png
// 3. this.pdf 
// 4. harry.zip
// 5. Rohan.zip
// 6. cat.jpg 
// 7. harry.pdf

// this: 
// jpg/name.jpg, jpg/cat.jpg 
// png/name.png 
// pdf/this.pdf pdf/harry.pdf
// zip/harry.zip zip/Rohan.zip

import fs from 'fs'
import path from 'path'

const basepath = "C:\\Users\\HP\\OneDrive\\Documents\\Ammar pendrive\\Node js\\project-2"

let files = await fs.readdirSync(basepath)

let extarr = [
    'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico',     // Media
    'mp4', 'mov', 'avi', 'mp3', 'wav',             // Audio/Video
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'pptx',   // Documents
    'zip', 'rar', 'tar', 'gz', '7z', 'jar', 'war', // Archives
    'apk', 'aar', 'iso', 'dmg'                     // Build Artifacts
];

let excludeext = ['json', 'js', 'node_modules', "gitignore"]

for (const item of files) {
    let ext = item.split('.')[item.split('.').length - 1]

    if (!excludeext.includes(ext) && !extarr.includes(item)) {
        if (fs.existsSync(path.join(basepath, ext))) {
            fs.renameSync(path.join(basepath, item), path.join(basepath, ext, item))
        }
        else {
            fs.mkdirSync(ext)
        }
    }
    else {
        console.log("js or node or json file found");
    }

}
