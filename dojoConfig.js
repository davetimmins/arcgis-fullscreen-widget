
var origin = window.location.origin;
var appName = window.location.pathname;
var locationPath = origin.replace(/\/+$/, '') + appName;

window.dojoConfig = {
  async: true,
  packages: [{
      name: 'fesri',
      location: locationPath + 'src',
      main: 'FullScreen'
  }]
};
