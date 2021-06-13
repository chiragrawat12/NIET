let request = require("request");
let cheerio = require("cheerio");

let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-delhi-capitals-27th-match-1216529/full-scorecard"; 

request(link , cb);

function cb(error , response , body){

    evalHtml(body);
}


function evalHtml(html){
    let ch = cheerio.load(html);
    let winningTeam = ch(".match-header .status-text span").text();
    console.log(winningTeam);

    let bowlingTable = ch(".table.bowler tbody tr");

    let hWtName;
    let hWtScore;
    let hwtEconomy;

    for(let i = 0 ; i < bowlingTable.length ; i++){
        let allTdsOfTr = ch(bowlingTable[i]).find("td");

        let name = ch(allTdsOfTr[0]).text();

        let wt = ch(allTdsOfTr[4]).text();

        let economy = ch(allTdsOfTr[5]).text();

        if(i == 0){
            hWtName = name;
            hWtScore = wt;
            hwtEconomy = economy;
        }else{
            if(wt > hWtScore || (wt == hWtScore && economy < hwtEconomy)){
                hWtName = name;
                hWtScore = wt;
                hwtEconomy = economy;
            }
        }

        // console.log(name + " " + wt + " " + economy);
    }
    
    console.log(`Name : ${hWtName}\nWickets : ${hWtScore}\nEconomy : ${hwtEconomy}`);
}