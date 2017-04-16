'use strict'
var Alexa = require('alexa-sdk');
var firebase = require('firebase');
var config = require('config.js');

firebase.initializeApp(config);

var database = firebase.database();
var firstStory = database.ref('stories').limitToFirst(1);

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
        getRandomStory().then((snapshot) => {
            snapshot.forEach((story) => {
                var storyText = story.val().storyText;
                this.emit(':tell', storyText);
            });
        });
    },
    'Unhandled': function() {
        this.emit(':tell', 'Something went wrong');
    }
};

function getRandomStory() {
    return firstStory.once('value');
}
