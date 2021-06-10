let fs = require("fs");
let input = process.argv.slice(2);

let files = [];
let flags = [];

for (let i = 0; i < input.length; i++) {
  if (input[i].startsWith("-")) {
    flags.push(input[i]);
  } else {
    files.push(input[i]);
  }
}

// console.log(files);
// console.log(flags);

let data = "";
for(let i=0 ; i<files.length ; i++){
    let fileKaData = fs.readFileSync(files[i]);
    data += i == files.length-1 ? fileKaData :  fileKaData+"\r\n";
}

// console.log(data);


function applySFlag(){
    let dataComp = data.split("\r\n");
    let empty = false;
    if(dataComp[0] == ""){
        empty = true;
    }

    let dataArr = [];
    for(let i = 0 ; i < dataComp.length ; i++){
        if(dataComp[i] != ''){
            dataArr.push(dataComp[i]);
            empty = false;

        }else if(dataComp[i] == '' && !empty){
            dataArr.push(dataComp[i]);
            empty = true;
        }
    }      
    let finalData = dataArr.join("\r\n");
    return finalData;

}

// applySFlag();



function applyNFlag(){
    let dataComp = data.split("\r\n");
    for(let i = 0 ; i < dataComp.length ; i++){
        dataComp[i] = `${i + 1}.${dataComp[i]}`;
    }
    let finalData = dataComp.join("\r\n");
    return finalData;
}

applyNFlag();

function applyBFlag(){
    let dataComp = data.split("\r\n");

    let count = 1;
    for(let i = 0 ; i < dataComp.length ; i++){
        if(dataComp[i] != ""){
            dataComp[i] = (count++) + '.' + dataComp[i]
        }
    }
    let finalData = dataComp.join("\r\n");
    return finalData;
}

// applyBFlag();