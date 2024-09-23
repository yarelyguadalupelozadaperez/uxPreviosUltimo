/**
 *
 * This example shows how to create a pivot grid and display the results in
 * an outline layout.
 *
 */
Ext.define('Ext.ux.SistemasCasa.Reportes.view.ReporteGrid', {
    extend: 'Ext.pivot.Grid',
    xtype: 'outline-pivot-grid',

    title		: 'Información General',
    width		: "100%",
    height		: 352,
    collapsible	: false,
    multiSelect	: true,
    border 		: false,

    selModel: {
        type: 'rowmodel'
    },

    /*var font 			= '<span style="font-size: 14px; line-height: normal; color:#0B3861"><center>',
	var fontEnd 		= "</center></span>",
	var backgroundColor = "#ededed",*/


    startRowGroupsCollapsed: false,
    matrix: {
        type	: 'local',
        store	: [],
        viewLayoutType: 'tabular',
        aggregate: [{
            dataIndex	: 'cantidad',
            header		: '<font color="#496177";>Operaciones</font>',
            style		: {background: "#ededed"},
            renderer	: Ext.util.Format.numberRenderer('0,000'),
            aggregator	: 'sum',
            sortable 	: true,
            direction 	: "ASC",
        }/*,{
        	dataIndex	: 'cantidad',
        	header		: '<font color="#496177";>Cantidad</font>',
        	hidden		:	true
        	//width		: "25%",
        	//flex : 0.5
        }*/
        ],

        leftAxis: [{
        	dataIndex	: 'dato',
        	//header		: '<font color="#496177"; >Aduana</font>',
        	//width		: "25%",
        	flex : 0.25
        },{
            dataIndex	: 'tipo',
            header		: '<font color="#496177"; >Tipo</font>',
            //width		: "25%",
            //flex : 0.25
        }]
    },

    rendererpivot : function () {
    	console.log("rendererpivot");
    },

    listeners: {
        pivotgroupexpand: function(matrix, type, group){
            Ext.log( (group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
        },

        pivotgroupcollapse: function(matrix, type, group){
            Ext.log( (group ? 'Group "' + group.name + '" collapsed on ' : 'All groups expanded on ') + type);
        }
    }
});
