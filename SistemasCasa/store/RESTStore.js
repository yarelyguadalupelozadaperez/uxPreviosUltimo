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

Ext.define("Ext.ux.SistemasCasa.store.RESTStore",{
	extend		: "Ext.data.Store",
	requires	: [
   	    'Ext.ux.SistemasCasa.rest.Rest',
   	],
	       	
	autoLoad	: true,
	autoSync	: true,
	pageSize    : 100,
	
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
				totalProperty: 'total'	
			},
			writer: {
				type: 'json'
			}
        }
    },
    
    listeners: {
        write: function(store, operation){
        	if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Permissions") {
        		this.load();
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.CustomeHouses") {
                this.load();
            } else if(this.storeId == "Pemexmaoo.modules.catalogs.users.store.PermissionsUsers") {
                this.load();
            } else if(this.storeId == "Pemexmaoo.modules.catalogs.users.store.UserAreas") {
                this.load();
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.users.store.Agencies") {
                    this.load();
        	} else if (this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Areas") {
    			if(operation.getRecords()[0].data.area != "" && operation.getRecords()[0].data.areaDescription != "")
        			this.load();
        	} else if (this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Fields") {
    			if(operation.getRecords()[0].data.field != "" && operation.getRecords()[0].data.fieldDescription != "")
        			this.load();
        	} else if (this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Phases") {
    			if(operation.getRecords()[0].data.phase != "" && operation.getRecords()[0].data.phaseDescription != "")
        			this.load();
        	} else if (this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Profiles") {
    			if(operation.getRecords()[0].data.profile != "" && operation.getRecords()[0].data.profileDescription != "")
        			this.load();
        	} else if (this.storeId == "Pemexmaoo.modules.catalogs.masters.store.EnabledFields") {
    			if(operation.getRecords()[0].data.field != "" && operation.getRecords()[0].data.fieldDescription != "")
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
        	if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Areas") {
        		var grid = Ext.getCmp("agencygrid");
        		this.proxy.setExtraParams({
        			idAgency : grid.getSelectionModel().getSelected().items[0].id
        		});
        	} 
        	/*else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Services") {
        		var grid = Ext.getCmp("servicesgrid");
        		var agencyGrid = Ext.getCmp("agencygrid");
        		//console.log(grid.getSelectionModel().getSelected().items[0].data);
        		this.proxy.setExtraParams({
        			idAgency : agencyGrid.getSelectionModel().getSelected().items[0].data.id
        		});
        	}*/
        	else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.CustomeHouses") {
    			
    			var usersAgenciesGrid = Ext.getCmp("usersagenciesgrid");
				var customehousesgrid = Ext.getCmp("customehousesgrid");
				var agenciesGrid = Ext.getCmp("agencycustomesgrid");
    			
    			this.proxy.setExtraParams({
    				idAgency : agenciesGrid.getSelectionModel().getSelected().items[0].data.id,
    				idUser : usersAgenciesGrid.getSelectionModel().getSelected().items[0].data.idUser,
    				idProfile : usersAgenciesGrid.getSelectionModel().getSelected().items[0].data.idProfile
        		});
        	}
        	else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Permissions") {
        		var grid = Ext.getCmp("profilesgrid");
        		this.proxy.setExtraParams({
        			id : grid.getSelectionModel().getSelected().items[0].data.id
        		});
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Fields") {
    			var agencyGrid = Ext.getCmp("agencygrid");
    			var servicesGrid = Ext.getCmp("servicesgrid");
    			var ServicesTypesGrid = Ext.getCmp("servicetypes");
    	
    			this.proxy.setExtraParams({
        			idAgency : agencyGrid.getSelectionModel().getSelected().items[0].data.id,
        			idService : servicesGrid.getSelectionModel().getSelected().items[0].data.id,
        			idServiceType : ServicesTypesGrid.getSelectionModel().getSelected().items[0].data.id
        		});
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.users.store.PermissionsUsers") {
                var grid = Ext.ComponentQuery.query("#usersgrid")[0];
                this.proxy.setExtraParams({
                	id : grid.getSelectionModel().getSelected().items[0].data.id
                });
            } else if(this.storeId == "Pemexmaoo.modules.catalogs.users.store.UserAreas") {
                var grid = Ext.getCmp("usersgrid");
                var agenciesGrid = Ext.ComponentQuery.query('#agenciesgrid')[0];
                
                var idAgency = (agenciesGrid.getSelectionModel().getSelected().items[0].id);
                        /*if(agenciesGrid.getSelectionModel().getSelected().items[0] == undefined){
                            idAgency = 1;
                        } else {
                            idAgency = (agenciesGrid.getSelectionModel().getSelected().items[0].data.id);
                        }
                        */
	    		this.proxy.setExtraParams({
	    			idUser : grid.getSelectionModel().getSelected().items[0].data.id,
	                idAgency : idAgency
	    		});
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.EnabledFields") {
        	
                var idAgency =  Ext.ComponentQuery.query("#agencycombo")[0].value;
    			var idService =  Ext.ComponentQuery.query("#servicecombo")[0].value;
    			var idServiceType =  Ext.ComponentQuery.query("#servicetypecombo")[0].value;
    			var phasesGrid = Ext.getCmp("phasesgrid");
    			var profilesGrid = Ext.getCmp("profilesgrid");
    			
    			this.proxy.setExtraParams({
    				idAgency : idAgency,
    				idService : idService,
    				idServiceType : idServiceType,
    				idPhase : phasesGrid.getSelectionModel().getSelected().items[0].data.id,
        			idProfile : profilesGrid.getSelectionModel().getSelected().items[0].data.id
        		});
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.UserDetails") {
        		var grid = Ext.getCmp("agencygrid");
        		var areasGrid = Ext.getCmp("areasgrid");
        		var idAreaValidation = (areasGrid.getSelectionModel().getSelected().items[0]);
        		
        		if(idAreaValidation == undefined){
        			idAreaV = 0;
        		} else {
        			idAreaV = areasGrid.getSelectionModel().getSelected().items[0].data.id
        		}
        		
        		this.proxy.setExtraParams({
        			idAgency : grid.getSelectionModel().getSelected().items[0].data.id,
        			idArea : idAreaV
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