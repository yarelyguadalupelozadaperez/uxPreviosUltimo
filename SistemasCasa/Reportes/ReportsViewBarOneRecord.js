Ext.define('Ext.ux.SistemasCasa.Reportes.ReportsViewBarOneRecord', {
	extend : 'Ext.panel.Panel',
	hidden : false,
    initComponent: function() {
	  var me = this;

	  me.items = [{
		  	xtype		: 'container',
  			layout		: 'vbox',
  			items: [
  				{
  					xtype: 'cartesian',
  					width: '100%',
                    plain	 : true,
                    style: {
    					backgroundColor: 'blue'
    				},
  					//renderTo: document.body,
                    //flipXY : true,
  					height: 200,
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
  						fields: ['data1'],
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
  						yField: ['data1'],
  						style: {
  							inGroupGapWidth: -7
  						},
  						highlight: true,
  						label: {
  						     field: ['data1'],
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
                  filename: "graficaBarras"
              })
          }
      }, {
          text: 'Vista Previa',
          hidden : false,
          handler:function(btn, e, eOpts) {
               btn.up('panel').down("cartesian").preview();
          }
      },{
          text: 'Refrescar',
          itemId: 'refreshBarViewOneRecord',
          hidden : false,
          handler:function(btn, e, eOpts) {
               //btn.up('panel').down("cartesian").preview();
          }
      }];

	  this.callParent();
    }
});

