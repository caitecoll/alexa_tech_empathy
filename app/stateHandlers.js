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
        'LaunchRequest' : function () {
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;

            this.handler.state = constants.states.START_MODE;

            var message = 'Welcome to Tech Empathy in start mode. You can say, tell me a story, tell me a story about inclusion, or tell me a story about exclusion.';
            var reprompt = 'You can say, tell me a story, tell me a story about inclusion, or tell me a story about exclusion.';

            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        'RandomStoryIntent': function() {
            this.attributes['index'] = 5;
            this.attributes['offsetInMilliseconds'] = 0;

            storySelector.getStories().then((storyCollection) => {
                var story = storySelector.playRandomStory(storyCollection);
                var self = this;

                this.handler.state = constants.states.START_MODE;

                storySelector.chooseAudioOrText(story, self);
            });
        },
        'Unhandled' : function () {
            var message = 'Sorry, I am having some issues in start mode';
            this.response.speak(message);
        },
        // 'AMAZON.HelpIntent' : function () {
        //     var message = 'Welcome to Tech Empathy. You can say, tell me a story, tell me a story about inclusion, or tell me a story about exclusion.';
        //     this.response.speak(message).listen(message);
        //     this.emit(':responseReady');
        // },
        'AMAZON.StopIntent' : function () {
            var message = 'Good bye.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        // 'AMAZON.CancelIntent' : function () {
        //     var message = 'Good bye.';
        //     this.response.speak(message);
        //     // this.emit(':responseReady');
        // },
        // 'Unhandled' : function () {
        //     var message = 'Sorry, I did not understand. Please say, tell me a story, tell me a story about inclusion, or tell me a story about exclusion.';
        //     this.response.speak(message);
        //     // this.response.shouldEndSession = true;
        //     // this.emit(':responseReady');
        // }
    }),
    playModeIntentHandlers : Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        /*
         *  All Intent Handlers for state : PLAY_MODE
         */
        'LaunchRequest' : function () {
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;

            var message;
            var reprompt;
            // if (this.attributes['playbackFinished']) {
                this.handler.state = constants.states.START_MODE;
                message = 'Welcome to Tech Empathy in play mode. You can say, tell me a story, tell me a story about inclusion, or tell me a story about exclusion.';
                reprompt = 'You can say, tell me a story, tell me a story about inclusion, or tell me a story about exclusion.';
            // } else {
            //     this.handler.state = constants.states.RESUME_DECISION_MODE;
            //     message = 'I am in Play Launch Mode. Would you like to resume the story currently in progress?';
            //     reprompt = 'You can say yes to resume or no to play from the top.';
            // }

            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        'RandomStoryIntent': function() {
            this.attributes['index'] = 7;
            this.attributes['offsetInMilliseconds'] = 0;

            storySelector.getStories().then((storyCollection) => {
                var story = storySelector.playRandomStory(storyCollection);
                var self = this;

                storySelector.chooseAudioOrText(story, self);
            });
        },
        // 'AMAZON.NextIntent' : function () { controller.playNext.call(this); },
        // 'AMAZON.PreviousIntent' : function () { controller.playPrevious.call(this); },
        // 'AMAZON.PauseIntent' : function () { controller.stop.call(this); },
        'AMAZON.StopIntent' : function () { controller.stop.call(this); },
        // 'AMAZON.CancelIntent' : function () { controller.stop.call(this); },
        // 'AMAZON.ResumeIntent' : function () {
        //     console.log('Inside Resume Intent on line 89');
        //     controller.play.call(this)
        // },
        // 'AMAZON.LoopOnIntent' : function () { controller.loopOn.call(this); },
        // 'AMAZON.LoopOffIntent' : function () { controller.loopOff.call(this); },
        // 'AMAZON.ShuffleOnIntent' : function () { controller.shuffleOn.call(this); },
        // 'AMAZON.ShuffleOffIntent' : function () { controller.shuffleOff.call(this); },
        // 'AMAZON.StartOverIntent' : function () { controller.startOver.call(this); },
        // 'AMAZON.HelpIntent' : function () {
        //     var message = 'You are listening to stories from Tech Empathy. At any time, you can say Pause to pause the audio and Resume to resume.';
        //     this.response.speak(message).listen(message);
        //     this.emit(':responseReady');
        // },
        'Unhandled' : function () {
            var message = 'Sorry, I am having some issues in play mode';
            this.response.speak(message);
        }
    }),
    remoteControllerHandlers : Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        /*
         *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
         */
        'PlayCommandIssued' : function () {
            console.log('Inside PlayCommandIssued on line 113');
            controller.play.call(this);
        },
        'Unhandled' : function () {
            var message = 'Sorry, I am having some issues in remote play mode';
            this.response.speak(message);
        }
        // 'PauseCommandIssued' : function () { controller.stop.call(this); },
        // 'NextCommandIssued' : function () { controller.playNext.call(this); },
        // 'PreviousCommandIssued' : function () { controller.playPrevious.call(this); }
    }),
    resumeDecisionModeIntentHandlers : Alexa.CreateStateHandler(constants.states.RESUME_DECISION_MODE, {
        /*
         *  All Intent Handlers for state : RESUME_DECISION_MODE
         */
        'LaunchRequest' : function () {
            var message = 'I am in Resume Decision Launch Mode. Would you like to resume the story currently in progress?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        'Unhandled' : function () {
            var message = 'Sorry, I am having some issues in resume decision mode';
            this.response.speak(message);
        }
        // 'AMAZON.YesIntent' : function () {
        //     console.log('Inside YesIntent on line 131');
        //     this.response.speak('Okay, playing your story');
        //     controller.play.call(this);
        // },
        // 'AMAZON.NoIntent' : function () { controller.reset.call(this); },
        // 'AMAZON.HelpIntent' : function () {
        //     var message = 'I am in Resume Decision Help Mode. Would you like to resume the story currently in progress?';
        //     var reprompt = 'You can say yes to resume or no to play from the top.';
        //     this.response.speak(message).listen(reprompt);
        //     this.emit(':responseReady');
        // },
        // 'AMAZON.StopIntent' : function () {
        //     var message = 'Good bye.';
        //     this.response.speak(message);
        //     this.emit(':responseReady');
        // },
        // 'AMAZON.CancelIntent' : function () {
        //     var message = 'Good bye.';
        //     this.response.speak(message);
        //     this.emit(':responseReady');
        // },
        // 'Unhandled' : function () {
        //     var message = 'Sorry, this is not a valid command. Please say help to hear what you can say.';
        //     this.response.speak(message).listen(message);
        //     this.emit(':responseReady');
        // }
    })
};

module.exports = stateHandlers;
