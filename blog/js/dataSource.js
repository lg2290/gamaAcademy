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
    
    function getAllLeads(callback) {
        var leads = []; 
        Lead.find(function (err, results) {
            if(err)
                callback(err, null);
            else
                callback(null, results);                
        });
    }
    
    return{
        getAllLeads: getAllLeads,
        saveLead: saveLead
    }
})()

module.exports = fn;
