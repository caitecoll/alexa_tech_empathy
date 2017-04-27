'use strict';

var constants = require('./constants');

var controller = function () {
    return {
        play: function () {
            this.handler.state = constants.states.PLAY_MODE;
            console.log('In play mode in the controller');

            if (!this.attributes['playOrder']) {
                // Initialize Attributes if undefined.
                this.attributes['playOrder'] = Array.apply(null, {length: 1}).map(Number.call, Number);
                this.attributes['index'] = 10;
                this.attributes['offsetInMilliseconds'] = 0;
                this.attributes['loop'] = false;
                this.attributes['shuffle'] = false;
                this.attributes['playbackIndexChanged'] = true;
                //  Change state to START_MODE
                this.handler.state = constants.states.START_MODE;
            }

            this.attributes['index'] = 15;

            var url = 'https://firebasestorage.googleapis.com/v0/b/techempathy-21547.appspot.com/o/stories%2Faudio%2FB87EA1CB-3A94-4BB7-B2EC-7B3BF76DF88E.mp4?alt=media&token=44cc23fd-9ec9-4966-bd9c-2303cc7fad90';
            var token = '1234567';
            var playBehavior = 'REPLACE_ALL';
            var offsetInMilliseconds = 0;
            // Since play behavior is REPLACE_ALL, enqueuedToken attribute need to be set to null.
            this.attributes['enqueuedToken'] = null;

            // var message = 'Why am I not playing?';
            // this.response.speak(message);

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
