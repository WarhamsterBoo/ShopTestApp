Ext.define('ShopTestApp.view.user.UserModel', {
    extend: 'Ext.app.ViewModel',
    xtype: 'userviewmodel',
	alias: 'viewmodel.userviewmodel',

    links: {
		user: {
			
		}
	},

	data: {
		mode: 'add',
		formTitle: ''
	}
	
});