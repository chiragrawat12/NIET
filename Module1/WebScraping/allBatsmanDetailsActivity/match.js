let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");

let mainFileLocation = "./allBatsmanDetails";

function getMatchDetails(Link){
    request(Link , function (error , response , body) {
        evalHtml(body);
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

            if(batsmanName.endsWith("(c)†")){

                batsmanName = batsmanName.split("(c)†")[0].trim();

            }
            else if(batsmanName.endsWith("(c)")){

                batsmanName = batsmanName.split("(c)")[0].trim();
            
            }
            else if(batsmanName.endsWith("†")){

                batsmanName = batsmanName.split("†")[0].trim();

            }

            let runs = ch(allTds[2]).text().trim();

            let balls = ch(allTds[3]).text().trim();

            let fours = ch(allTds[5]).text().trim();

            let sixes = ch(allTds[6]).text().trim();

            let strikeRate = ch(allTds[7]).text().trim();

            processDetails(teamName , matchAgainst , batsmanName , runs , balls , fours , sixes , strikeRate);
        }

    }
}

function processDetails(teamName , matchAgainst ,batsmanName , runs , balls , fours , sixes , strikeRate){
    let teamsFolder = mainFileLocation + "/" + teamName;

    let oneBatsmanDetail = {
        "matchAgainst" : matchAgainst,
        "runs" : runs,
        "balls" : balls,
        "fours" : fours,
        "sixes" : sixes,
        "strikeRate" : strikeRate
    }

    if(!fs.existsSync(teamsFolder)){
        fs.mkdirSync(teamsFolder);
    }

    let batsmanFile = teamsFolder + "/" + batsmanName +".json";

    if(!fs.existsSync(batsmanFile)){
        let oneBatsmanJSONData = JSON.stringify([oneBatsmanDetail]);
        fs.writeFileSync(batsmanFile , oneBatsmanJSONData);
    }else{
        let readBatsmanData = fs.readFileSync(batsmanFile , "utf8");
        readBatsmanData = JSON.parse(readBatsmanData);

        readBatsmanData.push(oneBatsmanDetail);
        readBatsmanData = JSON.stringify(readBatsmanData);

        fs.writeFileSync(batsmanFile , readBatsmanData);
    }
}

module.exports = getMatchDetails;