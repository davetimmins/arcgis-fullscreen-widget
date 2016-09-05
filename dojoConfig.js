
var locationPath = window.location.origin.replace(/\/+$/, '') + window.location.pathname;

window.dojoConfig = {
  async: true,
  packages: [{
      name: 'custom-widgets',
      location: locationPath + 'src',
      main: 'FullScreen'
  }]
};
