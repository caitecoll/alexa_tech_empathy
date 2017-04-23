'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');

var controller = function () {
    return {
        play: function (url) {
            this.handler.state = constants.states.PLAY_MODE;

            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;
            this.attributes['playbackIndexChanged'] = true;
            this.attributes['playbackFinished'] = false;

            var token = String(this.attributes['playOrder'][this.attributes['index']]);
            var playBehavior = 'REPLACE_ALL';
            var offsetInMilliseconds = this.attributes['offsetInMilliseconds'];
            // Since play behavior is REPLACE_ALL, enqueuedToken attribute need to be set to null.
            this.attributes['enqueuedToken'] = null;

            this.response.audioPlayerPlay(playBehavior, url, token, null, offsetInMilliseconds);
            this.emit(':responseReady');
        },
        stop: function () {
            this.response.audioPlayerStop();
            this.emit(':responseReady');
        },
        playNext: function () {
            this.handler.state = constants.states.RESUME_DECISION_MODE;

            var message = 'Navigation between stories is not supported yet. Would you like to resume the story currently in progress?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        playPrevious: function () {
            this.handler.state = constants.states.RESUME_DECISION_MODE;

            var message = 'Navigation between stories is not supported yet. Would you like to resume the story currently in progress?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        loopOn: function () {
            this.handler.state = constants.states.RESUME_DECISION_MODE;

            var message = 'Looping is not supported yet. Would you like to resume the story currently in progress?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        loopOff: function () {
            this.handler.state = constants.states.RESUME_DECISION_MODE;

            var message = 'Looping is not supported yet. Would you like to resume the story currently in progress?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        shuffleOn: function () {
            this.handler.state = constants.states.RESUME_DECISION_MODE;

            var message = 'Shuffling stories is not supported yet. Would you like to resume the story currently in progress?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        shuffleOff: function () {
            this.handler.state = constants.states.RESUME_DECISION_MODE;

            var message = 'Shuffling stories is not supported yet. Would you like to resume the story currently in progress?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        startOver: function () {
            this.attributes['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        reset: function () {
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        }
    }
}();

module.exports = controller;
