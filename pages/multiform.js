var basePage = require('./basepage');
var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: 'http://www.way2automation.com/angularjs-protractor/multiform/#/form/profile' },

    //LOCATORS
    name: { get: function() { return element(by.model('formData.name')); } },
    email: { get: function() { return element(by.model('formData.email')); } },
    next_section_button: { get: function() { return element(by.css('.col-xs-6 .btn')); } },
    description: { get: function() { return element(by.css('div.col-sm-8 .ng-binding')); } },
    status_buttons: { get: function() { return element.all(by.id('status-buttons')).all(by.css('a')); } },
    radio_buttons: { get: function() { return element.all(by.model('formData.type')); } },
    submit: { get: function() { return element(by.css('div.ng-scope .btn')) } },

    //METHODS
    logIn: {
        value: function(name_value, email_value) {
            var page = this;

            page.name.sendKeys(name_value);
            page.email.sendKeys(email_value);
        }
    },

    moveToTheNextSection: {
        value: function() {
            var page = this;

            page.next_section_button.click();
        }
    },

    getStatusButtonAtIdx: {
        value: function(idx) {
            return this.status_buttons.get(idx);
        }
    },

    clickStatusButtonAtIdx: {
        value: function(idx) {
            var page = this;

            page.getStatusButtonAtIdx(idx).click();
        }
    },

    getStatusButtonAttribute: {
        value: function(idx, attr) {
//            return this.getStatusButtonAtIdx(idx).getAttribute(attr);
            return basePage.getAttributeFromElement(this.getStatusButtonAtIdx(idx), attr);
        }
    },

    clickRadioButton: {
        value: function(idx) {
            this.radio_buttons.get(idx).click();
        }
    }
});