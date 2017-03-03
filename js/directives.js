angular.module('cgApp.directives', ['cgApp.services'])
    .directive('d3Bars', ['d3Service', '$window', function(d3Service, $window) {
        return {
            restrict: 'EA',
            scope: {
                dataoriginal: '=',
                dataclay: '=',
                reporttype: '=',
                onClick: '&'
            },
            link: function(scope, element, attrs) {
                // first load
                scope.firstTime = true;

                d3Service.d3().then(function(d3) {
                    // local vars
                    scope.dataModified = false;
                    scope.callData = false;
                    // watchers
                    window.onresize = function() {
                        scope.$apply();
                    };
                    scope.$watch(function() {
                        return angular.element($window)[0].innerWidth;
                    }, function() {
                        scope.render(scope.dataclay);
                    });
                    scope.$watch('dataclay', function(newVals, oldVals) {
                        if(newVals != oldVals) {
                            scope.dataModified = true;
                            return scope.render(newVals);
                        }
                    }, true);
                    scope.$watch('reporttype', function(newVal, oldVal) {
                        if(newVal != oldVal) {
                            scope.callData = false;
                            scope.render(scope.dataoriginal);
                        }
                    });

                    // create svg element
                    var svg = d3.select(element[0])
                        .append('svg')
                        .style('width', '90%')
                        .style('marign', '0 auto');
                    var height = 500;
                    var color = d3.scale.category20();
 
                    // main render function
                    scope.render = function(data) {
                        // calculates dynamic width
                        var width = d3.select(element[0]).node().offsetWidth;

                        if(scope.firstTime) {
                            // default report type
                            scope.reporttype = 'notFought';
                            scope.firstTime = false;
                        }
                        // clean svg
                        svg.selectAll('*').remove();
                        // call data first time
                        if (scope.callData == false) {
                            d3.csv("/json/data2.csv", type, function(error, data) {
                                scope.callData = true;
                                // creates original and copy
                                scope.dataoriginal = data;
                                scope.dataclay = data;
                                scope.$apply();
                                // starts rendering
                                doRender(scope.dataoriginal);
                            });
                        } else {
                            if (scope.dataModified == true) {
                                doRender(scope.dataclay);
                            }
                            else {
                                doRender(scope.dataoriginal);
                            }
                        }

                        // draws d3js graph
                        function doRender(data) {
                            // svg height
                            svg.attr('height', height + 50);

                            // x and y scales
                            var x = d3.scale.ordinal()
                                .rangeRoundBands([0, width], .1)
                                .domain(data.map(function(d) {
                                    return d.monDD;
                                }));
                            var y = d3.scale.linear()
                                .range([height, 0])
                                .domain([0, d3.max(data, function(d) {
                                    return d[scope.reporttype];
                                })]);
                            // axis
                            var xAxis = d3.svg.axis()
                                .scale(x)
                                .orient("bottom");
                            var yAxis = d3.svg.axis()
                                .scale(y)
                                .orient("left");
                            // element container
                            var inner = svg.append("g")
                                .attr("transform", "translate(10,10)");

                            var barWidth = width / data.length;

                            // d3js draw
                            var bar = inner.selectAll("g")
                                .data(data)
                                .enter().append("g")
                                .attr("transform", function(d) {
                                    return "translate(" + x(d.monDD) + ",0)";
                                })
                                .on('click', function(d, i) {
                                    return scope.onClick({ item: d, event: event });
                                });
                            bar.append("rect")
                                .attr("y", function(d) {
                                    return y(d[scope.reporttype]);
                                })
                                .attr("height", function(d) {
                                    return height - y(d[scope.reporttype]);
                                })
                                .attr('fill', function(d) {
                                    return color(d[scope.reporttype]);
                                })
                                .attr("width", barWidth - 1)
                                .attr("class", "chart-clickable")
                                .transition()
                                .duration(1000)
                                .ease("quad")
                                .attr("width", barWidth - 30);
                            // axis
                            svg.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0," + (height + 20) + ")")
                                .call(xAxis);
                            svg.append("g")
                                .attr("class", "y axis")
                                .attr("transform", "translate(25,10)")
                                .call(yAxis);
                        }
                        // helper function for type casting
                        function type(d) {
                            d[scope.reporttype] = +d[scope.reporttype];
                            return d;
                        }
                    }
                });
            }
        };
    }])
	.directive('d3Pie', ['d3Service', '$window', function(d3Service, $window) {
        return {
            restrict: 'EA',
            scope: {
                dataoriginal: '=',
                dataclay: '=',
                reporttype: '=',
                onClick: '&'
            },
            link: function(scope, element, attrs) {
                // first load
                scope.firstTime = true;

                d3Service.d3().then(function(d3) {
                    // local vars
                    scope.dataModified = false;
                    scope.callData = false;
                    // watchers
                    window.onresize = function() {
                        scope.$apply();
                    };
                    scope.$watch(function() {
                        return angular.element($window)[0].innerWidth;
                    }, function() {
                        scope.render(scope.dataclay);
                    });
                    scope.$watch('dataclay', function(newVals, oldVals) {
                        if(newVals != oldVals) {
                            scope.dataModified = true;
                            return scope.render(newVals);
                        }
                    }, true);
                    scope.$watch('reporttype', function(newVal, oldVal) {
                        if(newVal != oldVal) {
                            scope.callData = false;
                            scope.render(scope.dataoriginal);
                        }
                    });

                    // create svg element
                    var svg = d3.select(element[0])
                        .append('svg')
                        .style('width', '90%')
                    var height = 500;
                    var color = d3.scale.category20();
 
                    // main render function
                    scope.render = function(data) {
                        // calculates dynamic width
                        var width = d3.select(element[0]).node().offsetWidth;
                        var radius = Math.min(width, height) / 2;

                        if(scope.firstTime) {
                            // default report type
                            scope.reporttype = 'notFought';
                            scope.firstTime = false;
                        }
                        // clean svg
                        svg.selectAll('*').remove();
                        // call data first time
                        if (scope.callData == false) {
                            d3.csv("/json/data2.csv", type, function(error, data) {
                                scope.callData = true;
                                // creates original and copy
                                scope.dataoriginal = data;
                                scope.dataclay = data;
                                scope.$apply();
                                // starts rendering
                                doRender(scope.dataoriginal);
                            });
                        } else {
                            if (scope.dataModified == true) {
                                doRender(scope.dataclay);
                            }
                            else {
                                doRender(scope.dataoriginal);
                            }
                        }

                        // draws d3js graph
                        function doRender(data) {
                            // svg height
                            svg.attr('height', height + 50);

                            var arc = d3.svg.arc()
                                .outerRadius(radius - 10)
                                .innerRadius(0);

                            var labelArc = d3.svg.arc()
                                .outerRadius(radius - 40)
                                .innerRadius(radius - 40);
                            var pie = d3.layout.pie()
                                .sort(null)
                                .value(function(d) {
                                    return d[scope.reporttype]; });
                            // element container
                            var pieG = svg.append("g")
                                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                            // d3js draw
                            var g = pieG.selectAll(".arc")
                                .data(pie(data))
                                .enter().append("g")
                                .attr("class", "arc chart-clickable")
                                .on('click', function(d, i) {
                                    return scope.onClick({ item: d.data, event: event });
                                });
                            g.append("path")
                                .attr("d", arc)
                                .style("fill", function(d) {
                                    return color(d.data.monDD);
                                });
                            g.append("text")
                                .attr("transform", function(d) {
                                    return "translate(" + labelArc.centroid(d) + ")"; })
                                .attr("dy", ".35em")
                                .text(function(d) {
                                    return d.data.monDD; });
                        }
                        // helper function for type casting
                        function type(d) {
                            d[scope.reporttype] = +d[scope.reporttype];
                            return d;
                        }
                    }
                });
            }
        };
    }]);
