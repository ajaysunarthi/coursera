angular.module('courseraApp').service('courseraService', courseraService);

courseraService.inject = ['$http', 'q'];

function courseraService($http, $q) {
    this.$http = $http;
    // for getting a list of courses return promise
    this.getCourses = function() {
        var defaulturl = "api/courses.v1?limit=150&includes=partnerIds&fields=id,name,description,photoUrl,domainTypes,partnerIds";
        return this.$http.get(defaulturl)
    };
    //for searching a course
    this.searchCourses = function(query) {
    	var url = '/api/courses.v1?limit=60&q=search&query=' + query + '&includes=instructorIds,partnerIds&fields=id,name,description,partnerLogo,photoUrl,domainTypes,instructorIds,partnerIds,instructors.v1(photo150,id),partners.v1(banner)';
    	return this.$http.get(url)	
    };
    //search course with a given slug
    this.getCourseBySlug = function(slug) {
    	var url = '/api/courses.v1?q=slug&slug='+slug+'&includes=instructorIds,partnerIds&fields=id,name,description,photoUrl,partnerLogo,instructors.v1(photo)';
    	
        return this.$http.get(url)	
    }
}

