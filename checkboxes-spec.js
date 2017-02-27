var checkboxesPage = require('./pages/checkboxes');
var basePage = require('./pages/basepage');

var EC = protractor.ExpectedConditions;


describe('Way2Automation Checkboxes Page', function() {

    beforeEach(function() {
        checkboxesPage.go();
    });

    it('check whether checboxes names and font size are correct', function() {
        var h2_elements = checkboxesPage.h2_elements;
        expect(checkboxesPage.h2_elements_count).toEqual(1);
        expect(checkboxesPage.getTextFromElement(checkboxesPage.h2_elements)).toEqual(['Store']);

        var h3_elements = checkboxesPage.h3_elements;
        expect(checkboxesPage.h3_elements_count).toEqual(6);
        expect(checkboxesPage.getTextFromElement(checkboxesPage.h3_elements)).toEqual([ 'Inside', 'Home Improvement', 'Painting', 'Outside', 'Garage Improvement', 'Car' ]);

        var h4_elements = checkboxesPage.h4_elements;
        expect(checkboxesPage.h4_elements_count).toEqual(14);
        expect(checkboxesPage.getTextFromElement(checkboxesPage.h4_elements)).toEqual([ 'Boxcutter', 'Hammer', 'Screwdriver', 'Red Paint', 'Green Paint', 'Blue Paint', 'Coarse Brush', 'Axe', 'Chainsaw', 'Leaf Blower', 'Spare Tires', 'Exhaustion Pipe', 'Gearbox', 'First Aid Kit' ]);
    });

    it('select the main checkbox Store', function() {
        var store_element = checkboxesPage.getClickableCheckboxElement(checkboxesPage.h2_elements, 0);
        expect(checkboxesPage.isCheckboxSelected(checkboxesPage.h2_elements, 0)).toBe(false);
        store_element.click();

        checkboxesPage.h2_elements_count.then(function(count) {
            for (var i=0; i<count; i++) {
                expect(checkboxesPage.isCheckboxSelected(checkboxesPage.h2_elements, i)).toBe(true);
            }
        });

        checkboxesPage.h3_elements_count.then(function(count) {
            for (var j=0; j<count; j++) {
                expect(checkboxesPage.isCheckboxSelected(checkboxesPage.h3_elements, j)).toBe(true);
            }
        });

        checkboxesPage.h4_elements_count.then(function(count) {
            for (var k=0; k<count; k++) {
                checkboxesPage.isCheckboxEnabled(checkboxesPage.h4_elements, k).then(function(res) {
                    var index = 0;
                    if (res) {
                        expect(checkboxesPage.isCheckboxSelected(checkboxesPage.h4_elements, index)).toBe(true);
                        index++;
                    }
                    else {
                        index++;
                    }
                 });
            }
        });
    });

    it('Outside changes to selected', function() {
        var leaf_element = checkboxesPage.getClickableCheckboxElement(checkboxesPage.h4_elements, 9);
        var spare_element = checkboxesPage.getClickableCheckboxElement(checkboxesPage.h4_elements, 10);
        var firstaid_element = checkboxesPage.getClickableCheckboxElement(checkboxesPage.h4_elements, 13);

        leaf_element.click();
        spare_element.click();
        firstaid_element.click();

        var outside_element = checkboxesPage.getClickableCheckboxElement(checkboxesPage.h3_elements, 3);
        var garage_element = checkboxesPage.getClickableCheckboxElement(checkboxesPage.h4_elements, 4);
        var car_element = checkboxesPage.getClickableCheckboxElement(checkboxesPage.h4_elements, 5);

        expect(outside_element.isSelected()).toBe(true);
        expect(garage_element.isSelected()).toBe(true);
    });
});