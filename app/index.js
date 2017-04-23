'use strict'
var Alexa = require('alexa-sdk');
var constants = require('constants.js');
var textHandlers = require('textHandlers.js');
var stateHandlers = require('./stateHandlers.js');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = constants.APP_ID;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    alexa.registerHandlers(
        textHandlers,
        stateHandlers.startModeIntentHandlers,
        stateHandlers.playModeIntentHandlers,
        stateHandlers.remoteControllerHandlers,
        stateHandlers.resumeDecisionModeIntentHandlers
    );
    alexa.execute();
};
