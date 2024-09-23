/**
 * @class Ext.ux.SistemasCasa.BaseClasses.MessageBox
 * @extends Ext.Msg
 * @autor Crysfel Villa
 * @date Fri Jul 29 10:15:49 CDT 2011
 *
 * Base class for WindowsHelp
 *
 *
 **/

Ext.define('Ext.ux.SistemasCasa.BaseClasses.WindowsHelp',{
	extend 				: 'Ext.window.Window',
	alternateClassName	: 'SistemasCasa.WindowsHelp',
	title: 'WindowsHelp',
    height: 400,
    width: 500,
    focusOnToFront: true,
    layout: 'fit',
    modal: true,
    maximizable: true,
    autoShow: true,
    rootEl: null,
    nameField: null,
    idTargetField: 0,
    view: null,
    scheme: null,
    catalogClient: false,
    flexColumns: [],
    
    matchvalue: function (value) {
    	var searching = Ext.getCmp('searchWindowHelp').value; 
    	
    	if(searching != '') {
    		if(!Ext.isNumeric(value)) {
    			var newValue = value.replace(new RegExp(searching,"gi"), '<mark class="x-livesearch-match">$&</mark>');
        		return newValue;
    		} else {
    			return value;
    		}    		
    	} else {
    		return value;
    	}
    },
    
    listeners: {
    	beforerender: function (window , eOpts ) {
    		var me = this, 
    			grid = window.items.items[0];
    		
    		Ext.Ajax.request({
    			method: 'GET',
                url: 'application/index/getview',
                params: {
                    view: me.view,
                    scheme: me.scheme,
                    catalogClient: me.catalogClient
                },
                success: function (response) {
                    var gridConfig = Ext.JSON.decode(response.responseText);
                    
                    var store = {
                		autoLoad: false,
        	        	fields: gridConfig.fields,
        	            data: gridConfig.data,
        	            proxy: {
        	                type: 'ajax',
        	                url: 'application/index/getview',
        	                extraParams: {
        	                    view: me.view,
        	                    scheme: me.scheme,
        	                    catalogClient: me.catalogClient
        	                },
        	                reader: {
        	                    type: 'json',
        	                    rootProperty: 'data'
        	                }
        	            },
        	            
        	            listeners: {
        	            	load: function () {
        	            		grid.getSelectionModel().select(0, true);
        	            		grid.getView().focusRow(0,100);
        	            	}
        	            }
        	        };
                    
                    var columns = Array();
                    var counter = 0;
                    
                    Ext.Array.each(gridConfig.columns, function(column, index) {
                    	columns.push(
                			{
                				text: column.text, 
                				dataIndex: column.dataIndex, 
                				flex: (me.flexColumns[index] === undefined ? 1 : me.flexColumns[index]),
                				autoSizeColumn: true,
                				hidden: (column.hidden === undefined ? false : column.hidden),
                				renderer: me.matchvalue,
                				cellWrap: true
            				}
            			); 
        		    });
                    
                    grid.reconfigure(store, columns);
                    
                    var count = grid.getStore().count();
                    
    				Ext.get('toolbarWindowHelp').dom.innerHTML = count + ' registro' + (count == 1 ? '' : 's');
                    
                },
                
                failure: function (response) {
                    EDespacho.Msg.alert(response.message);
                }
            });
    	}, 
    },
    
    initComponent	: function() {
        var me = this;
        
        me.items = [{
			xtype: 'grid',
	        border: false,
	        loadMask: true,
	        stateful: false,
	        autoScroll: true,
	        loadMask: true,
	        bufferedRenderer: true,
	        
	        listeners: {
	        	itemdblclick: function (grid ,record, item, index, e, eOpts) {
	        		var newValue = record.get(me.nameField);		        		
	        		
	        		try {
	        			var originalGrid = me.rootEl.up('grid').getView(),
	        				selectedModel = originalGrid.getSelectionModel().getSelection()[0],
	        				flag = true;
	        			
        				selectedModel.set(originalGrid.getLastFocused().column.dataIndex, newValue);
		                selectedModel.set(me.idTargetField, record.data.id);
		                
	        			Ext.Array.each(originalGrid.columns, function(column) {
	        				if(column.field != undefined) {
	        					if(column.field.allowBlank == false && 
        						   selectedModel.get(column.field.dataIndex) == '') {
	        						flag = false
	        					}
	        				}
	        		    });
	        			
	        			if(flag && originalGrid.getLastFocused().record.data.id == 0) {
	        				originalGrid.getStore().sync();
	        				originalGrid.getStore().load();
	        			}
	        			
	        			if(originalGrid.getLastFocused().record.data.id >0) {
	        				originalGrid.getStore().sync();
	        			}
	        			
	        			var editPlugin = originalGrid.editingPlugin;
                        var curRow = editPlugin.context.rowIdx;
				        var curCol = editPlugin.context.colIdx;
				        editPlugin.startEdit(curRow, curCol + 1);
	        			
	        		} catch (e) {
	        			Ext.getCmp(me.rootEl.id).setValue(newValue);
	        			Ext.getCmp(me.idTargetField).setValue(record.data.id);
	        			Ext.getCmp(me.rootEl.id).clearInvalid();
	        			if(Ext.getCmp(me.rootEl.id).nextSibling('field') != null) {
	        				Ext.getCmp(me.rootEl.id).nextSibling('field').focus();
	        			}
	        		}	        		
	        		
	        		me.close();
	        	},
	        	
	        	rowkeydown: function (grid ,record, item, index, e, eOpts) {
	        		if (e.getKey() == e.ENTER) {
	        			var newValue = record.get(me.nameField);		        		
		        		
		        		try {
		        			var originalGrid = me.rootEl.up('grid').getView(),
		        				selectedModel = originalGrid.getSelectionModel().getSelection()[0],
		        				flag = true;
		        			
	        				selectedModel.set(originalGrid.getLastFocused().column.dataIndex, newValue);
			                selectedModel.set(me.idTargetField, record.data.id);
			                
		        			Ext.Array.each(originalGrid.columns, function(column) {
		        				if(column.field != undefined) {
		        					if(column.field.allowBlank == false && 
	        						   selectedModel.get(column.field.dataIndex) == '') {
		        						flag = false
		        					}
		        				}
		        		    });
		        			
		        			if(flag && originalGrid.getLastFocused().record.data.id == 0) {
		        				originalGrid.getStore().sync();
		        				originalGrid.getStore().load();
		        			}
		        			
		        			if(originalGrid.getLastFocused().record.data.id >0) {
		        				originalGrid.getStore().sync();
		        			}
		        			
		        			var editPlugin = originalGrid.editingPlugin;
	                        var curRow = editPlugin.context.rowIdx;
					        var curCol = editPlugin.context.colIdx;
					        editPlugin.startEdit(curRow, curCol + 1);
		        			
		        		} catch (e) {
		        			Ext.getCmp(me.rootEl.id).setValue(newValue);
		        			Ext.getCmp(me.idTargetField).setValue(record.data.id);
		        			Ext.getCmp(me.rootEl.id).clearInvalid();
		        			if(Ext.getCmp(me.rootEl.id).nextSibling('field') != null) {
		        				Ext.getCmp(me.rootEl.id).nextSibling('field').focus();
		        			}
		        		}	        		
		        		
		        		me.close();
	        		}
                }
	        },
	        
	        columns: [{ text: 'Nombre', dataIndex: 'name', autoSizeColumn : true }],
	              
			store: {
				fields:[ 'name'],
				data: [{ name: '' }]
			},
			
			dockedItems: [{
                xtype: 'toolbar',
                border: false,
                items: [{
                    xtype: 'toolbar',
                    ui: 'plain',
                    dock: 'bottom',
                    items: [{
                        xtype:'label',
                        text: 'Buscar:',
                    },{
        	        	xtype: 'textfield',
        	        	id: 'searchWindowHelp',
        	        	width: 400,
        	        	enableKeyEvents: true,
        	        	listeners: {
        	        		afterrender: function (field, e) {
        	        			setTimeout(function() {
        	        				field.focus();
        	        			}, 200);
        		        	},
        		        	
        	        		keydown: function (field, e) {
        	        			if(e.getKey() == e.ENTER) {
    	        					var grid = field.up('grid');
        	                    	
        	    	                this.focus();
        	    	                grid.getStore().load({
        	    	                	params: {
        	    	                		query: field.value
        	    	                	}
         	    	                });
        	    	                
        	    	                setTimeout(function() {
	        	    	                var count = grid.getStore().count();
	        		    				Ext.get('toolbarWindowHelp').dom.innerHTML = count + ' registro' + (count == 1 ? '' : 's');
        	    	                }, 700);
        	        			}
        	        		}
        	        	},
         	            triggers: {
         	            	search: {
        	                    cls: 'x-form-search-trigger',
        	                    handler: function(field) {
        	                    	var grid = field.up('grid');
        	                    	
        	    	                this.focus();
        	    	                grid.getStore().load({
        	    	                	params: {
        	    	                		query: field.value
        	    	                	}
         	    	                });
        	    	                
        	    	                setTimeout(function() {
	        	    	                var count = grid.getStore().count();
	        		    				Ext.get('toolbarWindowHelp').dom.innerHTML = count + ' registro' + (count == 1 ? '' : 's');
        	    	                }, 700);
        	                    }
        	                },
        	                
         	                clean: {
         	                    cls: 'x-form-clear-trigger',
         	                    handler: function(field) {
         	                    	var grid = field.up('grid');
         	                    	this.reset();
         	    	                this.focus();
         	    	                grid.getStore().load();
         	    	                
         	    	               setTimeout(function() {
	        	    	                var count = grid.getStore().count();
	        		    				Ext.get('toolbarWindowHelp').dom.innerHTML = count + ' registro' + (count == 1 ? '' : 's');
         	    	               }, 700);
         	                    }
         	                },
         	            }
        	        }]
                }]
            },{
            	xtype: 'toolbar',
            	dock: 'bottom',
            	items: [{
                    xtype:'label',
                    html: '<div style="float: left;" id="toolbarWindowHelp">&nbsp;</div>',
                }]
            }],
		}];
        
		me.callParent();
    },
    
});