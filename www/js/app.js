(function(angular) {

  angular.module('phymoo', ['ionic', 'phymoo.controllers', 'phymoo.dataServices'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

        // setup an abstract state for the tabs directive
        .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
        })

        // Each tab has its own nav history stack:

        .state('tab.dash', {
          url: '/dash',
          views: {
            'tab-dash': {
              templateUrl: 'templates/tab-dash.html',
              controller: 'DashCtrl as vm'
            }
          }
        })

        .state('tab.settings', {
          url: '/settings',
          views: {
            'tab-settings': {
              templateUrl: 'templates/tab-settings.html',
              controller: 'SettingsCtrl as vm'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/dash');

    });
})(angular);
