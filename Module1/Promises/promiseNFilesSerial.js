let fs = require("fs");

let files = ["f1.txt" , "f2.txt" , "f3.txt" , "f4.txt"]



let i = 0;

function parallelPromise(files , i){

    if(files.length == i){
        return;
    }

    let pendingPromise = fs.promises.readFile(files[i] , "utf-8");

    pendingPromise.then(function(data){
        console.log(data);

        parallelPromise(files , i + 1);
    });

    pendingPromise.catch(function(error){
        console.log(error);
    });
}

parallelPromise(files , i);