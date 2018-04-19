Ext.define('ShopTestApp.view.customer.CustomerController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customercontroller',

    requires: [
        'ShopTestApp.view.customer.Customer'
    ],

    init: function() {
        if (this.getViewModel().get('mode') == 'add')
        {
            var customerForm = this.lookupReference('customer-form');
            customerForm.add({
                xtype: 'textfield',
                name: 'Email',
                fieldLabel: 'Email',
                bind: '{customer.Email}',
                allowBlank: false
            });
            customerForm.add({
                xtype: 'textfield',
                inputType: 'password',
                name: 'Password',
                fieldLabel: 'Password',
                bind: '{customer.Password}',
                allowBlank: false
            });
        }
        else if (this.getViewModel().get('mode') == 'edit') {
            var customerForm = this.lookupReference('customer-form');
            customerForm.add({
                xtype: 'textfield',
                name: 'Email',
                fieldLabel: 'Email',
                bind: '{customer.Email}',
                readOnly: true,
                allowBlank: false
            });
        }
    },

    onSave: function() {
        var vm = this.getViewModel();
        var p = vm.get('customer');
        if (vm.get('mode') == 'add')
        {
            delete p.data.ID;
        }
        p.save({
            scope: this,
            success: this.onSuccess,
            failure: this.onFailure
        });
    },

    onSuccess: function(records, action) {
        Ext.globalEvents.fireEvent('printMessage', 'Customer saved. Name: ' + this.getViewModel().get('customer').get("Name") + '. Code: ' + this.getViewModel().get('customer').get("Code") + '.');
        this.fireViewEvent('saved');
        this.closeWindow();
        Ext.getBody().unmask();
    },

    onFailure: function(errorMsg) {
        this.closeWindow();
        Ext.getBody().unmask();
    },

    onCancel: function() {
        this.closeWindow();
    },

    closeWindow: function () {
        this.getView().destroy();
    }
});
