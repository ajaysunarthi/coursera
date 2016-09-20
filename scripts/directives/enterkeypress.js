angular.module('courseraApp').directive('myOnKeyDownCall', myOnKeyDownCall);

//search on enter, applied on searchbar

function myOnKeyDownCall() {

    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.myOnKeyDownCall);
                    });
                    event.preventDefault();
                }
            });
            scope.$on('$destroy', function(){ element.unbind('keydown keypress'); });
        }
    };

}
