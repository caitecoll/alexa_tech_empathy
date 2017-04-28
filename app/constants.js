'use strict';

var config = require('config.js');

var constants = Object.freeze({

    appId: config.alexa.appId,
    dynamoDBTableName: 'LongFormAudio',
    states: {
        START_MODE: '',
        PLAY_MODE: '_PLAY_MODE',
        RESUME_DECISION_MODE: '_RESUME_DECISION_MODE'
    },
    phrases: {
        goodbye: 'Good bye.',
        help: 'You are currently using the Tech Empathy skill. To hear a story, say, tell me a story.',
        looping: 'Looping is not supported yet.',
        navigation: 'Navigation between stories is not supported yet.',
        restart: 'Starting a story over is not currently supported.',
        resume: 'Would you like to resume the story currently in progress?',
        resumeReprompt: 'You can say yes to resume or no to hear a new story.',
        resumeUnhandled: 'Sorry, I did not understand. You can say yes to resume or no to hear a new story.',
        shuffling: 'Shuffling stories is not supported yet.',
        unhandled: 'Sorry, I did not understand.',
        welcome: 'Welcome to Tech Empathy. To hear a story, say, tell me a story.',
        welcomeReprompt: 'To hear a story say, tell me a story.'
    }
});

module.exports = constants;
