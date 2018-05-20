// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.CloudNote.testapp', // App bundle ID
  name: 'Cloud Note', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'GUO',
        lastName: 'Victor',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});
var mainView = app.views.create('.view-main', {
  url: '/'
});
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});
