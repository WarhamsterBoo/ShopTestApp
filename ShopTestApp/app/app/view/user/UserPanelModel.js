Ext.define('ShopTestApp.view.user.UserPanelModel', {
    extend: 'Ext.app.ViewModel',
    xtype: 'userpanelviewmodel',
	alias: 'viewmodel.userpanelviewmodel',

	stores: {
        UserListStore: {
            type: 'users'
        }
    },

    data: {
        userFilters: {
            Email: ''
        }
    }
});