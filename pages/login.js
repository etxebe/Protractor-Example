var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: 'http://www.way2automation.com/angularjs-protractor/registeration/#/login' },

    //LOCATORS
    username: { get: function() { return browser.findElement(by.id('username')); } },
    usernameMessage: { get: function() { return element.all(by.css('.help-block .ng-scope')).get(0); } },
    password: { get: function() { return element(by.model('Auth.user.password')); } },
    passwordMessage: { get: function() { return element.all(by.css('.help-block .ng-scope')).get(1); } },
    name: { get: function() { return element(by.model('model[options.key]')); } },
    loginButton: { get: function() { return element(by.css('button.btn')); } },
    alertInvalid: { get: function() { return element(by.css('div.alert.alert-danger')); } },

    //METHODS
    userLogin: {
        value: function(name, pass, secondname) {
            var page = this;

            page.username.sendKeys(name);
            page.password.sendKeys(pass);
            page.name.sendKeys(secondname);
            page.loginButton.click();
        }
    }
});