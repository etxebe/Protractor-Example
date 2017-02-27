var loginPage = require('./pages/login');
var loggedInPage = require('./pages/loggedin');
var basePage = require('./pages/basepage');

var fs = require('fs-extra');

//function takeScreenshot(data, filename, n) {
//        var stream = fs.createWriteStream('report/screenshots/' + filename + '_' + n + '.png');
//        stream.write(new Buffer(data, 'base64'));
//        stream.end();
//        n += 1;
//}

function takeScreenshot(filename, n) {
        browser.takeScreenshot().then(function (png) {
            console.log('aaaa');
            var stream = fs.createWriteStream('report/screenshots/' + filename + '_' + n + '.png');
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        });
        return n+1;
}


describe('Login Page', function() {
//    var n = 0;

    beforeEach(function() {
        loginPage.go();
//        n += 1;
    });

    afterEach(function() {
//        n = 0;
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Protractor practice website - Registration');
    });

    it('should have a correct url address', function() {
        expect(browser.getCurrentUrl()).toEqual(loginPage.url);
    });

    it('message for login too short', function() {
        loginPage.userLogin('b', '', '');
//        n = takeScreenshot('message for login too short', n);
        console.log("N value is:", n)
        expect(basePage.getTextFromElemenet(loginPage.usernameMessage)).toEqual('Your username must be between 3 and 50 characters long');
//        n = takeScreenshot('message for login too short', n);
        expect(loginPage.loginButton.isEnabled()).toBe(false);
//        n = takeScreenshot('message for login too short', n);
    });

    xit('message for password control if password is too short', function() {
        loginPage.userLogin('', 'b', '');
        expect(basePage.getTextFromElemenet(loginPage.passwordMessage)).toEqual('Your username must be between 3 and 100 characters long');
        expect(loginPage.loginButton.isEnabled()).toBe(false);
    });

    it('login button is disabled', function() {
        expect(loginPage.loginButton.isEnabled()).toBe(false);
        loginPage.userLogin('angular', 'password', '');
        expect(loginPage.loginButton.isEnabled()).toBe(false);
    });

    it('unsuccessful login (incorrect password and login)', function() {
        loginPage.userLogin('bart', 'password', 'bart');
        expect(loginPage.alertInvalid.getText()).toEqual('aUsername or password is incorrect');
    });

    it('unsuccessful login (incorrect password)', function() {
        loginPage.userLogin('angular', 'pass', 'angular');
        expect(basePage.getTextFromElemenet(loginPage.alertInvalid)).toEqual('aUsername or password is incorrect');
    });

    it('successful login', function() {
        loginPage.userLogin('angular', 'password', 'angular');
        expect(basePage.getTextFromElemenet(loggedInPage.logMessage)).toEqual('You\'re logged in!!');
        loggedInPage.logout.click();
        expect(loginPage.username.isDisplayed()).toBe(true);
    });
});
