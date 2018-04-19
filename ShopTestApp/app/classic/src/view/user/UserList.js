Ext.define('ShopTestApp.view.user.UserList', {
    extend: 'Ext.grid.Panel',
    xtype: 'userlist',
    reference: 'userlist',

    requires: [
        'ShopTestApp.store.Users'
    ],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{UserListStore}'
        },
        dock: 'bottom',
        displayInfo: true,
        beforePageText: 'Страница',
        afterPageText: 'из {0}',
        displayMsg: 'Пользователи {0} - {1} из {2}'
    }],
    
    bind: {
        store: '{UserListStore}'
    },

    columns: [{
        text: 'Email',
        width: '25%',
        sortable: true,
        dataIndex: 'Email'
    }]
});