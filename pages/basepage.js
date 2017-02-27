var Page = require('astrolabe').Page;

module.exports = Page.create({

    getTextFromElemenet: {
        value: function(elem) {
            return elem.getText();
        }
    },

    getAttributeFromElement: {
        value: function(elem, attr) {
            return elem.getAttribute(attr);
        }
    },

    selectDropDownByNum: {
        value: function(elem, num) {
            elem.all(by.css('option')).then(function(opt) {
                opt[num].click();
            });
        }
    },

    selectDropDownByValue: {
        value: function(elem, value) {
            //elem.sendKeys(value);
            elem.all(by.css('option[value="' + value + '"]')).click();
        }
    },

    selectDropDownByText: {
        value: function(elem, txt) {
            elem.all(by.cssContainingText('option', txt)).click();
        }
    }
});