Ext.define('ShopTestApp.model.CurrentUser', {
    extend: 'ShopTestApp.model.User',

    autoload: false,
    
    proxy: {
        actionMethods: {
            read: 'GET'
        },
        api:{
            read: '../../Account/GetCurrentUserInfo'
        },
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'CurrentUser'
        }
    }
});
