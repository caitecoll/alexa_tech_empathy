'use strict';

var constants = require('./constants');
var urlFinder = require('./urlFinder');

var controller = function () {
    return {
        play: function (url, uuid) {
            this.handler.state = constants.states.PLAY_MODE;

            if (this.attributes['playbackFinished']) {
                // Reset to top of the playlist when reached end.
                this.attributes['index'] = 0;
                this.attributes['offsetInMilliseconds'] = 0;
                this.attributes['playbackIndexChanged'] = true;
                this.attributes['playbackFinished'] = false;
            }

            var activeUrl = '';
            var token = '';
            var offsetInMilliseconds = 0;
            var playBehavior = 'REPLACE_ALL';
            this.attributes['index'] = 0;
            this.attributes['enqueuedToken'] = null; // Since play behavior is REPLACE_ALL, enqueuedToken attribute need to be set to null.

            //If there is a uuid, then this is a new audio file. Store the uuid as a token for reference if audio is paused. If there is not
            //a uuid, then the skill is in resume state and should use the uuid stored in the token to request the audio url
            if (uuid) {
                token = uuid;
                activeUrl = url;

                this.response.audioPlayerPlay(playBehavior, activeUrl, token, null, offsetInMilliseconds);
                this.emit(':responseReady');

            } else {
                token = this.attributes['token'];
                offsetInMilliseconds = this.attributes['offsetInMilliseconds'];

                urlFinder.findStoryById(token).then((results) => {
                    results.forEach((story) => {
                        activeUrl = story.val().audio;
                    });

                    this.response.audioPlayerPlay(playBehavior, activeUrl, token, null, offsetInMilliseconds);
                    this.emit(':responseReady');
                });
            }
        },
        stop: function () {
            this.response.audioPlayerStop();
            this.emit(':responseReady');
        },
        playNext: function () {
            this.response.speak(constants.phrases.navigation);
        },
        playPrevious: function () {
            this.response.speak(constants.phrases.navigation);
        },
        loopOn: function () {
            this.response.speak(constants.phrases.looping);
        },
        loopOff: function () {
            this.response.speak(constants.phrases.looping);
        },
        shuffleOn: function () {
            this.response.speak(constants.phrases.shuffling);
        },
        shuffleOff: function () {
            this.response.speak(constants.phrases.shuffling);
        },
        startOver: function () {
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;

            storySelector.getStories().then((storyCollection) => {
                var story = storySelector.playRandomStory(storyCollection);
                var self = this;

                storySelector.chooseAudioOrText(story, self);
            });
        },
        reset: function () {
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;

            storySelector.getStories().then((storyCollection) => {
                var story = storySelector.playRandomStory(storyCollection);
                var self = this;

                storySelector.chooseAudioOrText(story, self);
            });
        }
    }
}();

module.exports = controller;
