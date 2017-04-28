'use strict';

var config = require('config.js');
var firebase = require('firebase');

firebase.initializeApp(config.firebase);

var database = firebase.database();
var allStories = database.ref('stories/');

var urlHandlers = {
    getStoryUrlById: getStoryUrlById,
    findStoryById: findStoryById
};

module.exports = urlHandlers;

function getStoryUrlById(id) {
    console.log('This is the uuid', id);
    var url = null;

    findStoryById(id).then((results) => {
        results.forEach((story) => {
            url = story.val().audio;
        });
        console.log('this is the url inside urlHandlers', url);
        return url;
    });
}

function findStoryById(uuid) {
  return allStories.orderByChild('uuid').equalTo(uuid).once('value');
}
