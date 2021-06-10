let fs = require("fs");
let files = ["./f1.txt" , "./f2.txt" , "./f3.txt"];


console.log("Start");

// fs.readFile("./f1.txt" , function(error, data){
//     console.log(error);
//     console.log(data + "");
// });

// fs.readFile("./f2.txt" , function(error, data){
//     console.log(error);
//     console.log(data + "");
// });

// fs.readFile("./f3.txt" , function(error, data){
//     console.log(error);
//     console.log(data + "");
// });

for(let i = 0 ; i < files.length ; i++){
    fs.readFile(files[i] , function(error, data){
            console.log(error);
            console.log(data + "");
        });
}


console.log("End");