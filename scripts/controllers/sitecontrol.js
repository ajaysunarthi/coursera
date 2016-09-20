angular.module('courseraApp')
    .controller('siteCtrl', siteCtrl);

siteCtrl.inject = ['$state', 'courseraService'];

function siteCtrl($state, courseraService) {

    var vm = this;

    courseraService.getCourseBySlug($state.params.slug).then(function(response) {
        vm.data = response.data;
        vm.instructors = response.data.linked['instructors.v1'];
        vm.partners = response.data.linked['partners.v1'];
    });
}



