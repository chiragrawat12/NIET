let cheerio = require("cheerio");
let request = require("request");

let leaderboard = [];
let count = 0;

function getMatchDetails(Link){
    count++;
    request(Link , function (error , response , body) {
        count--;
        evalHtml(body);
        if(count == 0){
            console.table(leaderboard);
        }
    });
}

function evalHtml(html){
    let ch = cheerio.load(html);
    let bothInnings = ch(".Collapsible");

    let match = [
        ch(bothInnings[0]).find("h5").text().split(" INNINGS ")[0].trim() , 
        ch(bothInnings[1]).find("h5").text().split(" INNINGS ")[0].trim()
    ]
    
    for(let i = 0 ; i < bothInnings.length ; i++){
        let oneInning = bothInnings[i];

        let teamName = ch(oneInning).find("h5").text().split(" INNINGS ")[0].trim();
        let matchAgainst = match[match.length - i - 1];

        let allTrs = ch(oneInning).find(".table.batsman tbody tr");

        for(let j = 0 ; j < allTrs.length - 1 ; j+=2){
            let allTds = ch(allTrs[j]).find("td");

            let batsmanName = ch(allTds[0]).text().trim();

            let runs = Number(ch(allTds[2]).text().trim());

            let balls = Number(ch(allTds[3]).text().trim());

            let fours = Number(ch(allTds[5]).text().trim());

            let sixes = Number(ch(allTds[6]).text().trim());

            processLeaderboard(teamName , matchAgainst , batsmanName , runs , balls , fours , sixes);
        }

    }
}

function processLeaderboard(teamName , matchAgainst ,batsmanName , runs , balls , fours , sixes){
    for(let i = 0 ; i < leaderboard.length ; i++){
        let lbObject = leaderboard[i];
        if(lbObject.Team == teamName && lbObject.Batsman == batsmanName){
            lbObject.Runs += runs; 
            lbObject.Balls += balls;
            lbObject.Fours += fours;
            lbObject.Sixes += sixes;
            return;
        }
    }

    let inning = {
        Team : teamName , 
        Batsman : batsmanName ,
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes
    }
    leaderboard.push(inning);
}

module.exports = getMatchDetails;