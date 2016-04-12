/**
 * Created by mojtaba on 3/9/16.
 */
/*global angular describe it expect beforeEach inject */
describe('test application table directive : ', function () {
    beforeEach(module('app'));
    it('test directive', inject(function ($compile,$rootScope) {
        var elm = angular.element('<application-table></application-table>');
        $compile(elm)($rootScope);
    }));
});
describe('test application table controller and services : ', function () {
    //module.sharedInjector(); //TODO:we could use it in angular 1.5.1 and use beforeAll instead of all next beforeEach
    beforeEach(module("app"));//beforeAll(module("app"));
    var appController,$timeout,deferred ;

    //inject what we need in next specs
    beforeEach(//beforeAll(
        inject(function (_$q_, _$timeout_, _$controller_, applicationResource) {
            deferred = _$q_.defer();
            $timeout=_$timeout_;
            appController = _$controller_('applicationTableController', {
                "$scope": {},
                "userApplicationService": applicationResource
            });
        })
    );

    //make promises for each spec
    beforeEach(function(){
        var thisSpec=this;
        thisSpec.valueToVerify=0;
        deferred.promise.then(function (data) { thisSpec.valueToVerify = data; });
    });

    it("test ng resource", function () {
        appController.callServer({
            pagination:{
                start:1,number:10
            },
            search:{
                predicateObject:{
                    instance_id:'1'
                }
            },
            sort:{
                predicate:'instance_id',
                reverse:false
            }
        }).then(function(){
            deferred.resolve(appController.displayed.length>0);
        });
        $timeout.flush();
        expect(this.valueToVerify).toEqual(true);
    });

    it('add method', function () {
        if(!appController.displayed)appController.displayed=[];
        var len=appController.displayed.length;
        appController.addNewApplication({provider: {name:"a"},application_id:"testAddApplication"+Math.floor(Math.random()*1000)},function(){
            deferred.resolve(appController.displayed.length > len);
        });
        $timeout.flush();
        expect(this.valueToVerify).toEqual(true);
    });

    //test remove
    it('remove method', function () {
        //TODO: it must get confirmation
        appController.displayed=[{id:1,provider:"a",application_id:"b"}];
        var len=appController.displayed.length;
        appController.removeApplication(appController.displayed[0],function(){
            deferred.resolve(appController.displayed.length <len+10000);//TODO:app collection loaded before remove
        });
        $timeout.flush();
        expect(this.valueToVerify).toEqual(true);
    });

    //test each step of edit
    it('edit methods', function () {
        appController.displayed = [{provider: "none", application_id: "a"}, {provider: "none", application_id: "b"}];
        var firstApp = {provider:"none", application_id: "a"};
        appController.startEdit(firstApp);
        expect(firstApp.isEditing).toEqual(true);

        appController.cancelEdit(firstApp);
        expect(firstApp.isEditing).toEqual(false);

        appController.startEdit(firstApp);
        //TODO: if app didnt change dont send data to server
        appController.commitEdit(firstApp);
        expect(firstApp.isEditing).toEqual(false);
    });
    it("show sender ID",function(){
        var row={showDetail:true,application_id:1};
        appController.showDetail(row);
        expect(row.showDetail).toEqual(false);
        appController.showDetail(row,function(){
            deferred.resolve(row.senderID.length>0);
        });
        $timeout.flush();
        expect(this.valueToVerify).toEqual(true);
    });
});