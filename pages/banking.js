var Page = require('astrolabe').Page;
var basePage = require('./basepage');

module.exports = Page.create({

    url: { value: 'http://www.way2automation.com/angularjs-protractor/banking/#/login' },

    //LOCATORS
    customerLogin: { get: function() { return element(by.buttonText('Customer Login')); } },
    managerLogin: { get: function() { return element(by.buttonText('Bank Manager Login')); } },
    yourName: { get: function() { return element(by.css('div.form-group select.form-control')); } },
    login: { get: function() { return element(by.buttonText('Login')); } },
    logout: { get: function() { return element(by.buttonText('Logout')); } },
    welcomeMessage: { get: function() { return element(by.css('div.borderM div strong')); } },
    balanceInfo: { get: function() { return element(by.css('div.ng-scope div.borderM div.center')); } },
    selectAccount: { get: function() { return element(by.id('accountSelect')); } },
    deposit: { get: function() { return element(by.buttonText('Deposit')); } },
    deposit_amount: { get: function() { return element(by.model('amount')); } },
    withdrawal: { get: function() { return element(by.buttonText('Withdrawl')); } },
    error_message: { get: function() { return element(by.css('div.ng-scope span.error.ng-binding')); } },
    transactions: { get: function() { return element(by.buttonText('Transactions')); } },
    transactions_table: { get: function() { return element(by.css('table.table tbody')); } },
    back: { get: function() { return element(by.buttonText('Back')); } },

    //METHODS
    logCustomer: {
        value: function(username) {
            this.customerLogin.click();
            expect(this.login.isDisplayed()).toBe(false);
            basePage.selectDropDownByText(this.yourName, username);
            expect(this.login.isDisplayed()).toBe(true);
            this.login.click();
        }
    },

    changeAccount: {
        value: function(account_name) {
            basePage.selectDropDownByText(this.selectAccount, account_name);
        }
    },

    makeDeposit: {
        value: function(amount) {
            this.deposit.click();
            this.deposit_amount.sendKeys(amount);
            this.deposit_amount.submit();
        }
    },

    makeWithdrawal: {
        value: function(amount) {
            this.withdrawal.click();
            this.deposit_amount.sendKeys(amount);
            this.deposit_amount.submit();
        }
    },

    makeOperation: {
        value: function(operation, amount) {
            element(by.buttonText(operation)).click();
            this.deposit_amount.sendKeys(amount);
            this.deposit_amount.submit();
        }
    },

    getTransactionTableRow: {
        value: function(rownum) {
            return this.transactions_table.all(by.tagName('tr')).get(rownum);
        }
    },

    getTransactionTableValue: {
        value: function(rownum, colnum) {
            return this.transactions_table.all(by.tagName('tr')).get(rownum).all(by.tagName('td')).get(colnum);
        }
    }

//    checkTableFilling: {
//        value: function() {
//            for (var i=0; i<150; i++) {
//                this.transactions_table.all(by.tagName('tr')).count().then(function(c) {
//                    console.log(c);
//                    if (c == 0) {
//                        console.log('aaa');
//                        element(by.buttonText('Back')).click();
//                        element(by.buttonText('Transactions')).click();
//                    }
//                    else {
//                        return true;
//                    }
//                });
//        }
//        }
//    }
});