var Lead = require('./leadModel.js');
var Post = require('./postModel.js');


var fn = (function(){
    function getAllLeads(callback) {
        Lead.find(function (err, results) {
            if(err)
                callback(err, null);
            else
                callback(null, results);                
        });
    }

    function getAllPosts(callback) {
        Post.find(function (err, results) {
            if(err)
                callback(err, null);
            else
                callback(null, results);                
        });
    }
    
    function saveLead(params) {
        var lead = new Lead({
            name: params.name,
            email: params.email,
            date: params.date
        });
        
        lead.save(function(err) {
            if (err) throw err;
            console.log('Lead saved successfully!');
        });
    }

    function savePost(params) {
        var post = new Post({
           title: params.title,
           body: params.body,
           image: params.image
        });
        
        post.save(function(err) {
            if (err) throw err;
            console.log('Post saved successfully!');
        });
    }    
    
    return{
        getAllLeads: getAllLeads,
        getAllPosts: getAllPosts,
        saveLead: saveLead,
        savePost: savePost
    }
})()

module.exports = fn;
