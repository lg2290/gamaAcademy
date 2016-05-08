var leadModule = (function(){
    function getAllLeads(){
        ajaxModule.getAjaxCall({}, 'allLeads', function(data){
            var leadsTableRows = leadModule.getLeadsTableRows(data);
            $("#leadsTable tbody").append(leadsTableRows);
            $("#leadsNumber").text(data.length.toString());
        });
    }
    
    function getLeadsTableRows(leadsObjsArray){
        var rows = '';
        $.each(leadsObjsArray, function(key, lead){
            rows += '<tr>' + getLeadsTableRow(lead) + '</tr>'; 
        });
        
        return rows;
    }
    
    function getLeadsTableRow(leadObj){
        var row =  getTableCell(leadObj.email);
        row += getTableCell(leadObj.name);
        row += getTableCell(leadObj.date);
        
        return row;
    }
    
    function getTableCell(cellValue){
        return '<td>' + cellValue + '</td>';
    }
    
    return{
        getAllLeads: getAllLeads,
        getLeadsTableRows: getLeadsTableRows
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

function initialize(){
    leadModule.getAllLeads();
}