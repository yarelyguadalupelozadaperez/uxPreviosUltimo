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
	pageSize    : 500,
	
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
        	} 
        	else if(this.storeId == "Pemexmaoo.modules.operations.consolidated.store.CustomeHouses") {
        		var customehousesgrid 	= Ext.ComponentQuery.query('#customehousesgrid')[0],
        		 invoicesgrid 			= Ext.ComponentQuery.query('#invoicesgrid')[0],
        		 totalQuantity  		= Ext.ComponentQuery.query('#totalQuantity')[0].value,
        		 totalValue				= Ext.ComponentQuery.query('#totalValue')[0].value;
        		 customehousesgrid.store.reload();
        		
        		if(customehousesgrid.getStore().totalCount > 0) {
           		 	 var data 		= customehousesgrid.getStore().data.items;
		    		 var tmp 		= 0;
		    		 var tmp_cant 	= 0,
		    		 tmp_val 		= 0;
		    		 
		    		 Ext.each(data, function (rec) {
	    				edu_cant = rec.data.edu_cant;
	    				adu_val  = rec.data.adu_val;
	    				tmp_cant = tmp_cant + edu_cant;
	    				tmp_val  = tmp_val  + adu_val;
	    			 });
	    			 
		    		 if(tmp_cant > 0)
	    				saldoDisponible = totalQuantity - tmp_cant;
	    			 else
	    				 saldoDisponible = totalQuantity;
	    			 
	    			 if(tmp_val > 0)
	    				valorDisponible = totalValue - tmp_val;
	    			 else
	    				valorDisponible = totalValue;
	    			 
	    			 Ext.ComponentQuery.query('#saldoDisponibleAduana')[0].setValue(saldoDisponible);
	    			 Ext.ComponentQuery.query('#saldoValorDisponibleAduana')[0].setValue(valorDisponible);
	    			 Ext.ComponentQuery.query('#orden_totalcantsaldo')[0].setValue(tmp_cant);
		    		 Ext.ComponentQuery.query('#orden_totalvalorsaldo')[0].setValue(tmp_val);
		    		 
           	 	}
        	
            } else if(this.storeId == "Pemexmaoo.modules.operations.consolidated.store.Invoices") {
        		var invoicesgrid 		= Ext.ComponentQuery.query('#invoicesgrid')[0],
        		customehousesgrid 		= Ext.ComponentQuery.query('#customehousesgrid')[0],
        		edu_cant                = customehousesgrid.selection.data.edu_cant,
           	 	adu_val					= customehousesgrid.selection.data.adu_val;
        		invoicesgrid.store.reload();
        		
        		if(invoicesgrid.getStore().totalCount > 0) {
        			Ext.Ajax.request({
	   		             url: "consolidated/index/updatetotalweight",
	   		             params: {
	   		            	 id_orden : Ext.ComponentQuery.query('#id_orden')[0].value
	   		             }, success: function (conn, response, options, eOpts) {
	   		    		    var responseObj = Ext.JSON.decode(conn.responseText);
	   		    		    console.log(responseObj.data);
	   		    		    Ext.ComponentQuery.query('#merchandiseTotal')[0].setValue(responseObj.data);
	   		             }
	   		         });
        			
           		 	 var data 		= invoicesgrid.getStore().data.items;
		    		 var tmp 		= 0;
		    		 var tmp_cant 	= 0,
		    		 tmp_val 		= 0;
		    		 
		    		 Ext.each(data, function (rec) {
             			reme_cant = rec.data.reme_cant;
             			reme_val  = rec.data.reme_val;
             			tmp_cant  = tmp_cant + reme_cant;
             			tmp_val   = tmp_val  + reme_val;
             		 });
	    			 
		    		 if(tmp_cant > 0)
         				saldoDisponible = edu_cant - tmp_cant;
         			 else
         				saldoDisponible = edu_cant;
	    			 
		    		 if(tmp_val > 0)
     					valorDisponible = adu_val - tmp_val;
     				 else
     					valorDisponible = adu_val;
         			 
         			 Ext.ComponentQuery.query('#saldoDisponibleFactura')[0].setValue(saldoDisponible);
         			 Ext.ComponentQuery.query('#saldoValorDisponibleFactura')[0].setValue(valorDisponible);
           	 	}
        	
            } 
            else if(this.storeId == "Pemexmaoo.modules.operations.consolidated.store.Items") {
        		
	            	 var itemsgrid 	= Ext.ComponentQuery.query('#itemsgrid')[0],
	            	 customehousesgrid 	= Ext.ComponentQuery.query('#customehousesgrid')[0],
	            	 data			= itemsgrid.getStore().data.items,
	            	 invoicesgrid   = Ext.ComponentQuery.query('#invoicesgrid')[0]
	         		 reme_cant      = invoicesgrid.selection.data.reme_cant,
	          	     reme_val       = invoicesgrid.selection.data.reme_val,
	         		 tmp_cant       = 0,
	         		 tmp_val        = 0;
	         		
	         		 Ext.each(data, function (rec) {
	         			can_mercfact = rec.data.can_mercfact;
	         			mer_val  = rec.data.mer_val;
	         			tmp_cant = tmp_cant + can_mercfact;
	         			tmp_val  = tmp_val  + mer_val;
	         		 });
	         		 
	         		 if(tmp_cant > 0)
	     				saldoDisponible = reme_cant - tmp_cant;
	     			 else
	     				saldoDisponible = reme_cant;
	     			 
	     			 if(tmp_val > 0)
	 					valorDisponible = reme_val - tmp_val;
	 				 else
	 					valorDisponible = reme_val;
	     			 
	     			 Ext.ComponentQuery.query('#saldoDisponibleItem')[0].setValue(saldoDisponible);
	     			 Ext.ComponentQuery.query('#saldoValorDisponibleItem')[0].setValue(valorDisponible);
	     			 itemsgrid.store.reload();
	     			 
	     			invoicesgrid.store.load ({
  	            		 params : {
	   	            		 id_ordenesAdu  : customehousesgrid.selection.data.id_ordenesAdu,
	   	            		 id_orden 		: Ext.ComponentQuery.query('#id_orden')[0].value
  	            		 },
  	            	});
            	
            } 
            else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.UsersCustomeHouse") {
                this.load();
            }
            else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.CustomeHouses") {
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
	        		var grid = Ext.ComponentQuery.query("#agencygrid")[0];
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
        		if(options.update) {
	        		var grid = Ext.ComponentQuery.query("#agencygrid")[0];
	        		this.proxy.setExtraParams({
	        			idAgency : grid.getSelectionModel().getSelected().items[0].id
	        		});
        		}
        	} 
        	else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.CustomeHouses") {
    			
    			var usersAgenciesGrid 	= Ext.ComponentQuery.query("#usersagenciesgrid")[0],
				customehousesgrid 		= Ext.ComponentQuery.query("#customehousesgridCatalog")[0],
				agenciesGrid 			= Ext.ComponentQuery.query("#agencycustomesgrid")[0];
    			
    			this.proxy.setExtraParams({
    				idAgency 	: agenciesGrid.getSelectionModel().getSelected().items[0].data.id,
    				idUser 		: usersAgenciesGrid.getSelectionModel().getSelected().items[0].data.idUser,
    				idProfile 	: usersAgenciesGrid.getSelectionModel().getSelected().items[0].data.idProfile
        		});
    			
        	}
        	else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Permissions") {
        		
        		var grid = Ext.ComponentQuery.query("#profilesgrid")[0];
        		this.proxy.setExtraParams({
        			id : grid.getSelectionModel().getSelected().items[0].data.id
        		});
        		
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Fields") {
        		
    			var agencyGrid 		= Ext.ComponentQuery.query("#agencygrid")[0],
    			servicesGrid 		= Ext.ComponentQuery.query("#servicesgrid")[0],
    			ServicesTypesGrid 	= Ext.ComponentQuery.query("#servicetypes")[0];
    	
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
            	
                var grid 		= Ext.ComponentQuery.query("#usersgrid")[0],
                agenciesGrid 	= Ext.ComponentQuery.query('#agenciesgrid')[0],
                idAgency 		= agenciesGrid.getSelectionModel().getSelected().items[0].id;
                
	    		this.proxy.setExtraParams({
	    			idUser : grid.getSelectionModel().getSelected().items[0].data.id,
	                idAgency : idAgency
	    		});
	    		
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.EnabledFields") {
        	
                var idAgency 	=  Ext.ComponentQuery.query("#agencycombo")[0].value,
    			idService 		=  Ext.ComponentQuery.query("#servicecombo")[0].value,
    			idServiceType 	=  Ext.ComponentQuery.query("#servicetypecombo")[0].value,
    			phasesGrid 		= Ext.ComponentQuery.query("#phasesgrid")[0],
    			profilesGrid 	= Ext.ComponentQuery.query("#profilesgrid")[0];
    			
    			this.proxy.setExtraParams({
    				idAgency : idAgency,
    				idService : idService,
    				idServiceType : idServiceType,
    				idPhase : phasesGrid.getSelectionModel().getSelected().items[0].data.id,
        			idProfile : profilesGrid.getSelectionModel().getSelected().items[0].data.id
        		});
    			
        	} else if(this.storeId == "Pemexmaoo.modules.catalogs.masters.store.UserDetails") {
        		
        		var grid 			= Ext.ComponentQuery.query("#agencygrid")[0],
        		areasGrid 			= Ext.ComponentQuery.query("#areasgrid")[0],
        		idAreaValidation 	= areasGrid.getSelectionModel().getSelected().items[0];
        		
        		if(idAreaValidation == undefined)
        			idAreaV = 0;
        		else 
        			idAreaV = areasGrid.getSelectionModel().getSelected().items[0].data.id
        		
        		this.proxy.setExtraParams({
        			idAgency : grid.getSelectionModel().getSelected().items[0].data.id,
        			idArea : idAreaV
        		});
        		
        	} else if (this.storeId == "Pemexmaoo.modules.catalogs.masters.store.UsersCustomeHouse") {
        		
        		if(options.update) {
        			var customeHousesGrid 	= Ext.ComponentQuery.query('#customehousesgridCatalog')[0];
        			this.proxy.setExtraParams({
        				idCustomeHouse : customeHousesGrid.getSelectionModel().getSelected().items[0].data.id
            		});
        		}
        		
        	} else if(this.storeId == "Pemexmaoo.modules.operations.consolidated.store.CustomeHouses") {
        		
        		if(options.update) {
        		        			
        			if(options.update[0].previousValues.edu_cant !=  undefined ||  options.update[0].previousValues.adu_val != undefined ) {      			
	        			 var customehousesgrid  = Ext.ComponentQuery.query('#customehousesgrid')[0],
	        			 totalQuantity  		= Ext.ComponentQuery.query('#totalQuantity')[0].value,
	        	    	 totalValue				= Ext.ComponentQuery.query('#totalValue')[0].value,
	        	    	 data 					= customehousesgrid.getStore().data.items,
	        			 tmp 					= 0;
	        			 tmp_cant 				= 0,
			    		 tmp_val 				= 0;
		    			
		    			 Ext.each(data, function (rec) {
		    				edu_cant = rec.data.edu_cant;
		    				adu_val  = rec.data.adu_val;
		    				tmp_cant = tmp_cant + edu_cant;
		    				tmp_val  = tmp_val  + adu_val;
		    			 });
	        			         			     	 
	        	    	 if(options.update[0].previousValues.edu_cant !=  undefined) {
	        	    		 var field 	= 'Cantidad/Volumen Total',
	        	    		 fieldGrid 	= 'Cantidad/Volumen',
	        	    		 total 		= totalQuantity,
	        	    		 tmp		= tmp_cant,
	        	    		 value 		= options.update[0].data.edu_cant;
	        	    	 }
	        	    	 
	        			 if(options.update[0].previousValues.adu_val != undefined) {
	        				 var field 	= 'Valor Total',
	        				 fieldGrid 	= 'Valor Parcial',
	        				 total 		= totalValue,
	        				 tmp		= tmp_val,
	        				 value 		= options.update[0].data.adu_val;
	        			 }
	        			 
	        			 if(value > total) {
	        				 Ext.Msg.alert("Aviso!!!", ("El valor ingresado <b> " + value + " </b> en el campo<b> " + fieldGrid + "</b> <br> Rebasa el valor total <b> " + total + " </b> del campo <b> " + field + " </b>"));
	        				 return false;
	        			 }
	        			 
	        			 if(tmp > total) {
	        				 Ext.Msg.alert("Aviso!!!", ("La suma total <b> " + tmp + " </b> de la columna <b> " + fieldGrid + " </b><br>es mayor al valor permitido: <b> " + total + " </b> del campo <b> " + field + " </b>"));
			       			 return false;
			       		 }
        			}
        		}
        		 
        	}
        	else if(this.storeId == "Pemexmaoo.modules.operations.consolidated.store.Invoices") {
        	//console.log(options.update[0].data);
        		if(options.update) {
        			/*if(options.update[0].data.weightTotalInvoice > 0 ) {
        				 Ext.Ajax.request({
        		             url: "consolidated/index/updatetotalweight",
        		             params: {
        		            	 id_orden : Ext.ComponentQuery.query('#id_orden')[0].value
        		             }, success: function (conn, response, options, eOpts) {
        		    		    var responseObj = Ext.JSON.decode(conn.responseText);
        		    		    console.log(responseObj.data);
        		    		    Ext.ComponentQuery.query('#merchandiseTotal')[0].setValue(responseObj.data);
        		             }
        		         });
        			}*/
        			
        			if(options.update[0].previousValues.reme_cant !=  undefined ||  options.update[0].previousValues.reme_val != undefined ) {      			
	        			 var invoicesgrid 		= Ext.ComponentQuery.query('#invoicesgrid')[0],
	        			 customehousesgrid      = Ext.ComponentQuery.query('#customehousesgrid')[0],
	        			 edu_cant               = customehousesgrid.selection.data.edu_cant,
	        	    	 adu_val				= customehousesgrid.selection.data.adu_val,
	        	    	 data 					= invoicesgrid.getStore().data.items,
	        			 tmp 					= 0;
	        			 tmp_cant 				= 0,
			    		 tmp_val 				= 0;
		    			
	        			 Ext.each(data, function (rec) {
                 			reme_cant = rec.data.reme_cant;
                 			reme_val  = rec.data.reme_val;
                 			tmp_cant  = tmp_cant + reme_cant;
                 			tmp_val   = tmp_val  + reme_val;
                 		 });
	        			         			     	 
	        	    	 if(options.update[0].previousValues.reme_cant !=  undefined) {
	        	    		 var field 	= 'Cantidad/Volumen de Aduana',
		            		 fieldGrid 	= 'Cantidad/Volumen de Factura',
		            		 total 		= edu_cant,
	        	    		 tmp		= tmp_cant,
	        	    		 value 		= options.update[0].data.reme_cant;
	        	    	 }
	        	    	 
	        	    	 if(options.update[0].previousValues.reme_val != undefined) {
	        	    		 var field 	= 'Valor Parcial de Aduana',
	                		 fieldGrid 	= 'Valor Parcial de Factura',
	                		 total 		= adu_val,
	        				 tmp		= tmp_val,
	        				 value 		= options.update[0].data.reme_val;
	        			 }
	        	    		        			 
	        			 if(value > total) {
	        				 Ext.Msg.alert("Aviso!!!", ("El valor ingresado <b> " + value + " </b> en el campo<b> " + fieldGrid + "</b> <br> Rebasa el valor total <b> " + total + " </b> del campo <b> " + field + " </b>"));
	        				 return false;
	        			 }
	        			 
	        			 if(tmp > total) {
	        				 Ext.Msg.alert("Aviso!!!", ("La suma total <b> " + tmp + " </b> de la columna <b> " + fieldGrid + " </b><br>es mayor al valor permitido: <b> " + total + " </b> del campo <b> " + field + " </b>"));
			       			 return false;
			       		 }
        			}
        		} else 
        			if (options.destroy) {
        				var grid      = Ext.ComponentQuery.query('#customehousesgrid')[0];
        				this.proxy.setExtraParams({
        					id_ordenesAdu : grid.getSelectionModel().getSelected().items[0].data.id_ordenesAdu
                		});
        			}
        		 
        	}
        	else if(this.storeId == "Pemexmaoo.modules.operations.consolidated.store.Items") {
        		
        		if(options.update) {
        			if(options.update[0].previousValues.mer_val !=  undefined ||  options.update[0].previousValues.can_mercfact != undefined ) {      			
	        			 var itemsgrid 			= Ext.ComponentQuery.query('#itemsgrid')[0],
	        			 customehousesgrid      = Ext.ComponentQuery.query('#customehousesgrid')[0],
	        			 invoicesgrid 			= Ext.ComponentQuery.query('#invoicesgrid')[0],
	        			 reme_cant				= invoicesgrid.selection.data.reme_cant,
	                	 reme_val				= invoicesgrid.selection.data.reme_val,
	        	    	 data 					= itemsgrid.getStore().data.items,
	        			 tmp 					= 0;
	        			 tmp_cant 				= 0,
			    		 tmp_val 				= 0;
		    			
	        			 Ext.each(data, function (rec) {
                			can_mercfact = rec.data.can_mercfact;
                			mer_val  = rec.data.mer_val;
                			tmp_cant = tmp_cant + can_mercfact;
                			tmp_val  = tmp_val  + mer_val;
                		 });
	        			         			     	 
	        	    	 if(options.update[0].previousValues.can_mercfact !=  undefined) {
	        	    		 var field 	= 'Cantidad/Volumen de Factura',
	                		 fieldGrid 	= 'Cantidad/Volumen de Mercanc&iacute;a',
	                		 total 		= reme_cant,
	        	    		 tmp		= tmp_cant,
	        	    		 value 		= options.update[0].data.can_mercfact;
	        	    	 }
	        	    	 
	        	    	 if(options.update[0].previousValues.mer_val != undefined) {
	        	    		 var field 	= 'Valor Parcial de Factura',
	                		 fieldGrid 	= 'Valor Parcial de Mercanc&iacute;a',
	                		 total 		= reme_val,
	        				 tmp		= tmp_val,
	        				 value 		= options.update[0].data.mer_val;
	        			 }
	        	    		        			 
	        			 if(value > total) {
	        				 Ext.Msg.alert("Aviso!!!", ("El valor ingresado <b> " + value + " </b> en el campo<b> " + fieldGrid + "</b> <br> Rebasa el valor total <b> " + total + " </b> del campo <b> " + field + " </b>"));
	        				 return false;
	        			 }
	        			 
	        			 if(tmp > total) {
	        				 Ext.Msg.alert("Aviso!!!", ("La suma total <b> " + tmp + " </b> de la columna <b> " + fieldGrid + " </b><br>es mayor al valor permitido: <b> " + total + " </b> del campo <b> " + field + " </b>"));
			       			 return false;
			       		 }
        			}
        		} else 
        			if (options.destroy) {
        				var grid      = Ext.ComponentQuery.query('#invoicesgrid')[0];
        				this.proxy.setExtraParams({
        					idOrdenReme : grid.getSelectionModel().getSelected().items[0].data.idOrdenReme,
                		});
        			}
        		 
        	} 
        	else if (this.storeId == "Pemexmaoo.modules.operations.consolidated.store.DinamicFields") {
        		
        		if(options.update) {
        			var operatingCommand 	= Ext.ComponentQuery.query('#operatingCommand')[0].value;
        			this.proxy.setExtraParams({
        				id_dinamic_field : options.update[0].data.id_dinamic_field
            		});
        		}
        		
        	} else if (this.storeId == "Pemexmaoo.modules.operations.consolidated.store.Fractions"){
        		console.log("hola");
        	}
        	else if (this.storeId == "Pemexmaoo.modules.operations.consolidated.store.Providers") {
        		
        		var typeOperation 		= Ext.ComponentQuery.query('#searchImpExp')[0].store.findRecord('abbr', Ext.ComponentQuery.query('#searchImpExp')[0].value);
    			this.proxy.setExtraParams({
    				typeOperation : typeOperation
        		});
    			
        	}
        	else if (this.storeId == "Pemexmaoo.modules.catalogs.masters.store.Agencies") {
        		if(options.update) {
            		var grid = Ext.ComponentQuery.query("#agencygrid")[0];
            		this.proxy.setExtraParams({
            			idAgency : grid.getSelectionModel().getSelected().items[0].data.id
            		});
            	} else {
            		this.proxy.setExtraParams();
            	}
        	}
        	else {
        		
        		try {
            		if(options.update[0].previousValues.selected != undefined) {
                		var grid = Ext.ComponentQuery.query("#agencygrid")[0];
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