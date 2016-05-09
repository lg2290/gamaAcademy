var postModule = (function(){
    function savePost(postTitle, postBody, postImage){
        var post = {
            title: postTitle,
            body: postBody,
            image: postImage
        }
        ajaxModule.postAjaxCall(post, 'post', function(data){
            console.log('ok');
        });
    }
    
    function validateAndSaveLead(){
        var postTitle = $('#postTitle').val();
        var postBody = $('#postBody').val();
        var postImage = $('#postImage').val();
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
        if(title){
            if(body){
                return true;
            }            
        }
        return false;
    }

    return {
        validateFields: validateFields
    }
})();

function initialize(){
    $('#postBtn').click(function(){
        postModule.validateAndSaveLead()
    });
}