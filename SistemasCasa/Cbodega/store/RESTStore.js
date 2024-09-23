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

Ext.define("Ext.ux.SistemasCasa.Cbodega.store.RESTStore",{
	extend		: "Ext.data.Store",
	requires	: [
   	    'Ext.ux.SistemasCasa.rest.Rest',
   	],
	       	
	autoLoad	: true,
	autoSync	: true,
	pageSize    : 5,
	
	constructor: function(config) {
        Ext.applyIf(config, {
            proxy: this.createProxy()
        });
        this.callParent([config]);
    },
    
    createProxy: function() {
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
        write: function(store, operation){
        	
        	if(this.storeId == "Cbodega.catalogs.administrator.store.Importers") {
                this.load();
            } else if (this.storeId == "Cbodega.catalogs.searchReport.store.InvoiceDetail") {
            	console.log("hola InvoiceDetail");
            	this.load();
            }  else if (this.storeId == "Cbodega.catalogs.searchReport.store.InvoiceGrid") {
            	console.log("hola InvoiceGrid");
            	this.load();
            } else if(this.storeId == "Cbodega.catalogs.administrator.store.Users") {
                this.load();
            } else if (this.storeId == "Cbodega.catalogs.administrator.store.Modules2") {
                this.load();
            } else {
	        	try {
	        		var grid = Ext.getCmp("agencygrid");
	        		store.load({
	        			extraParams: {
	        				id : grid.getSelectionModel().getSelected().items[0].data.id
	        			}
	        		});  
	        	} catch (e) {
	        		
	        	}
        	}
        },
        
        beforesync: function (options, eOpts, otro) {
        	if(this.storeId == "Cbodega.catalogs.administrator.store.Importers") {
        		var grid = Ext.ComponentQuery.query("#usersview")[0];
            	var record = grid.getSelectionModel().selected.items[0];
            	idUser = record.data.id;
        		this.proxy.setExtraParams({
        			idUser : idUser
        		});
        	} else if (this.storeId == "Cbodega.catalogs.searchReport.store.InvoiceDetail") {
            	return console.log("holaa InvoiceDetail");
            } else if (this.storeId == "Cbodega.catalogs.searchReport.store.InvoiceGrid") {
            	return console.log("holaa InvoiceGrid");
            } else if (this.storeId == "Cbodega.catalogs.administrator.store.Modules2") {
                
                var grid = Ext.ComponentQuery.query('#usersview')[0];
                var record = grid.getSelectionModel().selected.items[0];
                var idUser = record.data.id;
                this.proxy.setExtraParams({
                    idUser: idUser
                });
            } else {
        		try {
            		if(options.update[0].previousValues.selected != undefined) {
                		var grid = Ext.getCmp("agencygrid");
                		this.proxy.setExtraParams({
                			idAgency : grid.getSelectionModel().getSelected().items[0].data.id
                		});
                	} else {
                		this.proxy.setExtraParams();
                	}
            	} catch (e) {
            		
            	}   
        	}
        }
    }
});