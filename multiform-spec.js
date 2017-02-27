var multiFormPage = require('./pages/multiform');
var basePage = require('./pages/basepage');
var EC = protractor.ExpectedConditions;

describe('Way2Automation Multiform Page', function() {

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        multiFormPage.go();
    });

    it('should have correct title', function() {
        expect(browser.getTitle()).toEqual('Protractor practice website - Multiform');
    });

    it('should have correct url', function() {
        expect(browser.getCurrentUrl()).toEqual(multiFormPage.url);
    });

    it('log in and check description', function() {
        multiFormPage.logIn('bart', 'bart@wp.pl');
        expect(basePage.getTextFromElemenet(multiFormPage.description)).toContain('{"name":"bart","email":"bart@wp.pl"}');
    });

    it('move to sections using status buttons', function() {
        multiFormPage.clickStatusButtonAtIdx(1);
        expect(multiFormPage.getStatusButtonAttribute(1, 'class')).toEqual('active');
        expect(multiFormPage.getStatusButtonAttribute(0, 'class')).toEqual('');
        expect(multiFormPage.getStatusButtonAttribute(2, 'class')).toEqual('');
        multiFormPage.clickStatusButtonAtIdx(0);
        expect(multiFormPage.getStatusButtonAttribute(0, 'class')).toEqual('active');
        multiFormPage.clickStatusButtonAtIdx(2);
        expect(multiFormPage.getStatusButtonAttribute(2, 'class')).toEqual('active');
    });

    it('move to sections using button', function() {
        expect(multiFormPage.getStatusButtonAttribute(1, 'class')).toEqual('');
        multiFormPage.next_section_button.click();
        expect(multiFormPage.getStatusButtonAttribute(1, 'class')).toEqual('active');
        multiFormPage.next_section_button.click();
        expect(multiFormPage.getStatusButtonAttribute(1, 'class')).toEqual('');
    });

    it('check texts from status buttons', function() {
        expect(basePage.getTextFromElemenet(multiFormPage.getStatusButtonAtIdx(0))).toContain('PROFILE');
        expect(basePage.getTextFromElemenet(multiFormPage.getStatusButtonAtIdx(1))).toContain('INTERESTS');
        expect(basePage.getTextFromElemenet(multiFormPage.getStatusButtonAtIdx(2))).toContain('PAYMENT');
    });

    it('interests section - Xbox choice', function() {
        multiFormPage.clickStatusButtonAtIdx(1);
        multiFormPage.clickRadioButton(0);
        expect(basePage.getTextFromElemenet(multiFormPage.description)).toContain('{"type":"xbox"}');
    });

    it('interests section - Ps choice', function() {
        multiFormPage.clickStatusButtonAtIdx(1);
        multiFormPage.clickRadioButton(1);
        expect(basePage.getTextFromElemenet(multiFormPage.description)).toContain('{"type":"ps"}');
    });

    it('whole path and submit', function() {
        multiFormPage.logIn('bart', 'bart@wp.pl');
        multiFormPage.next_section_button.click();
        expect(basePage.getTextFromElemenet(multiFormPage.description)).toContain('{"name":"bart","email":"bart@wp.pl"}');
        multiFormPage.clickRadioButton(1);
        multiFormPage.next_section_button.click();
        multiFormPage.submit.click();
        //alert should appear
        browser.wait(EC.alertIsPresent(), 5000);
        var alertDialog = browser.switchTo().alert();
        expect(basePage.getTextFromElemenet(alertDialog)).toEqual('awesome!');
        alertDialog.accept();
    });
});