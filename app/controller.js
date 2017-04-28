'use strict';

var constants = require('./constants');
var urlHandlers = require('./urlHandlers');

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

                urlHandlers.findStoryById(token).then((results) => {
                    results.forEach((story) => {
                        activeUrl = story.val().audio;
                    });

                    this.response.audioPlayerPlay(playBehavior, activeUrl, token, null, offsetInMilliseconds);
                    this.emit(':responseReady');

                    console.log('this is the activeurl', activeUrl);
                    // return activeUrl;
                });

                // activeUrl = urlHandlers.getStoryUrlById(token);
                // console.log('This is the activeUrl', activeUrl);
            }

            // var activeUrl = '';
            //
            // if (!url) {
            //     activeUrl = storedUrl;
            // } else {
            //     storedUrl = url;
            //     activeUrl = url
            // }
            //
            // if (!this.attributes['playOrder']) {
            //     // Initialize Attributes if undefined.
            //     this.attributes['playOrder'] = Array.apply(null, {length: 1}).map(Number.call, Number);
            //     this.attributes['index'] = 0;
            //     this.attributes['offsetInMilliseconds'] = 0;
            //     this.attributes['loop'] = false;
            //     this.attributes['shuffle'] = false;
            //     this.attributes['playbackIndexChanged'] = true;
            //
            //     this.handler.state = constants.states.START_MODE;
            // }
            //
            // this.attributes['index'] = 0;
            //
            // // var url = 'https://firebasestorage.googleapis.com/v0/b/techempathy-21547.appspot.com/o/stories%2Faudio%2FB87EA1CB-3A94-4BB7-B2EC-7B3BF76DF88E.mp4?alt=media&token=44cc23fd-9ec9-4966-bd9c-2303cc7fad90';
            // // var token = '1234567';
            // var playBehavior = 'REPLACE_ALL';
            // var offsetInMilliseconds = 0;
            // // Since play behavior is REPLACE_ALL, enqueuedToken attribute need to be set to null.
            // this.attributes['enqueuedToken'] = null;

            // this.response.audioPlayerPlay(playBehavior, activeUrl, token, null, offsetInMilliseconds);
            // this.emit(':responseReady');
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
