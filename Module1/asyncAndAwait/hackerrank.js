let puppeteer = require("puppeteer");
let solution = require("./solution");

const id = `ronefag160@moxkid.com`;
const password = "123456789";

let tab;
let browser;

async function waitAndClick(selector , tab){
    try{
        await tab.waitForSelector(selector);
        await tab.click(selector); 
    }
    catch(error){
        console.log(error);
    }
}

async function solveQuestion(quesLink){
    try{
        let completeLink = "https://www.hackerrank.com" + quesLink;
        let tab;
        let code;
        tab = await browser.newPage(); 
        await tab.goto(completeLink);
        let quesName = await tab.$(".ui-icon-label.page-label");
        quesName = await tab.evaluate(function(ele){return ele.textContent} , quesName);

        for(let i = 0 ; i < solution.length ; i++){
            if(solution[i].name == quesName){
            code = solution[i].sol;
            break; 
            }
        }

        await waitAndClick(".checkbox-input" , tab);
        await tab.type("#input-1", code);
        await tab.keyboard.down("Control");
        await tab.keyboard.press('a');
        await tab.keyboard.press('x');
        await tab.click(".monaco-scrollable-element.editor-scrollable.vs");
        await tab.keyboard.press('a');
        await tab.keyboard.press('v');
        
        await waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",tab)
        await tab.waitForSelector(".compiler-message__value code",tab);
        await tab.close();
    }
    catch(error){
        console.log(error);
    }
}

async function hackerrank(){
    try{
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
            executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        });
        browser = browserInstance;
        let pages = await browserInstance.pages();
        tab = pages[0];
        await tab.goto("https://www.hackerrank.com/auth/login");
        await tab.type("#input-1" , id);
        await tab.type("#input-2" , password);
        await tab.click('button[data-analytics  = "LoginPassword"]');
        await waitAndClick("#base-card-1-link" , tab);
        await waitAndClick("a[data-attr1='warmup']" , tab);
        await tab.waitForSelector(".js-track-click.challenge-list-item");
        let allChallengesTags = await tab.$$(".js-track-click.challenge-list-item");

        for(let i = 0 ; i < allChallengesTags.length ; i++){
            let oneLink = await tab.evaluate(function(ele){return ele.getAttribute("href")} , allChallengesTags[i]);
            await solveQuestion(oneLink);
        }
        console.log("All quesyions solved!!");

    }
    catch(error){
        console.log(error);
    }
}
hackerrank();