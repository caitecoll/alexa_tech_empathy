'use strict'
var Alexa = require('alexa-sdk');
var constants = require('constants.js');
var stateHandlers = require('./stateHandlers.js');
var audioEventHandlers = require('./audioEventHandlers.js');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    alexa.registerHandlers(
        audioEventHandlers,
        stateHandlers.startModeIntentHandlers,
        stateHandlers.playModeIntentHandlers,
        stateHandlers.remoteControllerHandlers,
        stateHandlers.resumeDecisionModeIntentHandlers
    );

    alexa.execute();
};
