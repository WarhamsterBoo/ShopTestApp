Ext.define('ShopTestApp.view.user.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.usercontroller',

    requires: ['ShopTestApp.view.user.User'],

    init: function() {
        if (this.getViewModel().get('mode') == 'add')
        {
            var userWindow = this.getView();
            userWindow.add({
                xtype: 'adduserform',
                reference: 'user-form'
            });
        }
        else if (this.getViewModel().get('mode') == 'edit') {
            var userWindow = this.getView();
            userWindow.add({
                xtype: 'edituserform',
                reference: 'user-form'
            });
        }
    },

    onSave: function() {
        var vm = this.getViewModel();
        var p = vm.get('user');
        var roles = this.lookupReference('userformroles').getChecked();
        for (var i=0; i<roles.length; i++) {
            p.Roles().add(Ext.create('ShopTestApp.model.Role', { Name: roles[i].name }));
        }
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
        Ext.globalEvents.fireEvent('printMessage', 'User saved. Email: ' + this.getViewModel().get('user').get("Email") + '.');
        this.fireViewEvent('saved');
        this.closeWindow();
    },

    onFailure: function(errorMsg) {
        this.closeWindow();
    },

    onCancel: function() {
        this.closeWindow();
    },

    closeWindow: function () {
        this.getView().destroy();
    }
});
