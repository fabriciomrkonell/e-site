require.config({
  baseUrl: "/",
  paths: {
    'jquery': 'lib/jquery/dist/jquery.min',
    'jqueryForm': 'lib/jquery/dist/jquery-form',
    'bootstrap': 'lib/bootstrap-css/js/bootstrap.min',
    'angular': 'lib/angular/angular.min',
    'angular-route': 'lib/angular-route/angular-route.min',
    'angularAMD': 'lib/angular-amd/angularAMD.min',
    'angular-strap': 'lib/angular-strap/angular-strap.min',
    'angular-sanitize': 'lib/angular-sanitize/angular-sanitize',
    'socket': 'lib/socketio/socket.io',
    'jsPDFDebug': 'lib/jspdf/jspdf.debug',
    'jsPDF': 'lib/jspdf/jspdf.plugin.cell',
    'autocomplete': 'lib/autocomplete/js/angucomplete'
  },
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-strap': ['angular'],
    'socket': ['angular'],
    'jsPDF': ['jquery', 'jsPDFDebug'],
    'bootstrap': ['jquery'],
    'jqueryForm': ['jquery'],
    'autocomplete': ['angular'],
  },
  deps: ['js/app', 'angular-strap', 'angular-sanitize', 'socket', 'jsPDF', 'bootstrap', 'jqueryForm']
});