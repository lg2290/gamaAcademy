var leadModule = (function(){
    function saveLead(leadEmail, leadName, sufix, ebookType){
        var leadTime = new Date().toLocaleString();
        var lead = {
            email: leadEmail,
            name: leadName,
            date: leadTime,
            ebook: ebookType
        }
        ajaxModule.postAjaxCall(lead, 'lead', function(data){
            inputFieldModule.clearFiels(sufix);
            loaderModule.hide();
            
            if(data.hasEbook)
                $("body").append("<iframe src='" + data.fileUrl + "' style='display: none;' ></iframe>")
        });
    }
    
    function validateAndSaveLead(sufix, ebookType){       
        var leadEmail = $('#leadEmail'+sufix).val();
        var leadName = $('#leadName'+sufix).val();
        if(validationModule.validateEmail(leadEmail)){
            loaderModule.show();
            saveLead(leadEmail, leadName, sufix, ebookType);
        }
        else{
            buttonModule.showPopover(sufix);
            setTimeout(function(){
                buttonModule.hidePopover(sufix);
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
})();

var postModule = (function(){
    function getPosts(){
        ajaxModule.getAjaxCall({}, 'post', function(data){
            var postsHtml = postModule.getPostsHtml(data.reverse());
            $("#postsContainer").append(postsHtml);
            loaderModule.hide();
        });
    }
    
    function getPostsHtml(posts){
        var postsHtml = '';
        $.each(posts, function(index, post){
            postsHtml += getPostHtml(post);
        });
        return postsHtml;
    }
    
    function getPostHtml(post){
        var postHtml = '<div class="row row-content post"><div class="col-sm-12 col-md-12">';
        postHtml += getPostImageHtlm(post.image);
        postHtml += getPostTitleHtlm(post.title);
        postHtml += getPostBodyHtlm(post.body);
        postHtml += '</div></div>';
        
        return postHtml;
    }
    
    function getPostImageHtlm(imageUrl){
        var postImgHtml = '<div class="col-sm-8 col-sm-offset-2 col-md-3 col-md-offset-0 img-sm-margin-bottom">';
        if(imageUrl){
            postImgHtml += '<img class="img-responsive" src="' + imageUrl + '">'
        }
        postImgHtml += '</div>';
        
        return postImgHtml;
    }
    
    function getPostTitleHtlm(title){
        var postTitleHtml = '<div class="col-sm-12 col-md-9"><h2 class="media-heading">';
        postTitleHtml += title;
        postTitleHtml += '</h2>';
        
        return postTitleHtml;
    }
    
    function getPostBodyHtlm(body){
        var postBodyHtml = '<p>';
        postBodyHtml += body;
        postBodyHtml += '</p></div>';
        
        return postBodyHtml;
    }
    
    return{
        getPosts: getPosts,
        getPostsHtml: getPostsHtml
    }
})()

var loaderModule = (function(){
    var loader = $('#loader');
    
    function hide(){
        loader.hide('slow');
    }
    
    function show(){
        loader.show();
    }
    
    return{
        hide: hide,
        show: show
    }
})();

var inputFieldModule = (function(){
    
    function clearFiels(sufix){
        $('#leadEmail'+sufix).val('');
        if(sufix != 'Top')
            $('#leadName'+sufix).val('');
    }
    
    return {
        clearFiels: clearFiels
    }
})();

var buttonModule = (function(){
    function hidePopover(sufix){
        $('#leadBtn'+sufix).popover('hide');
    }
    
    function setClick(sufix, ebookType){
        $('#leadBtn'+sufix).click(function(){
            leadModule.validateAndSaveLead(sufix, ebookType);
        });
    }
    
    function showPopover(sufix){
        $('#leadBtn'+sufix).popover('show');
    }
    
    return {
        hidePopover: hidePopover,
        setClick: setClick,
        showPopover: showPopover
    }
})();

function initialize(){
    loaderModule.show();
    
    buttonModule.setClick('Top', 0);
    buttonModule.setClick('5Body', 1);
    buttonModule.setClick('JunSide', 1);
    
    postModule.getPosts();
}