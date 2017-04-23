'use strict';

var Alexa = require('alexa-sdk');
var config = require('config.js');
var controller = require('./controller.js');
var firebase = require('firebase');

firebase.initializeApp(config.firebase);

var database = firebase.database();
var stories = database.ref('stories').limitToFirst(100);

var textHandlers = {
    'RandomStoryIntent': function() {
        getStories().then((storyCollection) => {
            var story = playRandomStory(storyCollection);
            var self = this;
            
            chooseAudioOrText(story, self);
        });
    }
};

module.exports = textHandlers;

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
            thisStory = story.val();
        }
        i++;
    });

    return thisStory;
}

function chooseAudioOrText(story, self) {
    if (story.audio !== '') {
        controller.play(story.audio);
    } else {
        self.emit(':tell', story.storyText);
    }
}
