var Page = require('astrolabe').Page;

module.exports = Page.create({

    url: { value: 'http://www.way2automation.com/angularjs-protractor/webtables/' },

    adduser: { get: function() { return element(by.buttonText('Add User')); } },
    //new user form
    firstname: { get: function() { return element(by.model('dataRow[column.map]')); } }
});