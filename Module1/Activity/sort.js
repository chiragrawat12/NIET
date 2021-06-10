let fs = require("fs");
const { cwd } = require("process");
let extensions = require("./extensions");

let testFolderPath = "./testFolder";

// let contents = fs.readdirSync(testFolderPath);



// for (let i = 0; i < contents.length; i++) {
//     let file = contents[i];
//     sortFile(file);
// }

function sortFile(filename , filePath ,folderPAth){
    if(!fs.existsSync(folderPAth)){
        fs.mkdirSync(folderPAth);
    }

    
    let sourceFilePath = filePath + "/" + filename;
    let destFilePath = folderPAth + "/" + filename;
    fs.copyFileSync( sourceFilePath  , destFilePath );
    delete file
    fs.unlinkSync(sourceFilePath);


}


function getFolderName(ext){
    for(key in extensions){
        if(extensions[key].includes(ext)){
            return key;
        }
    }
}

function sortFileRecurrsive(filePath){
    let contents = fs.readdirSync(filePath);

    for (let i = 0; i < contents.length; i++) {
        let file = contents[i];

        folderOrFile = file.split(".");

        if(folderOrFile.length == 1){
            newFilePath = filePath + "/" + folderOrFile[0];
            sortFileRecurrsive(newFilePath); 
        }
        else if(folderOrFile.length == 2){
            let folderName = getFolderName(folderOrFile[1]);
            let cwdName = filePath.split("/").slice(-1)[0];

            let folderPath;

            if(folderName != cwdName){
                folderPath = filePath + "/" + folderName;
                sortFile(file , filePath , folderPath);
            }
            
        }
    }

}

sortFileRecurrsive(testFolderPath);


// Task
// 1. Think of Recursive code
// 2. If you are inside a sorted folder then come back dont sort