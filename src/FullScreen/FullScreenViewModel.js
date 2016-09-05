define([
  "esri/core/Accessor", 
  "esri/core/HandleRegistry",
  "dojo/dom-class",
  "./screenfull",
], function(Accessor, HandleRegistry, domClass, screenfull) {

  var state = {
    disabled: "disabled",
    ready: "ready"
  };
  var mode = {
    on: "on",
    off: "off"
  };

  return Accessor.createSubclass({

    declaredClass: "custom.widgets.FullScreenViewModel",
    properties: {
      mode: {},
      state: {
        dependsOn: ["view.ready"],
        readOnly: !0
      },
      view: {},
      hideIfFullScreenDisabled: true
    },

    constructor: function() {

      this._handles = new HandleRegistry;
      this.toggle = this.toggle.bind(this);   
      this._fullScreenHandler = this._fullScreenHandler.bind(this);   
    },

    initialize: function() {

      if (screenfull.enabled) {
        document.addEventListener(screenfull.raw.fullscreenchange, this._fullScreenHandler);
        document.addEventListener(screenfull.raw.fullscreenerror, this._fullScreenError);
      }      
    },

    destroy: function() {
      
      if (screenfull.enabled) {
        document.removeEventListener(screenfull.raw.fullscreenchange, this._fullScreenHandler);
        document.removeEventListener(screenfull.raw.fullscreenerror, this._fullScreenError);
      } 

      this._handles.destroy();
    },

    _fullScreenHandler: function () {

        this.mode = screenfull.isFullscreen ? mode.on : mode.off;

        if (this.mode === mode.off) {
          domClass.remove(this.view.container, 'view-fullscreen-on');
        }
        else {
          domClass.add(this.view.container, 'view-fullscreen-on');
        }
    },

    _fullScreenError: function (event) {

        console.error('Failed to enable fullscreen', event);
    },

    _handles: null,

    state: state.disabled,
    _stateGetter: function() {

      return this.get("view.ready") && screenfull.enabled ? state.ready : state.disabled
    },
    
    mode: mode.off,
    _modeGetter: function() {

      return this._get("mode") || mode.off;
    },

    _hideIfFullScreenDisabledGetter: function() {

      return !screenfull.enabled && this._get("hideIfFullScreenDisabled");
    },
    _hideIfFullScreenDisabledSetter: function(disabled) {

      this._set("hideIfFullScreenDisabled", !screenfull.enabled && disabled)
    },

    view: null,
    
    toggle: function(e) {

      e.preventDefault();

      if (this.state === state.disabled) {
        return;
      }

      this.mode = this.mode !== mode.on ? mode.on : mode.off;

      if (!screenfull.enabled) {
        return;
      }
             
      if (this.mode === mode.off) {
                
        screenfull.exit();
      }
      else {

        screenfull.request(this.view.container);
      }      
    }    
  })
});
