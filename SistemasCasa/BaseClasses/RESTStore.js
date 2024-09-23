 /**
 * @class AdminWeb.modules.catalogs.users.store.Users
 * @extends Ext.data.Store
 * @autor Jaime Santana Zaldivar
 * @date Tue Apr 9 13:49:00 CDT 2013
 *
 * Users class store
 *
 *
 **/

Ext.define("Ext.ux.SistemasCasa.BaseClasses.RESTStore", {
    extend: "Ext.data.Store",
    requires: [
        'Ext.ux.SistemasCasa.BaseClasses.RestZend',
    ],
    autoLoad: true,
    autoSync: false,
    pageSize: 100,
    constructor: function (config) {
        Ext.applyIf(config, {
            proxy: this.createProxy()
        });
        this.callParent([config]);
    },
    createProxy: function () {
        return {
            type: 'zest',
            extraParams: {},
            reader: {
                type: 'json',
                rootProperty: 'data',
                sucessProperty: 'sucess',
                totalProperty: 'total'
            },
            writer: {
                type: 'json'
            }
        }
    }
});