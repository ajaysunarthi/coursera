angular.module('courseraApp', ['angularLazyImg', 'ui.router']);

// routes for the app

angular.module('courseraApp').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('main', {
            url: '/',
            templateUrl: 'views/main.html'

        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'views/categories.html'
        })
        .state('specificCategory', {
            url: '/categories/:catvalue',
            templateUrl: 'views/specificCategory.html'
        })
        .state('site', {
            url: '/site/:slug',
            templateUrl: 'views/site.html',
            controller: siteCtrl,
            controllerAs: 'ctrl'
        })
        .state('search', {
            url: '/search/:something',
            templateUrl: 'views/search.html',
            controller: searchCtrl,
            controllerAs: 'ctrl'
        })
});
