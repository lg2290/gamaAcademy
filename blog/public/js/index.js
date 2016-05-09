var leadModule = (function(){
    function saveLead(leadEmail, leadName){
        var leadTime = new Date().toLocaleString();
        var lead = {
            email: leadEmail,
            name: leadName,
            date: leadTime
        }
        ajaxModule.postAjaxCall(lead, 'lead', function(data){
            $("body").append("<iframe src='" + data + "' style='display: none;' ></iframe>")
        });
    }
    
    function validateAndSaveLead(sufix){
        var leadEmail = $('#leadEmail'+sufix).val();
        var leadName = $('#leadName'+sufix).val();
        if(validationModule.validateEmail(leadEmail)){
            saveLead(leadEmail, leadName);            
        }
        else{
            $('#leadBtn'+sufix).popover('show');
            setTimeout(function(){
                $('#leadBtn'+sufix).popover('hide');
            }, 5000);
        }
    }
    
    return{
        validateAndSaveLead: validateAndSaveLead
    }
})();

var ajaxModule = (function(){
    function ajaxCall(type, data, endPoint, successCb){
        console.log(JSON.stringify(data));
        $.ajax({
            type: type,
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: endPoint,						
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

var validationModule = (function(){
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    return {
        validateEmail: validateEmail
    }
})()

function initialize(){
    $('#leadBtnTop').click(function(){
        leadModule.validateAndSaveLead('Top')
    });
        $('#leadBtnBottom').click(function(){
        leadModule.validateAndSaveLead('Bottom')
    })
}