define([
  "esri/core/Accessor", 
  "esri/core/HandleRegistry",
  "dojo/dom-class"
], function(Accessor, HandleRegistry, domClass) {
  var state = {
      disabled: "disabled",
      ready: "ready"
    },
    mode = {
      on: "on",
      off: "off"
    };
  return Accessor.createSubclass({
    declaredClass: "fesri.widgets.FullScreenViewModel",
    properties: {
      navigationMode: {},
      state: {
        dependsOn: ["view.ready"],
        readOnly: !0
      },
      view: {}
    },
    constructor: function() {

      this._handles = new HandleRegistry;
      this.toggle = this.toggle.bind(this);      
    },
    initialize: function() {

      document.addEventListener("fullscreenchange", this._fullScreenHandler.bind(this));
      document.addEventListener("webkitfullscreenchange", this._fullScreenHandler.bind(this));
      document.addEventListener("mozfullscreenchange", this._fullScreenHandler.bind(this));
      document.addEventListener("MSFullscreenChange", this._fullScreenHandler.bind(this));
    },
    destroy: function() {

      this._handles.destroy();
      document.removeEventListener("fullscreenchange", this._fullScreenHandler);
      document.removeEventListener("webkitfullscreenchange", this._fullScreenHandler);
      document.removeEventListener("mozfullscreenchange", this._fullScreenHandler);
      document.removeEventListener("MSFullscreenChange", this._fullScreenHandler);
    },
    _handles: null,
    state: state.disabled,
    _stateGetter: function() {

      return this.get("view.ready") ? state.ready : state.disabled
    },
    _fullScreenHandler: function () {

        this.mode = 
          document.fullscreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement          
          ? mode.on : mode.off;

        if (this.mode === mode.off) {
          domClass.remove(this.view.container, 'view-fullscreen-on');
        }
        else {
          domClass.add(this.view.container, 'view-fullscreen-on');
        }
    },
    mode: mode.off,
    _modeGetter: function() {

      return this._get("mode") || mode.off;
    },
    view: null,
    toggle: function() {

      if (this.state !== state.disabled) {

        this.mode = this.mode !== mode.on ? mode.on : mode.off;
             
        if (this.mode === mode.off) {
                  
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else {
            console.log("Fullscreen API is not supported");
          }
        }
        else {

          var node = this.view.container;

          if (node.requestFullscreen) {
            node.requestFullscreen();
          } else if (node.msRequestFullscreen) {
            node.msRequestFullscreen();
          } else if (node.webkitRequestFullscreen) {
            node.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          } else if (node.mozRequestFullScreen) {
            node.mozRequestFullScreen();
          } else {
            console.log("Fullscreen API is not supported");
          }
        }
      }
    }
  })
});
