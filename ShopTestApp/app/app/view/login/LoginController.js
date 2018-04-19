Ext.define('ShopTestApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.login',

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    onLoginClick: function() {
        this.doLogin();
    },

    doLogin: function() {
        var form = this.lookupReference('login-form');
        var values = form.getValues();

        Ext.Ajax.request(
            {
                url: "../Account/Login",
                params: values,
                scope: this,
                success: this.onSuccess,
                failure: this.onFailure
            }
        );
    },

    printErrorMsg: function(errorMsg) {
        var errorLabel = this.lookupReference('loginerrorlabel');
        errorMsg = errorMsg || "Login failed.";
        errorLabel.setHtml(errorMsg);
        errorLabel.show();
    },

    onFailure: function(response, opts) {
        var errorMsg = "Login failed. Status: " + response.status + ". StatusText: " + response.statusText;
        this.printErrorMsg(errorMsg);
    },

    onSuccess: function(response, opts) {
        var xRespHeader = response.getResponseHeader('X-Responded-JSON');
        if (xRespHeader && Ext.decode(xRespHeader).status === 401) {
            this.printErrorMsg("Login failed. Unathorized.");
            return;
        }

        var decodedResponse = null;
        try {
            decodedResponse = Ext.decode(response.responseText);
        }
        catch (Exception) {
            this.printErrorMsg("Login failed. Unexpected response.");
            return;
        }

        if (!(decodedResponse && decodedResponse.Success)) {
            this.printErrorMsg("Login failed: " + decodedResponse.ResponseText);
            return;
        }

        this.fireViewEvent('login');
    }
});