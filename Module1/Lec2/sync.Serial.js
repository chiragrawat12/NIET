let fs = require("fs");
let files = ["./f1.txt" , "./f2.txt" , "./f3.txt"];

// fs.readFile("./f1.txt" , function(error, data){
//     console.log(error);
//     console.log(data + "");

//     fs.readFile("./f2.txt" , function(error, data){
//         console.log(error);
//         console.log(data + "");

//         fs.readFile("./f3.txt" , function(error, data){
//             console.log(error);
//             console.log(data + "");
//         });
//     });
// });


function recusiveSerial(files,i){
    if(i == files.length){
        return;
    }

    fs.readFile(files[i] , function(error, data){
                    console.log(error);
                    console.log(data + "");

                    recusiveSerial(files,i+1);
    });

}


recusiveSerial(files,0);
