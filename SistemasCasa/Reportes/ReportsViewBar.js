Ext.define('Ext.ux.SistemasCasa.Reportes.ReportsViewBar', {
	extend : 'Ext.panel.Panel',
	hidden : false,
  height: '100%',
    initComponent: function() {
	  var me = this;

	  me.items = [{
		  	xtype		: 'container',
  			layout		: 'vbox',

  			items: [
  				{
  					xtype: 'cartesian',
  					width: '100%',                           
  					//renderTo: document.body,
  					height: 250,
  					border : false,
  					store: [],
                    html: '',
  					legend: {
  						docked: 'bottom'
  					},
  					theme: 'Muted',
  			        interactions: ['itemhighlight'],
  			        animation: {
  			            duration: 200
  			        },
  					axes: [{
  						type: 'numeric3d',
  						position: 'left',
  						fields: ['data1', 'data2'],
  						grid: true,
  						title: ''
  					}, {
  						type: 'category3d',
  						position: 'bottom',
  						fields: 'dato',
  						title: {
	                      //text: 'dato'
  						},
	                  	grid: true
  					}],
  					series: {
  						type: 'bar3d',
  						stacked: false,
  						title: [],
  						xField: 'dato',
  						yField: ['data1', 'data2'],
  						style: {
  							inGroupGapWidth: -7
  						},
  						highlight: true,
  						label: {
  						     field: ['data1', 'data2'],
  						     display: 'insideEnd',
  						},
  					}
  			}]
	  }];
	  this.buttons = [{
          text: 'Descargar imagen',
          hidden : false,
          handler: function(btn, e, eOpts) {
              btn.up('panel').down("cartesian").download({
                  filename: "graficaBarras1"
              })
          }
      }, {
          text: 'Vista Previa',
          hidden : false,
          handler:function(btn, e, eOpts) {
               btn.up('panel').down("cartesian").preview();
          }
      }, {
          text: 'Recargar',
          hidden : false,
          handler:function(btn, e, eOpts) {
               //btn.up('panel').down("cartesian").preview();
          }
      }];

	  this.callParent();
    }
});

