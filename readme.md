# npmpackagesample

This sample shows how to use npm packages.
Two examples are shown here:
- How to consume a UI5 AMD style module
- How to consume a classic js class

We will consume `@marianfoo/ui5-errorhandler`.  
Repo is here https://github.com/marianfoo/ui5-errorhandler  
The two options are in [UI5 style ErrorHandler](https://github.com/marianfoo/ui5-errorhandler/blob/main/ErrorHandler.js) and [js class style ErrorHandler](https://github.com/marianfoo/ui5-errorhandler/blob/main/ErrorHandlerClass.js).


## UI5 AMD style module

### NPM Package

In npm package [ui5.yaml](https://github.com/marianfoo/ui5-errorhandler/blob/main/ui5.yaml) , the ressource path is defined as:

```yaml
resources:
  configuration:
    paths:
      "/resources/cc/errorhandler/": "./"
```

### Consume in UI5 Sample App

In the [`package.json`](https://github.com/marianfoo/ui5-errorhandler-sample/blob/main/package.json) file, we have the following entries:

```json
    "dependencies": {
        "@marianfoo/ui5-errorhandler": "^0.0.4"
    },
```

```json
    "ui5": {
        "dependencies": [
            "ui5-middleware-simpleproxy",
            "@marianfoo/ui5-errorhandler"
        ]
    }
```

Consume it in the UI5 app with the resource path as defined in the npm package ([Component.js](https://github.com/marianfoo/ui5-errorhandler-sample/blob/main/uimoduleui5/webapp/Component.js)):

```js
sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/Device", "de/marianzeis/npmpackagesample/model/models", 
    "cc/errorhandler/ErrorHandler"
    ],
    function (UIComponent, Device, models, ErrorHandler) {
        "use strict";

        return UIComponent.extend("de.marianzeis.npmpackagesample.Component", {
            metadata: {
                manifest: "json",
            },
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
```


## javaScript Class style module (any other npm package)


In the [ui5.yaml](uimodulenonui5/ui5.yaml) file, we have the following entries:

```yaml
server:
    customMiddleware:
        ...
        - name: ui5-tooling-modules-middleware
          afterMiddleware: compression
builder:
  customTasks:
  - name: ui5-tooling-modules-task
    afterTask: replaceVersion
```

In [package.json](package.json):

```json
    "devDependencies": {
        "ui5-tooling-modules": "^0.1.2",
        "@marianfoo/ui5-errorhandler": "^0.0.1"
    },
    "ui5": {
        "dependencies": [
            "ui5-tooling-modules"
        ]
    }
```

We consume it in [Component.js](uimodulenonui5/webapp/Component.js) with the npm package name:

```js
sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/Device", "de/marianzeis/npmpackagesample/model/models", 
    "@marianfoo/ui5-cc-errorhandler/ErrorHandlerClass"],
    function (UIComponent, Device, models, ErrorHandler) {
        "use strict";

        return UIComponent.extend("de.marianzeis.npmpackagesample.Component", {
            metadata: {
                manifest: "json",
            },
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
```

Now the javaScript class is wrapped:
### Before
```js
var BaseObject = require('sap/ui/base/Object');
var MessageBox = require('sap/m/MessageBox');

module.exports = class ErrorHandler extends BaseObject {
// ************************************************************************************************************
		// Constructor
		// ************************************************************************************************************

		/**
		 * Constructor Method of the error handler. Initialises the error handler for the default model of the component.
		 * @public
		 * @constructor
		 * @param {sap.ui.core.UIComponent} oComponent Reference to the component of the app
		 * @method module:controller/ErrorHandler#constructor
		 */
		 constructor(oComponent) {
```
### After (how the ui5 app is consuming it)
```js
sap.ui.define(['sap/ui/base/Object', 'sap/m/MessageBox'], (function (require$$0, require$$1) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
	var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

	var BaseObject = require$$0__default["default"];
	var MessageBox = require$$1__default["default"];

	var ErrorHandlerClass = class ErrorHandler extends BaseObject {
	// ************************************************************************************************************
			// Constructor
			// ************************************************************************************************************

			/**
			 * Constructor Method of the error handler. Initialises the error handler for the default model of the component.
			 * @public
			 * @constructor
			 * @param {sap.ui.core.UIComponent} oComponent Reference to the component of the app
			 * @method module:controller/ErrorHandler#constructor
			 */
			 constructor(oComponent) {
```
## Credits

This project has been generated with 💙 and [easy-ui5](https://github.com/SAP)
