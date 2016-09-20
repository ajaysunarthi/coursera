angular.module('courseraApp')
    .directive('backImg', backImg);
//directive used to give background image to a div
function backImg() {

    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            attrs.$observe('backImg', function(value) {
                elem.css({
                    'background-image': 'url(' + value + ')',
                    'background-size': 'cover'
                });
            });
        }

    }
}
