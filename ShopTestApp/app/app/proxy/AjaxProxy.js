Ext.define('ShopTestApp.proxy.AjaxProxy', {
    alias: 'proxy.ajaxproxy',
    extend: 'Ext.data.proxy.Ajax',
    
    printMessage: function(message) {
        Ext.globalEvents.fireEvent('printMessage', message);
    },

    onUnauthenticated: function() {
        Ext.globalEvents.fireEvent('unauthenticated');
    },

    processOperationResult: function(success, operation, response) {
        var errorMsg = "";

        if (success == false) {
            errorMsg = "Error while perform " + operation.getAction() + " operation on " + operation.getProxy().storeEntityName + ". Status: " + response.status + ". StatusText: " + response.statusText;
            this.printMessage(errorMsg);
        }
        else
        {
            var xRespHeader = response.getResponseHeader('X-Responded-JSON');
            if (xRespHeader && Ext.decode(xRespHeader).status === 401) {
                this.onUnauthenticated();
                this.setException(operation, response);
                return;
            }

            var decodedResponse = null;
            try {
                decodedResponse = Ext.decode(response.responseText);
            }
            catch (Exception) {
                this.printMessage("Error while perform " + operation.getAction() + " operation on " + operation.getProxy().storeEntityName + ". Unexpected response.");
                this.setException(operation, response);
                return;
            }

            if (!(decodedResponse && decodedResponse.Success)) {
                this.printMessage("Error while perform " + operation.getAction() + " operation on " + operation.getProxy().storeEntityName + ". " + decodedResponse.ResponseText);
                this.setException(operation, response);
                return;
            }
        }
    },

    processResponse: function(success, operation, request, response) {
        this.processOperationResult(success, operation, response);
        this.callParent(arguments);
    }
})