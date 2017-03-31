import { Images } from '../imports/api/imageCollection.js';

if (Meteor.isServer) {
  
    Meteor.publish("MyImage", function() {
        return Images.find();
    });

    Images.allow({
        'insert': function(){
            return true;
        },
        'update': function(){
            return true;
        },
        'download': function(userId, fileObj) {
            return true
        }
    });
}