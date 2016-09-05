# arcgis-fullscreen-widget
An ArcGIS JS V4 widget that uses the Fullscreen API.

[![npm](https://img.shields.io/npm/v/arcgis-fullscreen-widget.svg?maxAge=2592000)](https://www.npmjs.com/package/arcgis-fullscreen-widget)

Include the style, create the widget, then add it to your map UI

```js
require([
  "custom-widgets/FullScreen"
], function(FullScreen) {

  // create your map and view

  var toggle = new FullScreen({
    view: view
  });
  view.ui.add(toggle, "top-right");
```

Get it from here or via npm `npm install arcgis-fullscreen-widget --save`

#### Credit
This uses [screenfull](https://github.com/sindresorhus/screenfull.js) internally and was influenced by existing leaflet plugins like https://github.com/brunob/leaflet.fullscreen and https://github.com/Leaflet/Leaflet.fullscreen
