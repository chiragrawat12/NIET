const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
const { html } = require("cheerio/lib/api/manipulation");

let mainFileLocation = "./Github Scrapper";

if(fs.existsSync(mainFileLocation)){
    fs.rmdirSync(mainFileLocation , { recursive: true });
}
fs.mkdirSync(mainFileLocation);

Link = "https://github.com/topics";

request(Link , function(error , response , htmlBody){
   processHtml(htmlBody); 
});


function processHtml(html){

    let ch = cheerio.load(html);

    let allTopics = ch(".topic-box > a");

    for(let i = 0 ; i < allTopics.length ; i++){
        let name = ch(allTopics[i]).find(".f3").text().trim();
        let link = "https://github.com" + ch(allTopics[i]).attr("href");

        processAllTopics(name , link);
    }

}


function processAllTopics(name , link){
    topicFolder = mainFileLocation + "/" + name;
    
    if(!fs.existsSync(topicFolder)){
        fs.mkdirSync(topicFolder);
    }else{
        return;
    }

    findTopTenProjects(link , topicFolder);
}


function findTopTenProjects(topicLink , topicFolder){
    request(topicLink , function(error , response , htmlBody){
        let projCh = cheerio.load(htmlBody);

        let topTenProj = projCh("div > h1 > .text-bold");

        for(let i = 0 ; i < topTenProj.length ; i ++){
            if(i == 10){
                break;
            }

            let projName = projCh(topTenProj[i]).text().trim();
            let issuesLink = "https://github.com" + projCh(topTenProj[i]).attr("href").trim() + "/issues";

            let projFolder = topicFolder + "/" + projName;

            if(!fs.existsSync(projFolder)){
                fs.mkdirSync(projFolder);
            }

            findTopTenProjectsIssues(issuesLink , projFolder);

        }

     });
}

function findTopTenProjectsIssues(issuesLink , projFolder){

    let issueFilePath = projFolder + "/issues.json";
    
    request(issuesLink , function(error , response , htmlBody){
        let issueCh = cheerio.load(htmlBody);

        let issues = issueCh("div > a[data-hovercard-type = \"issue\"]");

        let issuesList = [];

        for(let i = 0 ; i < issues.length ; i++){
            if(i == 10){
                break;
            }
            let issueName = issueCh(issues[i]).text().trim();
            let issueLink = "https://github.com" + issueCh(issues[i]).attr("href").trim();

            issuesList.push({
                issueName : issueName,
                issueLink : issueLink
            });
        }
        fs.writeFileSync(issueFilePath , JSON.stringify(issuesList));
     });

}