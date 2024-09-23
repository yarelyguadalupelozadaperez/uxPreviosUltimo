
Ext.Loader.setPath('Ext.ux', '../ux');

Ext.define('Ext.ux.SistemasCasa.storeGrid.Reports', {
    extend: "Ext.data.Store",
    model: [],
  	autoLoad	: false,
	autoSync	: false,
	pageSize    : 100,

    constructor: function(config) {
        Ext.applyIf(config, {
            proxy: this.createProxy()
        });
        this.callParent([config]);
    },
    
    createProxy: function() {
        return {
        	type: 'ajax',
        	url: "reports/index/getdataview",
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
});