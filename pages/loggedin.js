var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: 'http://www.way2automation.com/angularjs-protractor/registeration/#/' },

    logMessage: { get: function() { return element.all(by.css('p.ng-scope')).get(0); } },
    logout: { get: function() { return element(by.css('p.ng-scope a')); } }
});