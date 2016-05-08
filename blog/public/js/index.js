var leadModule = (function(){
    function saveLead(leadEmail, leadName){
        var leadTime = new Date().toLocaleString();
        var lead = {
            email: leadEmail,
            name: leadName,
            date: leadTime
        }
        ajaxModule.postAjaxCall(lead, 'lead', function(data){
            $("body").append("<iframe src='" + "http://localhost:3000/" + data + "' style='display: none;' ></iframe>")
        });
    }
    
    return{
        saveLead: saveLead
    }
})();

var ajaxModule = (function(){
    var serverUrl = 'http://localhost:3000/'
    
    function ajaxCall(type, data, endPoint, successCb){
        console.log(JSON.stringify(data));
        $.ajax({
            type: type,
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: serverUrl + endPoint,						
            success: function(data){
                successCb(data);
            }
        });
    }

    function getAjaxCall(data, endPoint, successCb){
        ajaxCall('GET', data, endPoint, successCb);    
    }

    function postAjaxCall(data, endPoint, successCb){
        ajaxCall('POST', data, endPoint, successCb);
    }
    
    return {
        getAjaxCall: getAjaxCall,
        postAjaxCall: postAjaxCall
    }
})();

function initialize(){
    $('#leadBtn').click(function(){
        var leadEmail = $('#leadEmail').val();
        var leadName = $('#leadName').val();
        console.log(leadEmail);
        console.log(leadName);
        leadModule.saveLead(leadEmail, leadName);
    })
}