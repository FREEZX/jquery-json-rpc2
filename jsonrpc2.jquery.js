(function($){
    var authHeader;
    var rpcAddress;
    var defaultRequest = {
        jsonrpc: "2.0"
    };

    $.jsonrpcSetup = function( address, username, password ){
        rpcAddress = address;
        if(username && password){
        	authHeader = "Basic " + btoa(username + ":" + password); 
        }
    };

    $.jsonrpc = function( method, params, callback ){
        var requestExtension = {
            method: method,
            params: params,
            id: Math.floor((Math.random() * 100000) + 1)
        }

        var requestData;
        requestData = $.extend(requestData, defaultRequest, requestExtension);

        var ajaxOptions = {
            url: rpcAddress,
            type: 'POST',
            data: JSON.stringify(requestData),
            succes: function(data){
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            },
            complete: function(jqXHR) {
                if(jqXHR.responseJSON){
                    callback.apply(null, jqXHR.responseJSON.result);
                }
            }
        };

        if(authHeader){
            ajaxOptions.headers = { 
                'Authorization': authHeader
            };
        }

        $.ajax(ajaxOptions);
    };

    $.jsonrpcNotify = function( method, params, callback ){
        var requestExtension = {
            method: method,
            params: params
        }

        var requestData;
        requestData = $.extend(requestData, defaultRequest, requestExtension);

        var ajaxOptions = {
            url: rpcAddress,
            type: 'POST',
            data: JSON.stringify(requestData),
            succes: function(data){
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            },
            complete: function(jqXHR) {
                callback();
            }
        };

        if(authHeader){
            ajaxOptions.headers = { 
                'Authorization': authHeader
            };
        }

        $.ajax(ajaxOptions);
    };
}(jQuery));