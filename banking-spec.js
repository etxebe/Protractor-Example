var bankingPage = require('./pages/banking');
var basePage = require('./pages/basepage');

var EC = protractor.ExpectedConditions;


describe('Banking Page tests', function() {

    beforeEach(function() {
        bankingPage.go();
    });

    it('should have correct url', function() {
        expect(browser.getCurrentUrl()).toEqual(bankingPage.url);
    });

    it('should have correct title', function() {
        expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');
    });

    it('consumer login = Harry Potter', function() {
        bankingPage.logCustomer('Harry Potter');
        expect(bankingPage.welcomeMessage.getText()).toEqual('Welcome Harry Potter !!');
        bankingPage.logout.click();
        expect(bankingPage.yourName.isDisplayed()).toBe(true);
    });

    it('check consumer balance in three currencies', function() {
        bankingPage.logCustomer('Ron Weasly');
        expect(bankingPage.balanceInfo.getText()).toEqual('Account Number : 1007 , Balance : 0 , Currency : Dollar');
        bankingPage.changeAccount('1008');
        expect(bankingPage.balanceInfo.getText()).toEqual('Account Number : 1008 , Balance : 0 , Currency : Pound');
        bankingPage.changeAccount('1009');
        expect(bankingPage.balanceInfo.getText()).toEqual('Account Number : 1009 , Balance : 0 , Currency : Rupee');
    });

    it('make a deposit', function() {
        bankingPage.logCustomer('Ron Weasly');
        expect(bankingPage.balanceInfo.getText()).toEqual('Account Number : 1007 , Balance : 0 , Currency : Dollar');
        bankingPage.makeOperation('Deposit', 5000);
        expect(bankingPage.balanceInfo.getText()).toEqual('Account Number : 1007 , Balance : 5000 , Currency : Dollar');
    });

    it('make a withdrawal', function() {
        bankingPage.logCustomer('Ron Weasly');
        bankingPage.changeAccount('1008');
        expect(bankingPage.balanceInfo.getText()).toEqual('Account Number : 1008 , Balance : 0 , Currency : Pound');
        bankingPage.makeOperation('Withdrawl', 4000);
        expect(bankingPage.error_message.getText()).toEqual('Transaction Failed. You can not withdraw amount more than the balance.');
        expect(bankingPage.balanceInfo.getText()).toEqual('Account Number : 1008 , Balance : 0 , Currency : Pound');
    });

    it('two transactions', function() {
        bankingPage.logCustomer('Ron Weasly');
        bankingPage.changeAccount('1009');
        bankingPage.makeOperation('Deposit', 11000);
        bankingPage.makeOperation('Withdrawl', 3500);
        expect(bankingPage.balanceInfo.getText()).toEqual('Account Number : 1009 , Balance : 7500 , Currency : Rupee');

        browser.sleep(5000).then(function() {
            bankingPage.transactions.click();
            expect(bankingPage.getTransactionTableValue(0, 1).getText()).toEqual('11000');
            expect(bankingPage.getTransactionTableValue(0, 2).getText()).toEqual('Credit');
            expect(bankingPage.getTransactionTableValue(1, 1).getText()).toEqual('3500');
            expect(bankingPage.getTransactionTableValue(1, 2).getText()).toEqual('Debit');
        });
        bankingPage.logout.click();
    });

    it('manager login - add new customer', function() {
        bankingPage.managerLogin.click();
        element(by.buttonText('Add Customer')).click();
        element(by.model('fName')).sendKeys('Leo');
        element(by.model('lName')).sendKeys('Turtle');
        element(by.model('postCd')).sendKeys('62-400');
        element(by.buttonText('Add Customer')).click();
    });

    it('open account for new user', function() {
        bankingPage.managerLogin.click();
        element(by.buttonText('Open Account')).click();
        basePage.selectDropDownByText(element(by.model('custId')) ,'Harry Potter');
        basePage.selectDropDownByText(element(by.model('currency')) ,'Pound');
        element(by.buttonText('Process')).click();
        //alert should appear
        browser.wait(EC.alertIsPresent(), 5000);
        var alertDialog = browser.switchTo().alert();
        expect(basePage.getTextFromElemenet(alertDialog)).toEqual('Account created successfully with account Number :1016');
        alertDialog.accept();
    });

    it('delete a user', function() {
        bankingPage.managerLogin.click();
        element(by.buttonText('Customers')).click();
        element(by.model('searchCustomer')).sendKeys('Albus');
        element(by.buttonText('Delete')).click();
    });
});