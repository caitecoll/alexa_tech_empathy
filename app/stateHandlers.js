'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var controller = require('./controller.js');
var storySelector = require('./storySelector.js');

var stateHandlers = {
    startModeIntentHandlers : Alexa.CreateStateHandler(constants.states.START_MODE, {
        /*
         *  All Intent Handlers for state : START_MODE
         */
        'LaunchRequest': function () {
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;
            this.attributes['loop'] = false;
            this.attributes['shuffle'] = false;
            this.attributes['playbackIndexChanged'] = true;

            this.handler.state = constants.states.START_MODE;

            this.response.speak(constants.phrases.welcome).listen(constants.phrases.welcomeReprompt);
            this.emit(':responseReady');
        },
        'RandomStoryIntent': function() {
            if (!this.attributes['index']) {
                // Initialize Attributes if undefined.
                this.attributes['index'] = 0;
                this.attributes['offsetInMilliseconds'] = 0;
                this.attributes['loop'] = false;
                this.attributes['shuffle'] = false;
                this.attributes['playbackIndexChanged'] = true;
                //  Change state to START_MODE
                this.handler.state = constants.states.START_MODE;
            }

            storySelector.getStories().then((storyCollection) => {
                var story = storySelector.playRandomStory(storyCollection);
                var self = this;

                this.handler.state = constants.states.START_MODE;

                storySelector.chooseAudioOrText(story, self);
            });
        },
        'AMAZON.HelpIntent': function () {;
            this.response.speak(constants.phrases.help);
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent': function () {
            this.response.speak(constants.phrases.goodbye);
            this.emit(':responseReady');
        },
        'AMAZON.CancelIntent': function () {
            this.response.speak(constants.phrases.goodbye);
            this.emit(':responseReady');
        },
        'Unhandled': function () {
            this.response.speak(constants.phrases.unhandled);
            this.emit(':responseReady');
        }
    }),
    playModeIntentHandlers : Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        /*
         *  All Intent Handlers for state : PLAY_MODE
         */
        'LaunchRequest': function () {
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;

            this.handler.state = constants.states.START_MODE;
            this.response.speak(constants.phrases.welcome).listen(constants.phrases.welcomeReprompt);

            this.emit(':responseReady');
        },
        'RandomStoryIntent': function() {
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;

            storySelector.getStories().then((storyCollection) => {
                var story = storySelector.playRandomStory(storyCollection);
                var self = this;

                storySelector.chooseAudioOrText(story, self);
            });
        },
        'AMAZON.NextIntent': function () { controller.playNext.call(this); },
        'AMAZON.PreviousIntent': function () { controller.playPrevious.call(this); },
        'AMAZON.PauseIntent': function () { controller.stop.call(this); },
        'AMAZON.StopIntent': function () { controller.stop.call(this); },
        'AMAZON.CancelIntent': function () { controller.stop.call(this); },
        'AMAZON.ResumeIntent': function () { controller.play.call(this); },
        'AMAZON.LoopOnIntent': function () { controller.loopOn.call(this); },
        'AMAZON.LoopOffIntent': function () { controller.loopOff.call(this); },
        'AMAZON.ShuffleOnIntent': function () { controller.shuffleOn.call(this); },
        'AMAZON.ShuffleOffIntent': function () { controller.shuffleOff.call(this); },
        'AMAZON.StartOverIntent': function () { controller.startOver.call(this); },
        'AMAZON.HelpIntent': function () {
            this.response.speak(constants.phrase.playHelp).listen(constants.phrase.help);
            this.emit(':responseReady');
        },
        'Unhandled': function () {
            this.response.speak(constants.phrases.unhandled);
            this.emit(':responseReady');
        }
    }),
    remoteControllerHandlers: Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        /*
         *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
         */
        'PlayCommandIssued': function () { controller.play.call(this); },
        'Unhandled': function () {
            this.response.speak(constants.phrases.unhandled);
            this.emit(':responseReady');
        },
        'PauseCommandIssued': function () { controller.stop.call(this); },
        'NextCommandIssued': function () { controller.playNext.call(this); },
        'PreviousCommandIssued': function () { controller.playPrevious.call(this); }
    }),
    resumeDecisionModeIntentHandlers: Alexa.CreateStateHandler(constants.states.RESUME_DECISION_MODE, {
        /*
         *  All Intent Handlers for state : RESUME_DECISION_MODE
         */
        'LaunchRequest': function () {
            this.response.speak(constants.phrases.resume).listen(constants.phrases.resumeReprompt);
            this.emit(':responseReady');
        },
        'Unhandled': function () {
            this.response.speak(constants.phrases.resumeUnhandled);
            this.emit(':responseReady');
        },
        'AMAZON.YesIntent': function () { controller.play.call(this); },
        'AMAZON.NoIntent': function () { controller.reset.call(this); },
        'AMAZON.HelpIntent': function () {
            this.response.speak(constants.phrases.resume).listen(constants.phrases.resumeReprompt);
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent': function () { controller.stop.call(this); },
        'AMAZON.CancelIntent': function () { controller.stop.call(this); }
    })
};

module.exports = stateHandlers;
