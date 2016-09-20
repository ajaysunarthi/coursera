angular.module('courseraApp').controller('mainCtrl', mainCtrl);

mainCtrl.inject = ['$http', 'courseraService', '$interval', '$scope', '$location', '$state', '$timeout'];

function mainCtrl($http, courseraService, $interval, $scope, $location, $state, $timeout) {
    var vm = this;

    //In this getCourseData method when the response arrives create a categories object 
    //which will keep track of categories and inside every category will contain 
    //the sites (named it sites because) already a lot of course) i.e. the courses related to particular category

    //create main object which is the whole data we need for catalog and categories route


    function getCourseData() {

        courseraService.getCourses().then(function(response) {

            function createCategories(courseData) {
                if (courseData !== undefined) {
                    var categories = {};
                    for (var i = 0; i < courseData.length; i++) {
                        if (courseData[i].domainTypes !== undefined) {
                            if (!(courseData[i].domainTypes[0].domainId in categories)) {
                                categories[courseData[i].domainTypes[0].domainId] = { 'name': courseData[i].domainTypes[0].domainId, 'sites': [] };
                            }
                        }
                    }
                    vm.categories = categories;
                }

            }

            function createMainObj(data) {
                var arr = [];
                for (var j = 0; j < data.elements.length; j++) {
                    var obj = {};
                    obj["photoUrl"] = data.elements[j].photoUrl;
                    obj["name"] = data.elements[j].name;
                    obj["description"] = data.elements[j].description;
                    obj["domainTypes"] = data.elements[j].domainTypes;
                    obj["partnerIds"] = data.elements[j].partnerIds;
                    obj["slug"] = data.elements[j].slug;
                    arr.push(obj);
                }

                for (var j = 0; j < arr.length; j++) {
                    for (var k = 0; k < data.linked['partners.v1'].length; k++) {
                        if (arr[j]['partnerIds'][0] == data.linked['partners.v1'][k].id) {
                            arr[j]["partnerName"] = data.linked['partners.v1'][k].name
                        }

                    }
                }


                vm.courseData = arr; 
            }

            function pushIntoCategories() {
                for (var i = 0; i < vm.courseData.length; i++) {
                    var p = vm.courseData[i];
                    for (var j = 0; j < p["domainTypes"].length; j++) {
                        vm.categories[p["domainTypes"][j].domainId].sites.push(p);
                    }
                }
            }

            function randomizeCat() {
                // category route shows the 6 random courses from each category, so randomize and get first 6
                for (var key in vm.categories) {
                    if (vm.categories[key].sites.length === 0) {
                        continue;
                    }
                    vm.categories[key].sites.sort(function() {
                        return .5 - Math.random()
                    });
                    vm.categories[key].featured = vm.categories[key].sites.slice(0, 6);
                }

            }

            createCategories(response.data.elements);
            createMainObj(response.data);
            pushIntoCategories();
            randomizeCat();
        });
    }

    // change route on search
    vm.searchQuery = function() {
        if (vm.searchText.length !== 0) {
            $location.path('/search/' + vm.searchText);
            vm.searchText = '';
        };

    };
    // any clicks on categories will come here then show them the courses on particular category
    $scope.$on('$locationChangeStart', function(event, tourl, fromurl) {
        var arr = tourl.split('/');
        if (arr[arr.length - 2] === 'categories' && arr[arr.length - 1] !== "") {
            vm.specificCategory = vm.categories[arr[arr.length - 1]].sites;

        };

    });

    getCourseData();
}
