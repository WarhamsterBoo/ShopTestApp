Ext.define('ShopTestApp.view.user.UserPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.userpanelcontroller',

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    init: function() {
        this.getViewModel().getStore('UserListStore').load();
    },

    addButtonClick: function() {
        this.user = Ext.create('ShopTestApp.view.user.User', {
            viewModel: {
                links: {
                    user: {
                        reference: 'ShopTestApp.model.User',
                        create: true
                    }
                },
                data: {
                    mode: 'add',
                    formTitle: 'Create User'
                }
            },
            listeners: {
                scope: this,
                saved: 'doRefresh'
            }
        });
        this.user.show();
    },

    openEditWindow: function() {
        var selectionModel = this.lookupReference('userlist').getSelectionModel();
        if (selectionModel.hasSelection() && selectionModel.getSelection().length === 1)
        {
            this.selectedRecord = selectionModel.getSelection()[0];
            this.user = Ext.create('ShopTestApp.view.user.User', {
                viewModel: {
                    links: {
                        user: {
                            type: 'ShopTestApp.model.User',
                            id: this.selectedRecord.get("ID")
                        }
                    },
                    data: {
                        mode: 'edit',
                        formTitle: 'User Details'
                    }
                },
                listeners: {
                    scope: this,
                    saved: 'doRefresh'
                }
            });
            this.user.show();
        }
    },

    deleteButtonClick: function() {
        var selectionModel = this.lookupReference('userlist').getSelectionModel();
        if (selectionModel.hasSelection() && selectionModel.getSelection().length === 1)
        {
            this.selectedItem = selectionModel.getSelection()[0];
            Ext.Msg.show({
                scope: this,
                title:'Delete User?',
                message: 'You are going to delete User ' + this.selectedItem.get("Email") + '. Proceed?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var usersStore = Ext.getStore('usersStore');
                        var record = usersStore.getById(this.selectedItem.get('ID'));
                        usersStore.remove(record);
                        usersStore.sync({
                            scope: this,
                            success: this.onSuccess,
                            failure: this.onFailure
                        });
                    }
                }
            });
        }
    },

    applyFiltersButtonClick: function() {
        var store = this.getViewModel().getStore('UserListStore');
        store.clearFilter();
        var filters = store.getFilters();
        var userFilters = this.getViewModel().get("userFilters");
        
        if (userFilters.Email) {
            filters.add(new Ext.util.Filter({
                    property: 'Email',
                    value   : userFilters.Email
                })
            );
        }
        store.filter();
    },

    clearFiltersButtonClick: function() {
        var store = this.getViewModel().getStore('UserListStore');
        store.clearFilter();
        store.filter();
    },

    onSuccess: function() {
        Ext.globalEvents.fireEvent('printMessage', 'User deleted. Email: ' + this.selectedItem.get("Email") + '.');
        this.doRefresh();
    },

    onFailure: function(errorMsg) {
        this.doRefresh();
    },

    doRefresh: function() {
        this.getView().getViewModel().getStore('UserListStore').load();
    }
});
