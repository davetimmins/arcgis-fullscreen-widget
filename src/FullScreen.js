
define([
  "dojo/dom-class",
  "dojo/dom-attr",
  "dojo/on",

  "dijit/_TemplatedMixin",
  "dijit/a11yclick",

  "esri/core/watchUtils",

  "esri/widgets/support/viewModelWiring",

  "esri/widgets/Widget",
  "./FullScreen/FullScreenViewModel",

  "dojo/i18n!./FullScreen/nls/FullScreen",

  "dojo/text!./FullScreen/templates/FullScreen.html"
],
function (
  domClass, domAttr, on,
  _TemplatedMixin, a11yclick,
  watchUtils,
  viewModelWiring,
  Widget, FullScreenViewModel,
  i18n,
  templateString
) {

  var CSS = {
    base: "esri-full-screen-toggle",
    button: "esri-full-screen-toggle__button esri-widget-button",
    text: "esri-icon-font-fallback-text",
    // icons
    fullScreenOnIcon: "esri-icon-full-screen-on",
    fullScreenOffIcon: "esri-icon-full-screen-off",
    // common
    disabled: "esri-disabled"
  };

  return Widget.createSubclass([_TemplatedMixin],
  {
    properties: {
      view: {
        dependsOn: ["viewModel.view"]
      },
      viewModel: {
        type: FullScreenViewModel
      }
    },

    declaredClass: "fesri.widgets.FullScreen",

    baseClass: CSS.base,

    templateString: templateString,

    postCreate: function () {
      this.inherited(arguments);

      this.own(
        watchUtils.init(this, "viewModel.state", this._handleState),
        watchUtils.init(this, "viewModel.mode", this._updateButton),
        on(this.domNode, a11yclick, this.viewModel.toggle)
      );
    },

    _css: CSS,

    _i18n: i18n,

    _getViewAttr: viewModelWiring.createGetterDelegate("view"),
    _setViewAttr: viewModelWiring.createSetterDelegate("view"),

    toggle: viewModelWiring.createMethodDelegate("toggle"),

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