
define([
  "dojo/dom-class",
  "dojo/dom-attr",

  "dijit/_TemplatedMixin",

  "esri/core/watchUtils",

  "esri/widgets/support/viewModelWiring",
  "esri/widgets/Widget",

  "./FullScreen/FullScreenViewModel",

  "dojo/i18n!./FullScreen/nls/FullScreen",

  "dojo/text!./FullScreen/templates/FullScreen.html"
],
function (
  domClass, domAttr,
  _TemplatedMixin, 
  watchUtils,
  viewModelWiring, Widget, 
  FullScreenViewModel,
  i18n,
  templateString
) {

  var CSS = {
    base: "esri-full-screen-toggle",
    button: "esri-full-screen-toggle__button esri-widget-button",
    text: "esri-icon-font-fallback-text",
    disabled: "esri-disabled",
    hidden: "esri-hidden",
    // icons
    fullScreenOnIcon: "esri-icon-full-screen-on",
    fullScreenOffIcon: "esri-icon-full-screen-off"   
  };

  return Widget.createSubclass([_TemplatedMixin],
  {
    properties: {
      view: {
        dependsOn: ["viewModel.view"]
      },
      viewModel: {
        type: FullScreenViewModel
      },
      hideIfFullScreenDisabled: {
        dependsOn: ["viewModel.hideIfFullScreenDisabled"]
      }
    },

    declaredClass: "custom.widgets.FullScreen",

    baseClass: CSS.base,

    templateString: templateString,

    postCreate: function () {
      this.inherited(arguments);

      this.own(
        watchUtils.init(this, "viewModel.state", this._handleState),
        watchUtils.init(this, "viewModel.mode", this._updateButton),
        watchUtils.init(this, "viewModel.hideIfFullScreenDisabled", function (value) {

          domClass.toggle(this.domNode, CSS.hidden, value);
        })
      );

      this.domNode.addEventListener("click", this.viewModel.toggle); 
    },

    destroy: function () {

      this.domNode.removeEventListener("click", this.viewModel.toggle); 
    },

    _css: CSS,

    _i18n: i18n,

    _getViewAttr: viewModelWiring.createGetterDelegate("view"),
    _setViewAttr: viewModelWiring.createSetterDelegate("view"),

    _getHideIfFullScreenDisabledAttr: viewModelWiring.createGetterDelegate("hideIfFullScreenDisabled"),
    _setHideIfFullScreenDisabledAttr: viewModelWiring.createSetterDelegate("hideIfFullScreenDisabled"),

    _handleState: function (value) {
      var disabled = value === "disabled";

      domClass.toggle(this.domNode, CSS.disabled, disabled);
      domAttr.set(this.domNode, "tabindex", disabled ? "" : 0);
    },

    _updateButton: function (mode) {
      var fullScreenSelected = mode === "on";

      domClass.toggle(this._fullScreenToggleNode, CSS.fullScreenOnIcon, fullScreenSelected);
      domClass.toggle(this._fullScreenToggleNode, CSS.fullScreenOffIcon, !fullScreenSelected);
    }
  });
});