Ext.define('Ext.ux.SistemasCasa.Reportes.ReportsViewCircle', {
    extend: 'Ext.panel.Panel',
    hidden : false,
    xtype		: 'combination-bindingtabs',
    title		:	"Gráfica general",
    initComponent: function() {
        var me = this;

        me.items = [
    	{
    		xtype		: 'panel',
    		layout		: 'vbox',

    		items: [
    			{
    	            xtype: 'polar',
    	            theme: 'Muted',
    	            width: "100%",
    	            border : false,
    	            height: 306,
    	            insetPadding: 0,
    	            innerPadding: 15,
    	            store: [],
    	            /*legend: {
    	                docked: 'left'
    	            },*/
    	            //interactions: ['rotate'],
    	            series: [{
    	                type: 'pie3d',
    	                angleField: 'data1',
    	                label: {
    	                    field: 'porcentaje',
    	                    calloutLine: {
    	                        length: 60,
    	                        width: 3
    	                    }
    	                },
    	                highlight: true,
    	                tooltip: {
    	                    trackMouse: true,
    	                    renderer: function (tooltip, record, item) {
                                //console.log("para el render");
                                //console.log(this.getStore().data.items);
                                var store = this.getStore().data.items;
                                var acumulador = 0;
                                store.forEach(function(element) {
                                    //console.log(element.data.data1)
                                    //console.log("acumulador antes de la suma " +  acumulador);
                                    acumulador = acumulador + element.data.data1;
                                    //console.log(acumulador);
                                    });
                                //console.log("Acumulador: " + acumulador);
                                var porcentaje = ((record.get('data1') + record.get('data2'))* 100) / acumulador;
                                var s = porcentaje.toString();
                                var l = s.length;
                                var decimalLength = s.indexOf('.') + 1;
                                //console.log("Porcentaje:  " + porcentaje + " Parte decimal: " + decimalLength);
                                var numStr;
                                numStr = s.substr(0, decimalLength + 3);
                                var nuevop = Number(numStr);
                                tooltip.setHtml(record.get('os') + ': ' + nuevop + "%");
                            }
    	                }
    	            }]
    	        }
    		]
    	}];

        this.buttons = [{
            text: 'Descargar imagen',
            hidden : true,
            handler: function(btn, e, eOpts) {
                btn.up('panel').down("polar").download({
                    filename: "graficaCircular"
                })
            }
        }, {
            text: 'Vista Previa',
            hidden : true,
            handler: function(btn, e, eOpts) {
                btn.up('panel').down("polar").preview()
            }
        }];

        this.callParent();
    },

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    },

    onDataRender: function (v) {
        return v + '%';
    }
});
