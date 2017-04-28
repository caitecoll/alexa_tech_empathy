'use strict';

var config = require('config.js');
var constants = require('./constants');
var controller = require('./controller.js');
var firebase = require('firebase');

var database = firebase.database();
var stories = database.ref('stories').limitToFirst(100);

var storySelector = {
    getStories: getStories,
    playRandomStory: playRandomStory,
    chooseAudioOrText: chooseAudioOrText
};

module.exports = storySelector;

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
        controller.play.call(self, story.audio, story.uuid);
    } else {
        self.handler.state = constants.states.START_MODE;

        self.emit(':tell', story.storyText);
    }
}
