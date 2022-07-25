const path = require('path');

var folderPath = path.resolve(),
    pathDimensions = path.resolve().split('/').pop().split('x');

var height = Number(pathDimensions.pop()),
    width = Number(pathDimensions);

var getSplitters = function () {
    var splitters = ['Production', 'production'];

    return new RegExp(splitters.join('|'));
};

var getClient = function () {
    var tmp = folderPath;

    tmp = tmp.split(getSplitters()).shift().split('/');
    tmp.splice(-2, 2);

    tmp = tmp.pop();

    return tmp;
};

var getCampaign = function () {
    var tmp = folderPath;

    tmp = tmp.split(getClient()).pop();
    tmp = tmp.split('/');
    tmp.shift();
    tmp = tmp.shift();

    return tmp;
};

var getID = function () {
    var tmp = folderPath;

    tmp = tmp.split(getSplitters()).pop().split('/');
    tmp.shift();

    if ( tmp.length > 2 ) {
        var id = tmp[0];

        for ( var i = 1; i < tmp.length - 1; i++ ) {
            id += ' - ' + tmp[i];
        }

        return id;
    } else if (tmp.length > 1) {
        return tmp.shift();
    } else {
        return '';
    }
};

module.exports = {
    bannerDimensions: {
        width: width,
        height: height
    },
    project: {
        client: getClient(),
        campaign: getCampaign(),
        id: getID(),
    }
};
