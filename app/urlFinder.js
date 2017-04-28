'use strict';

var config = require('config.js');
var firebase = require('firebase');

firebase.initializeApp(config.firebase);

var database = firebase.database();
var allStories = database.ref('stories/');

var urlFinder = {
    getStoryUrlById: function(id) {
        var url = null;

        findStoryById(id).then((results) => {
            results.forEach((story) => {
                url = story.val().audio;
            });
            return url;
        });
    },
    findStoryById: function(uuid) {
        return allStories.orderByChild('uuid').equalTo(uuid).once('value');
    }
};

module.exports = urlFinder;
