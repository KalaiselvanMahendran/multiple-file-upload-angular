/**
*  Module
*
* Description
*/
var myApp = angular.module('myApp', []);

myApp.directive('fileModel', ['$parse', function($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			var isMultiple = attrs.multiple;
			element.bind('change', function(){
				var values = [];
				angular.forEach(element[0].files, function(item){
					var value = {
						name: item.name,
						size: item.size,
						url: URL.createObjectURL(item),
						_file: item,
						path: item.path
					};
					values.push(value);
				});
				scope.$apply(function(){
					if(isMultiple){
						modelSetter(scope, values);
					}
					else {
						modelSetter(scope.values[0]);
					}
				});
			});
		}
	};
}]);

myApp.controller('myCtrl', function($scope){
	$scope.files = [];
	$scope.Submit = function(){
		console.log($scope.files);
	};
});