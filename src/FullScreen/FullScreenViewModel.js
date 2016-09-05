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
    },
    fullscreenEvent = 'fullscreenchange';
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

      if ("onmozfullscreenchange" in document) {
        this.fullscreenEvent = "mozfullscreenchange";
      }
      else if ("onwebkitfullscreenchange" in document) {
        this.fullscreenEvent = "webkitfullscreenchange";
      }
      else if ("onmsfullscreenchange" in document) {
        this.fullscreenEvent = "MSFullscreenChange";
      }

      document.addEventListener(this.fullscreenEvent, this._fullScreenHandler.bind(this));
    },
    destroy: function() {

      this._handles.destroy();
      document.removeEventListener(this.fullscreenEvent, this._fullScreenHandler);
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
    toggle: function(e) {

      e.preventDefault();

      if (this.state === state.disabled) {
        return;
      }

      this.mode = this.mode !== mode.on ? mode.on : mode.off;
             
      if (this.mode === mode.off) {
                
        this._exitFullscreen();
      }
      else {

        this._requestFullscreen(this.view.container);
      }      
    },
    _requestFullscreen: function(element) {

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else {
        console.log('Fullscreen API is not supported.');
      }
    },
    _exitFullscreen: function() {

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else {
        console.log('Fullscreen API is not supported.');
      }
    }
  })
});
