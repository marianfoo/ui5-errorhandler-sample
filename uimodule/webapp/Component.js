sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/Device", "de/marianzeis/npmpackagesample/model/models",  "@marianfoo/ui5-errorhandler/ErrorHandler"],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.Device} Device
     */
    function (UIComponent, Device, models, ErrorHandler) {
        "use strict";

        return UIComponent.extend("de.marianzeis.npmpackagesample.Component", {
            metadata: {
                manifest: "json",
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                this._oErrorHandler = new ErrorHandler(this);
            },
        });
    }
);
