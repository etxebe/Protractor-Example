var calcPage = require('./pages/calc');
var basePage = require('./pages/basepage');

var EC = protractor.ExpectedConditions;

describe('Way2Automation Calc Page Tests', function() {

    beforeEach(function() {
        calcPage.go();
    });

    it('should correctly add two numbers', function() {
        calcPage.makeMathOperation(2, 2, '+');
        //basePage.selectDropDownByNum(calcPage.operator, 2);
        //basePage.selectDropDownByValue(calcPage.operator, 'MODULO');
        expect(calcPage.result).toEqual('4');
    });

    it('should correctly divide two numbers', function() {
        calcPage.makeMathOperation(9, 4, '/');
        expect(calcPage.result).toEqual('2.25');
    });

    it('should correctly modulo two numbers', function() {
        calcPage.makeMathOperation(7, 3, '%');
        expect(calcPage.result).toEqual('1');
    });

    it('should correctly multiply two numbers', function() {
        calcPage.makeMathOperation(1, 5, '*');
        expect(calcPage.result).toEqual('5');
    });

    it('should correctly subtract two numbers', function() {
        calcPage.makeMathOperation(2, 6, '-');
        expect(calcPage.result).toEqual('-4');
    });

    it('all operations together', function() {
        calcPage.makeMathOperation(1, 2, '+');
        calcPage.makeMathOperation(2, 4, '/');
        calcPage.makeMathOperation(36, 6, '%');
        calcPage.makeMathOperation(7, 7, '*');
        calcPage.makeMathOperation(-1, -3, '-');

        //read table elements
        var elem_length = calcPage.result_table.all(by.repeater('result in memory')).count();
        var expected_results = ['2', '49', '0', '0.5', '3'];
        expect(elem_length).toEqual(5);
        for (var i=0; i<elem_length; i++) {
            expect(calcPage.result_table.all(by.repeater('result in memory')).get(i).all(by.css('td.ng-binding')).get(1).getText()).toEqual(expected_results[i]);
        }
    },120000);
});