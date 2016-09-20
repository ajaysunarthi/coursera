angular.module('courseraApp').
controller('searchCtrl', searchCtrl);

searchCtrl.inject = ['$scope', 'courseraService','$state'];

function searchCtrl($scope, courseraService,$state) {
    var vm = this;

    var search = function(query) {
        courseraService.searchCourses(query).then(function(response) {
            vm.searchResults = response.data.elements;
        });
    }

    search($state.params.something);
    



}
