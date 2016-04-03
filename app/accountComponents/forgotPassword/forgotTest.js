/**
 * Created by mojtaba on 3/12/16.
 */
/*global describe it expect beforeEach inject */
describe('forget password controller : ', function() {
    beforeEach(module('app'));
    var $controller;
    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('controller is defined', function () {
        var controller = $controller('forgotPasswordController', { "$scope": {app:{name:"adminsPanel"}} });
        expect(controller.app.name.length>0).toEqual(true);
    });

    it('test submit', inject(function (_$q_,$timeout) {
        var controller = $controller('forgotPasswordController', { "$scope": {app:{name:"adminsPanel"}} });
        controller.request={
            email:"demo@pushe.co"
        };
        var valueToVerify=0;
        var deferred = _$q_.defer();
        deferred.promise.then(function (data) {valueToVerify = data; });
        controller.forgotPassword().then(function(){
            //deferred.resolve(controller.loginError.length>0);
            deferred.resolve(controller.forgetAlarm.length>0);
        });
        //deferred.reject('There has been an Error!'+err);
        $timeout.flush();
        expect(valueToVerify).toEqual(true);
    }));
});