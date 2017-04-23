'use strict';

var config = require('config.js');

var constants = Object.freeze({

    APP_ID : 'config.alexa.APP_ID',
    dynamoDBTableName : 'LongFormAudio',
    states : {
        START_MODE : '',
        PLAY_MODE : '_PLAY_MODE',
        RESUME_DECISION_MODE : '_RESUME_DECISION_MODE'
    }
});

module.exports = constants;
