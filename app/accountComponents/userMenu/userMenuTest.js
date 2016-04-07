/**
 * Created by mojtaba on 3/9/16.
 */
/*global angular describe it expect beforeEach inject */
describe('test userMenu directive : ', function () {
    beforeEach(module('app'));
    it('test directive', inject(function ($compile,$rootScope) {
        var elm = angular.element('<user-menu></user-menu>');
        $compile(elm)($rootScope);
    }));
    it('login and logout test', inject(function ($compile,$rootScope,AuthService,Session,$controller, _$q_ ,$timeout) {
        var scope=$rootScope.$new();
        var controller = $controller('userMenuController', {"$scope": scope});
        Session.create(1,1, "", []);
        expect(AuthService.isAuthenticated()).toEqual(true);

        var valueToVerify=0;
        var deferred = _$q_.defer();
        deferred.promise.then(function (data) {valueToVerify = data; });
        controller.logout().then(function(){
            deferred.resolve(!AuthService.isAuthenticated());
        });
        $timeout.flush();
        expect(valueToVerify).toEqual(true);
    }));
});