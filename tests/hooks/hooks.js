const {Before,After,BeforeAll,AfterAll,Status,setDefaultTimeout} = require("@cucumber/cucumber");

const { chromium } = require("playwright");
//const config = require("../../playwright.config");

// Configuration d'attente explicite
setDefaultTimeout(10000);

// Déclaration des variables
let browser;
let browserContext;
let page;


// Lancer le navigateur
BeforeAll(async function () {
    browser = await chromium.launch({headless: false});
});


// Créer un contexte et une page
Before(async function () {
    browserContext = await browser.newContext();

    page = await browserContext.newPage();

    this.page = page;
    //console.log(">>> PAGE créée :", this.page !== undefined);
});


// Captures d'écran en cas de succès
After(async function ({ pickle, result }) {
    console.log(result?.status);

    if (result?.status === Status.PASSED) {
        const img = await this.page.screenshot({
            path: `./test-result/screenshots/${pickle.name}.png`,
            type: "png"
        });

        await this.attach(img, "image/png");
    }

    await browserContext.close();
});


// Fermer le navigateur
AfterAll(async function () {
    await browser.close();
});