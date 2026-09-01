const {Given, When, Then} = require('@cucumber/cucumber');
const { LoginPage } = require("../pages/Login.Page");

let loginPage;
       
         Given('I navigate to {string}', async function (url) {
         loginPage = new LoginPage(this.page);
          await loginPage.navigate(url);
         });
       
   
         When('I enter my email {string}', async function (email) {
            if(email){
           await loginPage.enterEmail(email);

            }
         });
       
  
       
         When('I enter my password {string}', async function (password) {
           await loginPage.enterPassword(password);

            }
         );
       
   
       
         When('I click on the button login', async function () {
            await loginPage.clickLogin();

         });
       
   
       
         Then('I should see {string}', async function (message) {
            await loginPage.verifyHomePage(message);
         });


          Then('I should see le message {string}', async function (expectedMessage) {
            await loginPage.verifyErrorMessages(expectedMessage);
          });