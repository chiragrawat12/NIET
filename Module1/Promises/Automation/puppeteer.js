let puppeteer = require("puppeteer");
let solution = require("./solution");

const id = `ronefag160@moxkid.com`;
const password = "123456789";

let tab;
let browser;

let browserOpenPriomise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

browserOpenPriomise
  .then(function (browserInstance) {
    browser = browserInstance;
    let pagesPromise = browserInstance.pages();
    return pagesPromise;
  })
  .then(function (pages) {
    let page = pages[0];
    tab = page;

    let tabPromise = tab.goto("https://www.hackerrank.com/auth/login");

    return tabPromise;
  })
  .then(function () {
    let idTypePromise = tab.type("#input-1", id);
    return idTypePromise;
  })
  .then(function () {
    let passwordTypePromise = tab.type("#input-2", password);
    return passwordTypePromise;
  })
  .then(function () {
    let loginButtonPromise = tab.click(
      'button[data-analytics  = "LoginPassword"]'
    );
    return loginButtonPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("#base-card-1-link" , tab);
    return waitAndClick;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("a[data-attr1='warmup']" , tab);
    return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item"
    );
    return waitPromise;
  })
  .then(function () {
    let allChallengesTags = tab.$$(".js-track-click.challenge-list-item");
    return allChallengesTags;
  })
  .then(function (allChallengesTags) {
    let allQuesLinkPromise = [];
    for (let i = 0; i < allChallengesTags.length; i++) {
      let quesLinkPromise = tab.evaluate(function (ele) {
        return ele.getAttribute("href");
      }, allChallengesTags[i]);
      allQuesLinkPromise.push(quesLinkPromise);
    }

    let combinedPromise = Promise.all(allQuesLinkPromise);
    return combinedPromise;
  })
  .then(function (combinedLinks) {
    let oneQuesLinkPromise = solveQuestion(combinedLinks[0]);
    
    for(let i = 1 ; i < combinedLinks.length ; i++){

      oneQuesLinkPromise = oneQuesLinkPromise.then(function(){
        let nextQuesSolvePromise = solveQuestion(combinedLinks[i]);
        return nextQuesSolvePromise;

      });

    }

    return oneQuesLinkPromise;
  })
  .then(function () {
    console.log("All Questions Solved !!");
  })
  .catch(function (err) {
    console.log("Inside catch");
    console.log(err);
  });

function waitAndClick(selector , tab) {
  return new Promise(function (scb, fcb) {
    let waitPromise = tab.waitForSelector(selector);
    waitPromise
      .then(function () {
        let btnClickPromise = tab.click(selector);
        return btnClickPromise;
      })
      .then(function () {
        scb();
      })
      .catch(function () {
        fcb();
      });
  });
}

function solveQuestion(questionLink) {
  return new Promise(function(scb , fcb){
    let completeLink = "https://www.hackerrank.com" + questionLink;
    let tab;
    let code;
    let newTabPromise = browser.newPage();
    newTabPromise
      .then(function (newTab) {
        tab = newTab;
        let gotoQuesPromise = tab.goto(completeLink);
        return gotoQuesPromise;
      })
      .then(function () {
        let quesNamePromise = tab.$(".ui-icon-label.page-label");
        return quesNamePromise;
      })
      .then(function (quesNameH1Tag) {
        let quesNamePromise = tab.evaluate(function (ele) {
          return ele.textContent;
        }, quesNameH1Tag);
        return quesNamePromise;
      })
      .then(function(quesName){
        for(let i = 0 ; i < solution.length ; i++){
          if(solution[i].name == quesName){
            code = solution[i].sol;
            break;
          }
        }
        let clickPromise = waitAndClick(".checkbox-input", tab);
        return clickPromise;
      })
      .then(function(){
        let waitPromise = tab.waitForTimeout(1000);
        return waitPromise;
      })
      .then(function(){
        let codeTypePromise = tab.type("#input-1", code);
        return codeTypePromise;
      })
      .then(function(){
        let ctrlKeyDown = tab.keyboard.down("Control");
        return ctrlKeyDown;
      })
      .then(function(){
        let aKeyPress = tab.keyboard.press('a');
        return aKeyPress;
      })
      .then(function(){
        let xkeyPress = tab.keyboard.press("x");
        return xkeyPress;
      })
      .then(function(){
        let codeBoxClickedPromise = tab.click(
          ".monaco-scrollable-element.editor-scrollable.vs"
        );
        return codeBoxClickedPromise;
      })
      .then(function () {
        let aKeyPress = tab.keyboard.press("a");
        return aKeyPress;
      })
      .then(function(){
        let vKeyPromise = tab.keyboard.press('v');
        return vKeyPromise;
      })
      .then(function(){
        let clickSubmitPromise = tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
        return clickSubmitPromise;
      })
      .then(function(){
        let waitSuccessPromise = tab.waitForSelector('.compiler-message__value code');
        return waitSuccessPromise;
      })
      .then(function(){
        return tab.close();
      })
      .then(function(){
        scb();
      })
      .catch(function(error){
        fcb(error);
      })
    });
}
