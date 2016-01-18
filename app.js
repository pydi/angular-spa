angular.module('controls', [])
    .directive('clearText', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$render = function () {
                    element.val(ctrl.$viewValue);
                };

                element.bind('input', function (event) {
                    ctrl.$setViewValue(element.val());
                    tog(!ctrl.$isEmpty(ctrl.$viewValue), 'x');
                });

                element.bind('click', function (event) {
                    if ((event.target.offsetWidth - 24) < (event.clientX - event.target.getBoundingClientRect().left)
                        && !ctrl.$isEmpty(ctrl.$viewValue)) {
                        reset();
                    }
                });

                element.bind('mousemove', function (event) {
                    tog((event.target.offsetWidth - 24) < (event.clientX - event.target.getBoundingClientRect().left)
                         && !ctrl.$isEmpty(ctrl.$viewValue), 'onX');
                });

                function tog(cond, cls) {                    
                    cond ? angular.element(element).addClass(cls) : angular.element(element).removeClass(cls);
                }

                function reset() {
                    element.removeClass('x');
                    ctrl.$setViewValue(null);
                    ctrl.$render();                    
                }
            }
        };
    });


// MODULE
var incidentReportApp = angular.module('incidentReportApp', ['ngRoute', 'ngResource', 'controls']);

// ROUTES
incidentReportApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/nextPage', {
        templateUrl: 'pages/nextPage.htm',
        controller: 'nextPageController'
    })
    
});

// SERVICES
incidentReportApp.service('cityService', function() {
   
    this.city = "New York, NY";
    
});


incidentReportApp.run(function($rootScope) {
	angular.element(document).on("click", function(e) {
		$rootScope.$broadcast("documentClicked", angular.element(e.target));
	});
});



// CONTROLLERS
incidentReportApp.controller('homeController', ['$scope', 'cityService', '$http', '$location', function($scope, cityService, $http, $location) {
    
    $scope.city = cityService.city;
    
    $scope.user = "";
    $scope.userInfo  =[];
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
    $scope.colours = {
		High: "Red",
		Low: "Green",
		Medium: "Yellow"
	   };
	$scope.colour = "";
    $scope.selectedUser = "";
    
    $scope.submit = function () {
        if(true) {
                $scope.status = 'The item was saved!';
                $location.path('/nextPage');
        } else{
                $scope.status = 'Unable to save the affected user data: ';
        }
    };
    
    $http.get('json/users.json').success(function(data) {
        $scope.userInfo = data.users;
    });

}]);

incidentReportApp.controller('nextPageController', ['$scope', function($scope) {
}]);