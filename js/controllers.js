angular.module('cgApp.controllers', [])
	.controller('rcController',['$scope', '$filter', 'rcService', function($scope, $filter, rcService){

		$scope.hola = 'hola';

		$scope.rc = {};
		$scope.tempRc = {};
		$scope.currentId = 0;
		$scope.updateRc = false;

		$scope.loadRcData = function () {
			rcService.callRcData()
				.then(function (data) {
					$scope.rc.data = data;
					$scope.currentId = $scope.rc.data.length;
				}, function (data) {
					alert(data);
				})
		}

		$scope.saveRc = function () {
			if($scope.formNewReason.$valid) {
				if(!$scope.updateRc) {
					$scope.currentId++;
					$scope.tempRc['id'] = $scope.currentId;
					$scope.rc.data.push($scope.tempRc);
					$scope.tempRc = {};
				}
				else {
					animationsModule.toggleForm();
				}
				$scope.formNewReason.$setPristine();
				// clears temp data
				$scope.tempRc = {};
			}
			else {
				$scope.formNewReason.reasonCode.$setDirty();
				$scope.formNewReason.reasonCodeDescription.$setDirty();
				$scope.formNewReason.notes.$setDirty();
			}
			$scope.updateRc = false;
		}

		$scope.editRc = function(id) {
			$scope.tempRc = $scope.rc.data[id-1];
			$scope.updateRc = true;
		}

	}])
	.controller('ChartController', ['$scope', function($scope){
		// vars
		$scope.activeFilters = [];

		$scope.onClick = function(item, event) {
			// remove infoGlobe if exists
			var elem = document.getElementById('infoGlobe');
			if(elem != null) {
				elem.parentNode.removeChild(elem);
			}
			// creates infoglobe div
			var iDiv = document.createElement('div');
			// add properties
			iDiv.id = 'infoGlobe';
			iDiv.className = 'infoGlobe';
			iDiv.style.left = (event.offsetX + 100)+'px';
			iDiv.style.top = (event.offsetY + 300)+'px';

			// add content
			for (key in item) {
				if(key == 'monDD' || key == 'notFought' || key == 'CardType' || key == 'shore') {
					continue;
				}
		        var node = document.createElement("P");
		        // split camelCase key
		        var title = $scope.getCamelCaseArray(key);
		        // create text node
		        var textnode = document.createTextNode(title + ': ' + item[key]);
		        node.appendChild(textnode);
		        iDiv.appendChild(node);
		    }
		    // append to body
			document.getElementsByTagName('body')[0].appendChild(iDiv);
		};

		// toggle between bars and pie
		$scope.toggleChart = function () {
			$scope.removeInfoGlobe();
			animationsModule.toggleChart();
		}

		// helper function to split camel case
		$scope.getCamelCaseArray = function (camel) {
		  return camel.replace(/([a-z](?=[A-Z]))/g, '$1 ');
		}

		// main filter handler
		$scope.handleFilter = function (filterName, arg) {
			var datasource = [];
			existsFilterPos = $scope.searchFilterName(filterName);
			if(existsFilterPos != -1) {
				$scope.updateFilterArg(existsFilterPos, arg);
			}
			else {
				$scope.addFilterName(filterName, arg);
			}
			if($scope.activeFilters.length > 1) {
				datasource = $scope.createDataClay();

				$scope.dataclay = datasource;
				return;
			}
			else {
				datasource = $scope.dataoriginal;
			}
			var funcName = filterName + 'FilterApply';
			var responseData = $scope[funcName](datasource, arg);
			$scope.dataclay = responseData;
		}

		// add new filter if not exists
		$scope.addFilterName = function (filterName, arg) {
			$scope.activeFilters.push({filterName: filterName, arg: arg});
		}

		// search filters by name
		$scope.searchFilterName = function (filterName) {
			for(var i = 0; i < $scope.activeFilters.length; i++) {
				if($scope.activeFilters[i].filterName == filterName) {
					return i;
				}
			}
			return -1;
		}

		// update arg in filtername
		$scope.updateFilterArg = function (pos, arg) {
			$scope.activeFilters[pos].arg = arg;
		}

		// re-render data executing each activeFilter
		$scope.createDataClay = function () {
			$scope.dataClayReset();
			var datasource = $scope.dataclay;
			for(var i = 0; i < $scope.activeFilters.length; i++) {
				var funcName = $scope.activeFilters[i].filterName + 'FilterApply';
				datasource = $scope[funcName](datasource, $scope.activeFilters[i].arg);
			}
			return datasource;
		}

		// callback for cardtype filter
		$scope.cardTypeFilterApply = function (datasource, arg) {
			var tempData = [];
			for(var i = 0; i < datasource.length; i++) {
				if(datasource[i].CardType == arg) {
					tempData.push(datasource[i]);
				}
			}
			return tempData;
		}

		// callback for shore filter
		$scope.shoreFilterApply = function (datasource, arg) {
			var tempData = [];
			for(var i = 0; i < datasource.length; i++) {
				if(datasource[i].shore == arg) {
					tempData.push(datasource[i]);
				}
			}
			return tempData;
		}

		// reset all data back to original
		$scope.dataClayReset = function () {
			$scope.dataclay = $scope.dataoriginal;
		}

  }]);
