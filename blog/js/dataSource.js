var Lead = require('./leadModel.js');

var fn = (function(){
    function saveLead(params) {
        var lead = new Lead({
            name: params.name,
            email: params.email,
            date: params.date
        });
        
        lead.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully!');
        });
    }
    
    return{
        saveLead: saveLead
    }
})()

module.exports = fn;
