angular.module('cgApp', ['cgApp.controllers', 'cgApp.services', 'cgApp.directives', 'cgApp.filters', 'ui.router'])
	.config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
		$stateProvider.state('dashboard',{
			url: '/dashboard',
			controller:'rcController',
			templateUrl:'/partials/dashboard.html'
		}).state('reports',{
			url: '/reports',
			controller:'rcController',
			templateUrl: '/partials/reports.html'
		});
		$urlRouterProvider.otherwise('/dashboard');
        $locationProvider.html5Mode(true);
    })
	.run(function($rootScope) {
		$rootScope.$on("$locationChangeStart", function(event, next, current) { 
			// remove infoglobe in case is open
			$rootScope.removeInfoGlobe();
			// add listener to close button when reload
			if(document.getElementById('closeForm') && document.getElementById('addReasonBtn')) {
				setTimeout(function(){
					document.getElementById('closeForm').addEventListener("click", function() {
				    	animationsModule.toggleForm();
					});
					document.getElementById('addReasonBtn').addEventListener("click", function() {
				    	animationsModule.toggleForm();
					});
				}, 100);
			}
			var pageMenuLinks = document.getElementById('pageMenuLinks');
			pageMenuLinks.style.height = (screen.height + 500)+'px';
		});

		$rootScope.removeInfoGlobe = function() {
			var elem = document.getElementById('infoGlobe');
			if(elem != null) {
				elem.parentNode.removeChild(elem);
			}
		}
	});