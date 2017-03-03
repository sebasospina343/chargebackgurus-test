angular.module('cgApp.services', [])
	.service('rcService', ['$http', '$q', function($http, $q){
		var _baseUrl = 'http://localhost:8000/json/reasoncode.json';

		this.callRcData = function () {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: _baseUrl
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject('Error! Please contact administrator.')
			})
			return deferred.promise;
		}

	}])
	.factory('d3Service', ['$document', '$window', '$q', '$rootScope',
	    function($document, $window, $q, $rootScope) {
	        var d = $q.defer(),
	            d3service = {
	                d3: function() {
	                    return d.promise; }
	            };

	        function onScriptLoad() {
	            // load
	            $rootScope.$apply(function() { d.resolve($window.d3); });
	        }
	        var scriptTag = $document[0].createElement('script');
	        scriptTag.type = 'text/javascript';
	        scriptTag.async = true;
	        scriptTag.src = 'http://d3js.org/d3.v3.min.js';
	        scriptTag.onreadystatechange = function() {
	            if (this.readyState == 'complete') onScriptLoad();
	        }
	        scriptTag.onload = onScriptLoad;

	        var s = $document[0].getElementsByTagName('body')[0];
	        s.appendChild(scriptTag);

	        return d3service;
	    }
	]);
