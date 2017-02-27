var webtablesPage = require('./pages/webtables');
var basePage = require('./pages/basepage');

var EC = protractor.ExpectedConditions;

describe('Webtables Page tests', function() {

    beforeEach(function() {
        webtablesPage.go();
    });

    it('add user', function() {
        webtablesPage.adduser.click().then(function() {
            var elem_first = element.all(by.css('td.ng-scope input.ng-pristine')).get(0);
            browser.wait(EC.visibilityOf(elem_first), 5000);

            elem_first.sendKeys('Little');

            var elem_role = element(by.css('td.ng-scope select.ng-pristine'));
            basePage.selectDropDownByText(elem_role, 'Admin');

            var save = element(by.buttonText('Save'));
            save.click();

        });
    });
});