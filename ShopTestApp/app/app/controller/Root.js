Ext.define('ShopTestApp.controller.Root', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'ShopTestApp.view.login.Login',
        'ShopTestApp.view.main.Main',
        'ShopTestApp.model.CurrentUser'
    ],
    
    onLaunch: function () {
        if (this.getUserIsLoggedIn())
        {
            this.getUserInfoAndShowUI();
        }
        else
        {
            this.showLogin();
        }
    },

    showLogin: function() {
        this.login = Ext.create('ShopTestApp.view.login.Login', {
            autoShow: true,
            listeners: {
                scope: this,
                login: 'onLogin'
            }
        });
    },

    showUI: function(viewModelConfig) {
        viewModelConfig = viewModelConfig || {},
        this.viewport = Ext.create('ShopTestApp.view.main.Main', {
            autoShow: true,
            listeners: {
                scope: this,
                logout: 'onLogout'
            },
            viewModel: viewModelConfig
        });
    },

    authViewModel: function(record, viewModelConfig) {
        viewModelConfig = this.baseRoleViewModel(viewModelConfig);
        for (var i = 0; i < record.get("Roles").length; i++) {
            switch (record.get("Roles")[i].Name) {
                case 'customer':
                    viewModelConfig = this.customerRoleViewModel(viewModelConfig);
                    break;
                case 'manager':
                    viewModelConfig = this.managerRoleViewModel(viewModelConfig);
                    break;
                case 'admin':
                    viewModelConfig = this.adminRoleViewModel(viewModelConfig);
                    break
            }
        }
        return viewModelConfig;
    },

    baseRoleViewModel: function(viewModelConfig) {
        viewModelConfig.data.ProductsSection = {
            toolbarVisible: false,
            addToBasketVisible: false
        };
        
        viewModelConfig.data.CustomersSection = {
            visible: false
        };
        
        viewModelConfig.data.OrdersSection = {
            confirmOrderVisible: false,
            closeOrderVisible: false,
            basketVisible: false,
            deleteOrderVisible: false
        };

        viewModelConfig.data.AccountsSection = {
            visible: false
        };

        return viewModelConfig;
    },

    customerRoleViewModel: function(viewModelConfig) {
        viewModelConfig.data.ProductsSection.addToBasketVisible = true;
        viewModelConfig.data.OrdersSection.basketVisible = true;
        viewModelConfig.data.OrdersSection.deleteOrderVisible = true;
        return viewModelConfig;
    },

    managerRoleViewModel: function(viewModelConfig) {
        viewModelConfig.data.ProductsSection.toolbarVisible = true;
        viewModelConfig.data.CustomersSection.visible = true;
        viewModelConfig.data.OrdersSection.confirmOrderVisible = true;
        viewModelConfig.data.OrdersSection.closeOrderVisible = true;
        return viewModelConfig;
    },

    adminRoleViewModel: function(viewModelConfig) {
        for (var el in viewModelConfig.data.ProductsSection) {
            viewModelConfig.data.ProductsSection[el] = true;
        }

        for (var el in viewModelConfig.data.CustomersSection) {
            viewModelConfig.data.CustomersSection[el] = true;
        }

        for (var el in viewModelConfig.data.OrdersSection) {
            viewModelConfig.data.OrdersSection[el] = true;
        }

        for (var el in viewModelConfig.data.AccountsSection) {
            viewModelConfig.data.AccountsSection[el] = true;
        }

        return viewModelConfig;
    },
    
    getUserInfoAndShowUI: function() {
        this.CurrentUser = Ext.create('ShopTestApp.model.CurrentUser');
        this.CurrentUser.load({
            scope: this,
            success: this.onSuccess,
            failure: this.onFailure
        });
    },

    printErrorMsg: function(errorMsg) {
        this.setUserIsLoggedIn(false);
        Ext.Msg.alert('Error', errorMsg, this.showLogin.bind(this));
    },

    onSuccess: function(record, operation) {
        var response = operation.getResponse();

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
            this.printErrorMsg("Get User Info failed. Unexpected response.");
            return;
        }

        if (!(decodedResponse && decodedResponse.Success)) {
            this.printErrorMsg("Get User Info failed: " + decodedResponse.ResponseText);
            return;
        }

        var viewModelConfig = {};
        viewModelConfig.data = {
            CurrentUser: this.CurrentUser
        }
        viewModelConfig = this.authViewModel(record, viewModelConfig);
        this.showUI(viewModelConfig);
    },

    onFailure: function(record, operation) {
        var errorMsg = "Get User Info Failed. Status: " + operation.error.status + ". StatusText: " + operation.error.statusText;
        this.setUserIsLoggedIn(false);
        Ext.Msg.alert('Error', errorMsg, this.showLogin.bind(this));
    },

    onLogin: function () {
        this.setUserIsLoggedIn(true);
        if (this.login) {
            this.login.destroy();
        }
        this.getUserInfoAndShowUI();
    },

    onLogout: function () {
        this.setUserIsLoggedIn(false);
        if (this.viewport) {
            this.viewport.destroy();
        }
        this.showLogin();
    },
    
    getUserIsLoggedIn: function() {
        var sessionItem = sessionStorage.getItem('ShopTestApp');
        if (sessionItem && Ext.decode(sessionItem).IsLoggedIn)
        {
            return true;
        }
        return false;
    },

    setUserIsLoggedIn: function(value) {
        var o = {
            IsLoggedIn: value
        }
        sessionStorage.setItem('ShopTestApp', Ext.encode(o));
    }
});
