var matcher = /^(")?(?:[^\."])(?:(?:[\.])?(?:[\w\-!#$%&'*+\/=?\^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/;
Ext.define("Ext.ux.SistemasCasa.BaseClasses.GridFieldSet", {
	extend: 'Ext.ux.SistemasCasa.BaseClasses.EditGrid',
	alternateClassName: 'SistemasCasa.GridFieldSet',
    requires: [
	       'Ext.data.*',
	       'Ext.util.*',
	       'Ext.state.*',
	       'Ext.form.*',
	       'Ext.panel.Panel',
	       'Ext.view.View',
	       'Ext.layout.container.Fit',
	       'Ext.toolbar.Paging',
	       'Ext.ux.CheckColumn',
	       'Ext.grid.property.Grid',
	       'Ext.form.field.ComboBox'
	   ],
    actionsUrl: null,
    editable: true,
    layout: 'fit',
    stateful: false,
    loadingMask: true,
    border: false,
    height: '100%',
    alias: "widget.gridfieldset",
    itemId : 'gridfieldset',
    columns: {},
    dockedItems : {},
    store : null,
    padding: "0 0 0 0",
    
    listeners: {
    	focus: function(grid, e, eOpts){ 
    		var fieldset = grid.up('fieldset');
    		fieldset.setTitle(fieldset.newTitle);
    		fieldset.getEl().dom.style.border = 'solid 1px #3892d4';   
    		fieldset.getEl().dom.style.backgroundColor = '#9ec7ea'; 
    	},
    	
    	itemmousedown: function(grid, e, eOpts){ 
    		var fieldset = grid.up('fieldset');
    		
    		fieldset.setTitle(fieldset.newTitle);
    		fieldset.getEl().dom.style.border = 'solid 1px #3892d4';   
    		fieldset.getEl().dom.style.backgroundColor = '#9ec7ea'; 
    	},
    	
    	focusleave: function (grid, event, eOpts) {
    		var fieldset = grid.up('fieldset');
    		var componentFocused = Ext.get(Ext.Element.getActiveElement());
    		element = componentFocused.dom.id;
    		if(!/button/.test(element))
    		{
    			fieldset.setTitle(fieldset.originalTitle);
                fieldset.getEl().dom.style.border = 'solid 1px #cfcfcf';
        		fieldset.getEl().dom.style.background = 'transparent'; 
    		}
    	},
    	
    	containerclick: function(container, e, eOpts){ 
    		var fieldset = container.up('fieldset');
    		fieldset.setTitle(fieldset.newTitle);
    		fieldset.getEl().dom.style.border = 'solid 1px #3892d4'; 
    		fieldset.getEl().dom.style.backgroundColor = '#9ec7ea'; 
    	},
    	
    	headerclick : function (header, column, e, t, eOpts){
    		var fieldset = header.up('fieldset');
    		fieldset.setTitle(fieldset.newTitle);
    		fieldset.getEl().dom.style.border = 'solid 1px #3892d4';   
    		fieldset.getEl().dom.style.backgroundColor = '#9ec7ea'; 
    	}
    },
    
    /**
    * @function    initComponent
    * @description this function gives the available tags which are shown in the searching grid
    * @returns     undefined
    **/
    initComponent: function() {
        var me = this;
        
        if(this.editable) {
            me.plugins = [Ext.create("Ext.grid.plugin.CellEditing", {
                clicksToMoveEditor: 1,
                autoCancel: false
            })];
            
        }
        
        me.callParent();
    },

  	
});




