/**
 * Created by mojtaba on 3/10/16.
 */
/*global angular */
((function() {
    'use strict';
    var userList = [
        {id:1,name: 'دمو', email:'demo@pushe.co',password:"1234",roles:[]}
    ];
    var appList = [
        {id:1,name: 'Pushe Sample Eclipse', packname:'co.ronash.pushesampleeclipse'},
        {id:2,name: 'Pushe Sample Android Studio', packname:'co.ronash.pushesampleas'},
        {id:3,name: 'Pushe Sample Unity', packname:'co.ronash.pushesampleunity'},
        {id:4,name: 'Pushe Sample B4A', packname:'co.ronash.pushesampleb4a'},
        {id:5,name: 'دموی پوشه', packname:'co.ronash.pushesample'}
    ];
    angular
        .module('app')
        .config(function($provide) {
            $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        })
        .run(function($httpBackend) {
            $httpBackend.whenGET('/userApp').respond(appList);
            $httpBackend.whenPUT('/userApp').respond(function(method, url, data){
                var dataobj=angular.fromJson(data);
                appList[data.id-1]=dataobj;
                return [200, dataobj, {}];
            });
            //mock has problem with /userApp/:id expression so we just can delete id=1
            $httpBackend.whenDELETE('/userApp/1').respond({success:true});
            $httpBackend.whenPOST('/userApp').respond(function(method, url, data){
                var dataobj=angular.fromJson(data);
                var newData=angular.extend({id:appList.length+1},dataobj);
                appList.push(newData);
                return [200, data, {}];
            });

            $httpBackend.whenPOST('/login').respond(function(method, url, data){
                var dataobj=angular.fromJson(data);
                var list=userList.filter(function(user){ return (user.email===dataobj.email && user.password===dataobj.password); });
                if(list.length){
                    return [200, {user:list[0]}, {}];
                }
                else {
                    return [200, {error:"username or password is wrong"}, {}];
                }
            });
            $httpBackend.whenPOST('/forgotPassword').respond(function(method, url, data){
                var dataobj=angular.fromJson(data);
                var list=userList.filter(function(user){ return (user.email===dataobj.email); });
                if(list.length){
                    return [200, {success:true}, {}];
                }
                else {
                    return [200, {error:"username or password is wrong"}, {}];
                }
            });
            $httpBackend.whenPOST('/register').respond(function(method, url, data){
                var dataobj=angular.fromJson(data);
                var list=userList.filter(function(user){ return (user.email===dataobj.email); });
                if(!list.length){
                    var newData=angular.extend({id:appList.length+1},dataobj);
                    userList.push(newData);
                    return [200, {success:true}, {}];
                }
                else{
                    return [200, {error:"username is taken before"}, {}];
                }
            });

            //$httpBackend.whenGET(/.*/).passThrough();
            //$httpBackend.whenPOST(/.*/).passThrough();
            //$httpBackend.whenDELETE(/.*/).passThrough();
            //$httpBackend.whenPUT(/.*/).passThrough();
            $httpBackend.whenGET(/\.html/).passThrough();
        });
})());