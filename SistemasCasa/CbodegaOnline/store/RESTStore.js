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

Ext.Loader.setPath('Ext.ux', '../ux');

Ext.define("Ext.ux.SistemasCasa.CbodegaOnline.store.RESTStore", {
    extend: "Ext.data.Store",
    requires: [
        'Ext.ux.SistemasCasa.rest.Rest',
    ],
    autoLoad: true,
    autoSync: true,
    pageSize: 22,
    constructor: function (config) {
        Ext.applyIf(config, {
            proxy: this.createProxy()
        });
        this.callParent([config]);
    },
    createProxy: function () {
        return {
            type: 'zest',
            reader: {
                type: 'json',
                rootProperty: 'data',
                sucessProperty: 'sucess',
                totalProperty: 'total',
                //root: 'items'
            },
            writer: {
                type: 'json'
            }
        }
    },
    listeners: {
        write: function (store, operation) {

            if (this.storeId == "CbodegaOnline.catalogs.administrator.users.store.Importers") {
                this.load();
            } else if (this.storeId == "CbodegaOnline.catalogs.administrator.users.store.Users") {
                this.load();
          } 
        },
        beforesync: function (options, eOpts, otro) {
        	if(this.storeId == "CbodegaOnline.catalogs.administrator.users.store.Importers") {
        		var grid = Ext.ComponentQuery.query("#usergrid")[0];
            	var record = grid.getSelectionModel().selected.items[0];
            	idUser = record.data.id_usuario;
        		this.proxy.setExtraParams({
        			idUser : idUser
        		});
        	} 
        }
    }
});
