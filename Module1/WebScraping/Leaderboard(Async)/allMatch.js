let cheerio = require("cheerio");
let request = require("request");
const getMatchDetails = require("./match");
let allMatchesLink = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results';


request(allMatchesLink , function(error , response , body){
    evalHtml(body);
});

function evalHtml(html){
    let ch = cheerio.load(html);

    let allTags = ch('a[data-hover = "Scorecard"]');

    for(let i=0 ; i < allTags.length ; i++){
        let matchLink = "https://www.espncricinfo.com"+ch(allTags[i]).attr("href");
        getMatchDetails(matchLink);
    }
}