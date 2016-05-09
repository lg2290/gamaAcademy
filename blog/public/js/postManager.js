var postModule = (function(){
    function savePost(leadEmail, leadName){
        var leadTime = new Date().toLocaleString();
        var lead = {
            email: leadEmail,
            name: leadName,
            date: leadTime
        }
        ajaxModule.postAjaxCall(lead, 'post', function(data){
            $("body").append("<iframe src='" + data + "' style='display: none;' ></iframe>")
        });
    }
    
    function validateAndSaveLead(sufix){
        var postTitle = $('#postTitle'+sufix).val();
        var postBody = $('#postBody'+sufix).val();
        var postImage = $('#postImage'+sufix).val();
        if(validationModule.validateFields(postTitle, postBody)){
            savePost(postTitle, postBody, postImage);            
        }
        else{
            $('#postBtn').popover('show');
            setTimeout(function(){
                $('#postBtn').popover('hide');
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
    function validateFields(title, body) {
        if(titlle)
            if(body)
                return true;
        return false;
    }

    return {
        validateFields: validateFields
    }
})();
function initialize(){
    $('#postBtn').click(function(){
        leadModule.validateAndSaveLead('Top')
    });
}