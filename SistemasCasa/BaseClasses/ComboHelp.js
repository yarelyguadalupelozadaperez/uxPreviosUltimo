/**
 * @class Ext.ux.SistemasCasa.BaseClasses.MessageBox
 * @extends Ext.Msg
 * @autor Crysfel Villa
 * @date Fri Jul 29 10:15:49 CDT 2011
 *
 * Base class for MessageBox
 *
 *
 **/

Ext.define('Ext.ux.SistemasCasa.BaseClasses.ComboHelp',{
	extend 				: 'Ext.form.field.ComboBox',
	alternateClassName	: 'SistemasCasa.ComboHelp',
	alias				: 'widget.combohelp',
	
	typeAhead: true,
    hideTrigger: false,
    allowBlank: false,
    forceSelection: true,
    minChars: 2,
    lazyRender: true,
    triggerAction: 'all',
    autoSelect: true,
    listConfig: {
        loadingText: 'Buscando...',
        emptyText: 'Sin coincidencias...'
    },
    
    id: null,
    name: null,
    store: null,
    displayField: null,
    valueField: null,
    enableKeyEvents: true,
    configWindowF3: null,
    //triggerCls: 'fa fa-shield',
    triggers: {
	    clean: {
	    	cls: 'x-fa fa-wpforms',
	        handler: function(field, trigger, e) {
				field.configWindowF3.rootEl = field;
				var window = Ext.create('SistemasCasa.WindowsHelp', field.configWindowF3);
	        }
	    }
	},
	
    listeners: {
    	change: function (field , newValue , oldValue , eOpts) {
    		try {
    			var selectedModel = this.up('grid').getSelectionModel().getSelection()[0];
    			selectedModel.set(field.configWindowF3.idTargetField, field.selection.data.id);
    		} catch (e) {
    			if(Ext.getCmp(field.configWindowF3.idTargetField).value !== undefined) 
    				Ext.getCmp(field.configWindowF3.idTargetField).value = field.value;
    		}
    	},
    	
    	select: function (field, record, eOpts){
    		try {
    			var editPlugin = this.up('grid').editingPlugin;
                var curRow = editPlugin.context.rowIdx;
		        var curCol = editPlugin.context.colIdx;
		        
		        setTimeout(function () { 
		        	editPlugin.startEdit(curRow, curCol + 1);
				}, 200);

    		} catch (e) {
    			setTimeout(function () { 
    				field.nextSibling('field').focus();
				}, 200);
    		}
    	},
    	
    	keydown: function (field, e, eOpts) {
			if (e.getKey() === e.F3) {
				field.configWindowF3.rootEl = field;
				var window = Ext.create('SistemasCasa.WindowsHelp', field.configWindowF3);
			}
		}
    },
    
    initComponent	: function() {
        var me = this;
        
        me.id
        
        me.valueField = me.displayField;
        
		me.callParent();
    },
    
});
