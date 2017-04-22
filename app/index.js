'use strict'
var Alexa = require('alexa-sdk');
var firebase = require('firebase');
var config = require('config.js');

firebase.initializeApp(config);

var database = firebase.database();
var stories = database.ref('stories').limitToFirst(100);

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
        getStories().then((storyCollection) => {
            this.emit(':tell', playRandomStory(storyCollection));
        });
    },
    'Unhandled': function() {
        this.emit(':tell', 'Something went wrong');
    }
};

function getStories() {
    return stories.once('value');
}

function getRandomIndex(maxValue) {
    return Math.floor((Math.random() * maxValue));
}

function playRandomStory(stories) {
    var randomIndex = getRandomIndex(stories.numChildren());
    var i = 0;
    var thisStory = null;

    stories.forEach((story) => {
        if (i === randomIndex) {
            thisStory = story.val().storyText;
        }
        i++;
    });

    return thisStory;
}
