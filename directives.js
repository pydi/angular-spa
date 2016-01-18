incidentReportApp.directive("dropdown", function($rootScope, $http, $q ) {
	return {
		restrict: "E",
		templateUrl: "directives/dropdown.html",
		scope: {
			placeholder: "@",
			list: "=",
			selected: "=",
			property: "@"
		},
		link: function(scope) {
			scope.listVisible = false;
			scope.isPlaceholder = true;
            scope.display = "";

			scope.select = function(item) {
				scope.isPlaceholder = false;
				scope.selected = item;
			};

			scope.isSelected = function(item) {
				return item[scope.property] === scope.selected[scope.property];
			};

            
            var getData = function (url) {
                var data = "";
                var deferred = $q.defer();

                $http.get(url)
                    .success( function(response, status, headers, config) {
                         deferred.resolve(response);
                    })
                    .error(function(errResp) {
                         deferred.reject({ message: "Really bad" });
                    });
                return deferred.promise;
            }
            
//			scope.show = function() {
//                scope.listVisible = true;
//                if(document.getElementById('user').value.length > 2){
//                        getData('json/users.json').then(function(data){
//                                scope.userInfo = data.users;
//                                scope.listVisible = true; 
//                        });
//                    }
//            }; 
            //scope.userinput="";
            scope.$watch('userinput', function(newValue){
                if(newValue){
                    if(newValue.length > 2){
                        getData('json/users.json').then(function(data){
                                scope.userInfo = data.users;
                                scope.listVisible = true; 
                        });
                    }
                }
            });
            
			$rootScope.$on("documentClicked", function(inner, target) {
				console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
				if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
					scope.$apply(function() {
						scope.listVisible = false;
					});
			});

			scope.$watch("selected", function(value) {
				scope.isPlaceholder = scope.selected[scope.property] === undefined;
				scope.display = scope.selected[scope.property];
                scope.userinput = scope.selected[scope.property];
			});
		}
	}
});

