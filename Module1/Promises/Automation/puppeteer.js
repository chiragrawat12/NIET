let puppeteer = require("puppeteer");

const id = `ronefag160@moxkid.com`;
const password = "123456789";

let tab;

let browserOpenPriomise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

browserOpenPriomise
  .then(function (browserInstance) {
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
    let waitPromise = tab.waitForSelector("#base-card-1-link");
    return waitPromise;
  })
  .then(function () {
    let interviewPreparationPromise = tab.click("#base-card-1-link");

    return interviewPreparationPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector("a[data-attr1='warmup']");
    return waitPromise;
  })
  .then(function(){
      let warupPromise = tab.click("a[data-attr1='warmup']");
      return warupPromise;
  })
  .then(function(){
    let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item");
    return waitPromise;
  })
  .then(function(){
      let allChallengesTags = tab.$$(".js-track-click.challenge-list-item");
      return allChallengesTags;
  })
  .then(function(allChallengesTags){
      let allQuesLinkPromise = [];
      for(let i = 0 ; i < allChallengesTags.length ; i ++){
        let quesLinkPromise = tab.evaluate(function(ele){ return ele.getAttribute("href"); } , allChallengesTags[i]);
        allQuesLinkPromise.push(quesLinkPromise);
      }

      let combinedPromise = Promise.all(allQuesLinkPromise);
      return combinedPromise;
  })
  .then(function(combinedLinks){
    console.log(combinedLinks);
  })
  .catch(function (error) {
    console.log(error);
  });
