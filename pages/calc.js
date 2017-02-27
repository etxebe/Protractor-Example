var Page = require('astrolabe').Page;
var basePage = require('./basepage');

module.exports = Page.create({
    url: { value: 'http://www.way2automation.com/angularjs-protractor/calc/' },

    //LOCATORS
    first_number: { get: function() { return element(by.model('first')); } },
    second_number: { get: function() { return element(by.model('second')); } },
    operator: { get: function() { return element(by.model('operator')); } },
    go_button: { get: function() { return element(by.id('gobutton')); } },
    result: { get: function() { return element(by.css('.form-inline .ng-binding')).getText(); } },
    result_table: { get: function() { return element(by.css('div.container table.table')); } },

    //METHODS
    writeNumbers: {
        value: function(num1, num2) {
            this.first_number.sendKeys(num1);
            this.second_number.sendKeys(num2);
        }
    },

    makeMathOperation: {
        value: function(num1, num2, math_operator) {
            this.writeNumbers(num1, num2);
            basePage.selectDropDownByText(this.operator, math_operator);
            this.go_button.click();
        }
    }
});