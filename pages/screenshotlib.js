var fs = require('fs-extra');

function takeScreenshot(data, filename) {
        console.log('bbb');
        var stream = fs.createWriteStream('report/screenshots/' + filename + '.png');
        stream.write(new Buffer(data, 'base64'));
        stream.end();
}