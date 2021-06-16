let fs = require("fs");


let f1KaPromise = fs.promises.readFile("./f1.txt" , "utf-8");

f1KaPromise.then(function(data){
    console.log(data);
}).then(function(){
    let f2KaPromise =  fs.promises.readFile("./f2.txt" , "utf-8");
    return f2KaPromise;
}).then(function(data){
    console.log(data);
});