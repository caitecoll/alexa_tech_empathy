'use strict'
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(skillHandlers);
    alexa.execute();
};

var skillHandlers = {
    'LaunchRequest': function() {
        this.emit(':ask', 'What type of story would you like to hear?')
    },
    'RandomStoryIntent': function() {
        this.emit(':tell', 'This is a random story');
    },
    'Unhandled': function() {
        this.emit(':tell', 'Something went wrong');
    }
};
