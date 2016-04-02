/**
 * Created by mojtaba on 4/2/16.
 */
/*global describe it expect beforeEach inject */
describe('notification steps : ', function() {
    beforeEach(module('app'));
    var $controller;
    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('step 6 controller test working', inject(function ($rootScope) {
        var $scope = $rootScope.$new();
        $scope.$context={data:1,behavior:{leaving:function(){}}};
        $controller('step6Controller', {$scope:$scope});
        expect($scope.step6Ctrl).toBeDefined(true);
    }));

    it('is IMEI test', inject(function ($rootScope) {
        var $scope = $rootScope.$new();
        $scope.$context={data:1,behavior:{leaving:function(){}}};
        $controller('step6Controller', {$scope:$scope});
        expect($scope.step6Ctrl.isIMEI("3213211")).toBe(false);
        expect($scope.step6Ctrl.isIMEI("165216516514621")).toBe(false);
        expect($scope.step6Ctrl.isIMEI("359492064832138")).toBe(true);
    }));
});