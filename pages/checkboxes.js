var Page = require('astrolabe').Page;

module.exports = Page.create({

    url: { value: 'http://www.way2automation.com/angularjs-protractor/checkboxes/' },
    count: { value: 0 },

    //LOCATORS
    h2_elements: { get: function() { return element.all(by.tagName('h2')); } },
    h2_elements_count: { get: function() { return this.h2_elements.count(); } },
    h3_elements: { get: function() { return element.all(by.tagName('h3')); } },
    h3_elements_count: { get: function() { return this.h3_elements.count(); } },
    h4_elements: { get: function() { return element.all(by.tagName('h4')); } },
    h4_elements_count: { get: function() { return this.h4_elements.count(); } },

    //METHODS
    getClickableCheckboxElement: {
        value: function(elem, idx) {
            return elem.get(idx).element(by.tagName('input'));
        }
    },

    getCountOnElements: {
        value: function(elem) {
            return elem.count();
        }
    },

    getTextFromElement: {
        value: function(elem) {
            return elem.getText();
        }
    },

    isCheckboxEnabled: {
        value: function(elem, idx) {
            return this.getClickableCheckboxElement(elem, idx).isEnabled();
        }
    },

    isCheckboxSelected: {
        value: function(elem, idx) {
            return this.getClickableCheckboxElement(elem, idx).isSelected();
        }
    }
});