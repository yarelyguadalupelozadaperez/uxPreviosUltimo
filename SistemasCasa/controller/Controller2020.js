/**
 * @file This file contains some methods that provides functionality to abstract Controller 
 * File Controller.js
 * @class AdminWeb.abstract.Controller
 * @classdesc Basic controller, this class set the handlers to the default buttons in
 * the topbar of each class that extends from AdminWeb.abstract.Viewport, this class
 * also override the "control" method to add the "id" of the window.
 * @extends Ext.app.Controller
 * @author      Team Tuxs
 * @copyright  	Copyright (c) 2005-2013 Sistemas CASA, S.A. de C.V. sistemascasa.com.mx
 * @license     http://framework.zend.com/license   BSD License
 * @link        http://www.sistemacasas.com.mx/
 * @since       1.0.0 First time this was introduced.
 * @version     administrator 1.0.0
 */



Ext.define("Ext.ux.SistemasCasa.controller.Controller2020", {
    extend: "Ext.app.Controller",

    /**
     * @function init
     * @description This function wins The main window for this module and selectors Object 
     * of selectors, used for remove the listeners from the event bus when module is destroyed
     * @returns undefined
     */
    init: function() {
        var me = this,
            actions = {};
        me.setViewport();

        me.control({
            "button[action=new]": {
                click: me.add
            },

            "button[action=save]": {
                click: me.save
            },

            "button[action=delete]": {
                click: me.remove
            },

            "button[action=excel]": {
                click: me.excel
            },

            "button[action=filter]": {
                click: me.filter
            },

            "viewport2020 tabpanel grid textfield": {
                specialKey: me.filterkey
            },

            "button[action=clean]": {
                click: me.clean
            },
            "button[action=filterupdate]": {
                click: me.massiveupdate
            },
            "button[action=updatedate]": {
                click: me.updatedate
            }

        });
    },

    /**
     * @function control
     * @description This method add the window id to the selectors, this way we can create more the one
     * instance of the same window. 
     * @param {Object} actions An object with the selectors
     * @returns undefined
     */
    control: function(actions) {
        var me = this;
        if (Ext.isObject(actions)) {
            var obj = {};
            Ext.Object.each(actions, function(selector) {
                var s = "#" + this.win.id + " " + selector;
                obj[s] = actions[selector];
            }, this);
            delete actions;
            if (!me.selectors) {
                me.selectors = [];
            }
            me.selectors.push(obj);

            this.callParent([obj]);
        } else {
            this.callParent(arguments);
        }
    },

    /**
     * @function showError
     * @description This method display an error message in the status bar of the main window
     * @param {String} msg The message to display
     * @returns undefined
     */
    showError: function(msg) {
        this.win.statusBar.setStatus({
            text: msg,
            iconCls: "x-status-error"
        });
    },

    /**
     * @function showMessage
     * @description This method display a success message in the status bar of the main window
     * @param {String} msg The message to display
     * @returns undefined
     */
    showMessage: function(msg) {
        this.win.statusBar.setStatus({
            text: msg,
            iconCls: "x-status-valid"
        });
    },
    setViewport: Ext.emptyFn,
    /**
     * @function  add
     * @description An abstract method. This method is executed when the user clicks in any button
     * withing the main window than contain a property "action" equals to "new"
     * @returns undefined
     */
    updatedate: function() {
        var me = this;
        var tabPanel = this.win.down("viewport2020 tabpanel");
        var grid = tabPanel.getActiveTab();
        var store = grid.getStore();

        Administrator.Ajax.request({
            url: Administrator.BASE_PATH + grid.actionsUrl + 'updateddate',
            params: {
                schema: grid.schema,
                table: grid.table

            },

            statusBar: me.win.statusBar,
            success: function(response) {
                store.load({
                    params: {
                        schema: grid.schema,
                        table: grid.table
                    }
                });
            }
        });

    },

    add: function() {
        var tabPanel = this.win.down("viewport2020 tabpanel");
        var grid = tabPanel.getActiveTab();
        var dataIndexObject = new Object();
        //return console.log(grid)
        Ext.Array.each(grid.columns, function(column, index) {
            dataIndexObject[column.dataIndex] = column.defaultValue;

        });
        grid.getStore().insert(0, dataIndexObject);
        grid.editingPlugin.startEdit(0, 0);
    },

    /**
     * @function save
     * @description An abstract method. This method is executed when the user clicks in any button
     * withing the main window than contain a property "action" equals to "save".
     * @returns undefined
     */
    save: function() {
        var me = this;
        var tabPanel = this.win.down("viewport2020 tabpanel"),
            grid = tabPanel.getActiveTab(),
            store = grid.getStore(),
            records = Ext.Array.merge(store.getUpdatedRecords(), store.getNewRecords()),
            code = null;
        data = Array();

        Ext.each(records, function(rec) {
            Ext.each(grid.columns, function(column) {
                if (column.text.length == 6 && column.text.substring(2, 6) == "digos") {
                    //code = column;
                }

                try {
                    if (column.field.xtype == 'combo') {
                        var aliasArray = grid.alias[0].split(".");
                        var comboStore = Ext.StoreManager.lookup("" + column.dataIndex + "_" + aliasArray[1] + "");
                        if (comboStore.data.items.length > 0) {
                            var index = comboStore.find(column.dataIndex, rec.data["" + column.dataIndex + ""]);
                            var record = comboStore.data;
                            var recordObj = record.items[index].raw;
                            Object.keys(recordObj).map(function(key) {
                                rec.data[key] = recordObj[key];

                            });
                        }
                    }
                } catch (e) {

                }
            });
            data.push(rec.data);
        });

        if (data.length == 0) {
            return this.showError("No se ha detectado ning&uacuten cambio.");
        }

        if (code != null) {
            Administrator.Ajax.request({
                url: Administrator.BASE_PATH + grid.actionsUrl + 'codevalidation',
                params: {
                    data: Ext.encode(data),
                    schema: grid.schema,
                    table: grid.table

                },
                statusBar: this.win.statusBar,
                success: function(response) {
                    setTimeout(function() {
                        me.showError(response.msg);
                        return;
                    }, 100);
                },
                failure: function(response) {
                    Administrator.Ajax.request({
                        url: Administrator.BASE_PATH + grid.actionsUrl + 'save',
                        params: {
                            data: Ext.encode(data),
                            schema: grid.schema,
                            table: grid.table
                        },
                        statusBar: me.win.statusBar,
                        success: function(response) {
                            store.load({
                                params: {
                                    schema: grid.schema,
                                    table: grid.table
                                }
                            });
                        }
                    });

                }
            });
        } else {

            if (data[0]["ivaNoteCode"] !== undefined) {
                var valueIvaNote = data[0]["ivaNoteCode"];
                delete data[0]["ivaNoteCode"];
                data[0]["ivaNote"] = parseInt(valueIvaNote);
            }

            Administrator.Ajax.request({
                url: Administrator.BASE_PATH + grid.actionsUrl + 'save',
                params: {
                    data: Ext.encode(data),
                    schema: grid.schema,
                    table: grid.table
                },
                statusBar: me.win.statusBar,
                success: function(response) {
                    store.load({
                        params: {
                            schema: grid.schema,
                            table: grid.table
                        }
                    });
                }
            });
        }
    },

    /**
     * @function  remove
     * @description An abstract method. This method is executed when the user clicks in any button
     * withing the main window than contain a property "action" equals to "delete".
     * @returns undefined
     */
    remove: function() {
        var me = this;
        var tabPanel = me.win.down("viewport2020 tabpanel"),
            grid = tabPanel.getActiveTab(),
            store = grid.getStore();

        if (grid.getSelectionModel().selected.items.length == 0) {
            return this.showError("Seleccione un elemento por favor.");
        } else {
            var data = grid.getSelectionModel().selected.items[0].data;

            Administrator.Msg.confirm("Esta usted seguro de eliminar el elemento?", function(btn) {
                if (btn == "yes") {
                    Administrator.Ajax.request({
                        url: Administrator.BASE_PATH + grid.actionsUrl + 'remove',
                        params: {
                            data: Ext.encode(data),
                            schema: grid.schema,
                            table: grid.table
                        },
                        statusBar: me.win.statusBar,
                        success: function(response) {
                            store.load({
                                params: {
                                    schema: grid.schema,
                                    table: grid.table
                                }
                            });
                        }
                    });
                }
            });
        }
    },

    filter: function() {

        var me = this;

        var tabPanel = me.win.down("viewport2020 tabpanel"),


            grid = tabPanel.getActiveTab(),
            store = grid.getStore();

        var fields = grid.dockedItems.items[2].items.items[3].value;
        if (fields.length == 0) {
            return this.showError("Es necesario que ingrese un campo a buscar");
        }
        var text = grid.dockedItems.items[2].items.items[6].value;
        if (text == undefined) {
            return this.showError("Introduzca un texto a buscar.");
        }
        var textArray = text.split(",");

        if (fields.value == undefined && text == "") {
            return this.showError("Introduzca un texto a buscar.");
        } else if (fields.length == 0 && text == undefined) {
            return this.showError("Seleccione un campo e introduzca un texto a buscar.");
        } else if (textArray.length > 1) {
            if (fields.length != textArray.length) {
                return this.showError("El n&uacute;mero de criterios debe ser igual a los campos seleccionados.");
            } else {
                //console.log("buscando...");
                grid.getStore().getProxy().extraParams.fields = Ext.encode(fields);
                grid.getStore().getProxy().extraParams.text = text;

                store.load({

                    params: {
                        schema: grid.schema,
                        table: grid.table,
                        page: [],
                        start: 0,
                        limit: store.pageSize

                    }

                });

                return this.showMessage("B&uacute;squeda Finalizada con &eacute;xito.");
            }
        } else {
            grid.getStore().getProxy().extraParams.fields = Ext.encode(fields);
            grid.getStore().getProxy().extraParams.text = text;

            store.load({
                params: {
                    schema: grid.schema,
                    table: grid.table,
                    page: [],
                    start: 0,
                    limit: store.pageSize
                }
            });

            return this.showMessage("B&uacute;squeda Finalizada con &eacute;xito.");
        }
    },

    massiveupdate: function() {
        var me = this;
        var tabPanel = me.win.down("viewport2020 tabpanel"),
            grid = tabPanel.getActiveTab(),
            store = grid.getStore();

        var text = grid.dockedItems.items[3].items.items[4].value;
        var fieldsupdate = grid.dockedItems.items[3].items.items[1].value;

        if (fieldsupdate == null) {
            return this.showError("Es necesario que ingrese un campo para actualizar");
        }
        var comboSearch = grid.dockedItems.items[2].items.items[3].value;
        var textSerch = grid.dockedItems.items[2].items.items[6].value;

        if (text == undefined) {
            return this.showError("Introduzca el texto actualizar.");
        }

        if (text === undefined && textSerch === undefined) {
            var text = [""]
        } else {

            var textArray = text.split(",");
            //console.log(textArray)

            var fields = Ext.encode(fieldsupdate);
            var comboSearch = Ext.encode(comboSearch);

            if (fieldsupdate.value > 0 && text == undefined) {
                return this.showError("Introduzca un texto a buscar.");
            } else if (fieldsupdate.length == 0 && text == undefined) {
                return this.showError("Seleccione un campo e introduzca un texto a buscar.");
            } else if (textArray.length >= 1) {

                Administrator.Ajax.request({
                    url: Administrator.BASE_PATH + grid.actionsUrl + 'getdataupdateview',
                    params: {
                        schema: grid.schema,
                        table: grid.table,
                        fields: fields,
                        text: text,
                        comboSearch: comboSearch,
                        textSerch: textSerch,
                    },
                    statusBar: me.win.statusBar,
                    success: function(response) {
                        store.load({
                            params: {
                                schema: grid.schema,
                                table: grid.table
                            }
                        });
                    }
                });
            }

        }
    },
    filterkey: function(field, value) {

        if (value.getKey() === value.ENTER) {
            var me = this;
            var tabPanel = me.win.down("viewport2020 tabpanel"),
                grid = tabPanel.getActiveTab(),
                store = grid.getStore();

            var fields = grid.dockedItems.items[2].items.items[3].value;
            var text = grid.dockedItems.items[2].items.items[6].value;

            var textArray = text.split(",");

            if (combo.value > 0 && text == undefined) {
                return this.showError("Introduzca un texto a buscar.");
            } else if (combo.length == 0 && text == undefined) {
                return this.showError("Seleccione un campo e introduzca un texto a buscar.");
            } else if (textArray.length > 1) {
                if (combo.length != textArray.length) {
                    return this.showError("El n&uacute;mero de criterios debe ser igual a los campos seleccionados.");
                } else {
                    grid.getStore().getProxy().extraParams.fields = Ext.encode(combo);
                    grid.getStore().getProxy().extraParams.text = text;
                    store.load({
                        params: {
                            schema: grid.schema,
                            table: grid.table,
                            page: [],
                            start: 0,
                            limit: store.pageSize
                        }
                    });

                    return this.showMessage("B&uacute;squeda Finalizada con &eacute;xito.");
                }
            } else {
                grid.getStore().getProxy().extraParams.fields = Ext.encode(combo);
                grid.getStore().getProxy().extraParams.text = text;

                store.load({
                    params: {
                        schema: grid.schema,
                        table: grid.table,
                        page: [],
                        start: 0,
                        limit: store.pageSize
                    }
                });

                return this.showMessage("B&uacute;squeda Finalizada con &eacute;xito.");
            }
        }

    },

    clean: function() {
        var me = this;
        var tabPanel = me.win.down("viewport2020 tabpanel"),
            grid = tabPanel.getActiveTab(),
            store = grid.getStore(),
            pagingtoolbar = Ext.getCmp("pagingtoolbar" + grid.alias);

        var fields = grid.dockedItems.items[2].items.items[3]; //columnas
        var text = grid.dockedItems.items[2].items.items[6]; //texto
        var textSerch = grid.dockedItems.items[3].items.items[4]; //texto dos
        var comboSearch = grid.dockedItems.items[3].items.items[1]; //actualizacion


        fields.reset();
        text.reset();
        comboSearch.reset();
        textSerch.reset();
        //console.log(store);
        pagingtoolbar.moveFirst();

        store.getProxy().extraParams.fields = [];
        store.getProxy().extraParams.text = undefined;
        store.getProxy().extraParams.comboSearch = [];
        store.getProxy().extraParams.textSerch = undefined;

        store.load({
            params: {
                schema: grid.schema,
                table: grid.table,
                page: 1,
                start: 0,
                limit: store.pageSize
            }

        });
        return this.showMessage("P&aacute;gina principal");
    },

    excel: function() {
        var me = this;
        var tabPanel = me.win.down("viewport2020 tabpanel"),
            grid = tabPanel.getActiveTab();

        var file = Ext.getCmp("idTariffPrincipal2020").valueModels[0].raw[1] + '_' + tabPanel.activeTab.title;

        if (file.length > 31) {
            file = tabPanel.activeTab.title.substr(0, 31);
        }

        var combo = grid.dockedItems.items[2].items.items[3];
        var text = grid.dockedItems.items[2].items.items[6];

        if (text.value == undefined)
            var newText = undefined;

        else
            var newText = text.value.replace(/\//g, "_");

        var fields = "";
        var headers = "";

        if (combo.value.length > 0 && newText == undefined) {
            return this.showError("Ingrese un dato a buscar v&aacute;lido.");
        }

        Ext.each(combo.store.data.items, function(data) {
            headers += data.raw.text + ",";
        });

        if (combo.value.length != 0) {
            Ext.each(combo.value, function(field) {
                fields += field + ",";
            });
        }

        fields = fields.substr(0, fields.length - 1);
        headers = headers.substr(0, headers.length - 1);
        //            console.log(grid.schema);
        //            console.log(grid.table);

        location.replace(grid.actionsUrl + 'excel/file/' + file + '/fields/' + fields + '/text/' + newText + "/schema/" + grid.schema + '/table/' + grid.table + '/headers/' + headers);
    }

});