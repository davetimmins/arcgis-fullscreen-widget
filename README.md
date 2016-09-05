# arcgis-fullscreen-widget
An ArcGIS JS V4 widget that uses the Fullscreen API.

[![npm](https://img.shields.io/npm/v/arcgis-fullscreen-widget.svg?maxAge=2592000)]()

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