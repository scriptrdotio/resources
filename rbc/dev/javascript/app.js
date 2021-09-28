angular
      .module('HttpClient', [ 'ngCookies' ])
      .provider(
      		'httpClient',
            function httpClientProvider() {
                var _baseUrl = "";
	            var _token = null;
	            var _restUrl = "";
	            
	            var self = this;

	            this.setBaseUrl = function(textString) {
		            _baseUrl = textString;
		            console.log(_baseUrl)
	            };

	            this.setToken = function(textString) {
		            _token = textString;
		            console.log(_token)
	            };

	            var _buildUrl = function(scriptName) {
		            _restUrl = _baseUrl + "/" + scriptName;
		            console.log(_restUrl)
	            };

	            this.$get = [
	                  "$cookies",
	                  "$q",
	                  "$http",
	                  function wsFactory($cookies, $q, $http) {

		                  if ($cookies.get("token")) {
			                  _token = $cookies.get("token");
		                  }

		                  var setDefaultObject = function(obj, key, value) {
			                  if (!obj || !obj[key]) {
				                  if (!obj) {
					                  obj = {};
				                  }
				                  obj[key] = value;
			                  }
			                  return obj;
		                  }

		                  var httpRequest = function(scriptName, config) {

			                  var d = $q.defer();
			                  // Build base rest Url
			                  _buildUrl(scriptName);

			                  config["url"] = _restUrl;

                              if(_token) {
                                  config["headers"] = setDefaultObject(
			                        config["headers"], "Authorization", "Bearer "
			                              + _token);
                              }
			                  

			                  $http(config)
			                        .then(
			                              function(response) {
				                              if (response.data) {
                                                  if(!response.data.response){
                                                      if(response.data.metadata.success){
                                                          response.data.metadata.statusCode = "200";
                                                          response.data.metadata.status = "success"
                                                      }
                                                  }
					                              var data = response.data.response ? response.data.response  : response.data;
					                              if (data.metadata.statusCode == "200"
					                                    && data.metadata.status == "success") {
						                              if (data.result
						                                    && data.result.metadata) {
							                              // Check for nested scriptr response
							                              if (data.result.statusCode == "200"
							                                    && data.result.status == "success") {
								                              d.resolve(
								                                    data.result.result ? data.result.result : data.result,
								                                    response);
							                              } else {
								                              d.reject(
								                                          data.result.metadata,
								                                          response);
							                              }
						                              } else {// No Nested scriptr response
							                              d.resolve(data.result,
							                                    response);
						                              }
					                              } else {// Not a success, logical failure
						                              d.reject(data.metadata,
						                                    response);
					                              }
				                              }
			                              }, function(err) {
                                              console.log("ERROR", err)
                                              if(err.status == "429") {
                                                if($("body").find(".alert-transport").length == 0) {
                                                	$("body").append("<div class=\"alert alert-danger alert-dismissable alert-transport\" style=\"position: absolute; z-index: 1000; top: 0; width: 600px; left: 30%; text-align: center\">You have reached you requests rate limit. For more info check the <a href=\"https://www.scriptr.io/documentation#documentation-ratelimitingRateLimiting\" target=\"blank\">documentation.</a><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button></div>")
                                            	}
                                         		console.error("You have reached your requests rate limit. For more info check the documentation. https://www.scriptr.io/documentation#documentation-ratelimitingRateLimiting")   
                                        	  }
                                              if(err.data && err.data.response && err.data.response.metadata)
				                              	d.reject(err.data.response.metadata);
                                              else
                                                d.reject(err);  
			                              });
			                  return d.promise;
		                  };

		                  var methods = {
		                     get : function(scriptName, params) {
			                     var config = {
				                     "method" : "GET"
			                     };
			                     config.params = params;
			                     return httpRequest(scriptName, config);
		                     },

		                     post : function(scriptName, data, headers, hasAttachments) {
			                     var config = {
				                     "method" : "POST"
			                     };
			                     config["data"] = data;

			                     if (headers) {
				                     config["headers"] = headers;
			                     }

                                 if(!headers || !headers["Content-Type"]) {
                                     config["headers"] = setDefaultObject(
			                        	config["headers"], "Content-Type", "application/json");
                                 }
                                 
                                 if(hasAttachments) {
                                    config["headers"]["Content-Type"] =  undefined;
      							 	config["transformRequest"]= angular.identity
                                 }
			                     return httpRequest(scriptName, config);
		                     },
		                     
		                     updateToken: function(token) {
		                     	self.setToken(token);
		                     }
		                  };
		                  return methods;
	                  }];
            });

var wssConfig = ["wsClientProvider",function (wsClientProvider) {
    wsClientProvider.setPublishChannel("requestChannel");
    var subscribeChannels = ["responseChannel"]
    
    // subscribe to channels named after groups cc-[city name] for the command center map to auto-update
    var ugs = JSON.parse(localStorage.getItem('user')).groups;
    for(ug in ugs) {
        if (ugs[ug].startsWith('cc-')) {
            subscribeChannels.push(ugs[ug]);
        }
    }

    wsClientProvider.setSubscribeChannel(subscribeChannels);
    wsClientProvider.setBaseUrl(websocketUrl);
}];

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
}]






/*
var userGroups = JSON.parse($.cookie().user).groups ? JSON.parse($.cookie().user).groups : [];
if(typeof(userGroups) == "string"){
    userGroups = [userGroups]
}
*/ 

var un = JSON.parse(localStorage.getItem('user'));
var ugs = un.groups;
console.info('user ' + un.name + ' in groups ' + ugs);

var headerItems = {
    "logo": "{{cdnImagesPath}}saepioLogo2.png",
    "items": [
       
        	{"id": "14", "icon": "fa fa-fw fa-tachometer", 			"label": "Dashboard", 	"route": "#/dashboard-home", "active": "false" },
  		// {"id": "13", "icon": "fa fa-dot-circle-o", "label": "Cluster Detection",  "route": "#/heatMap", "roles": ["quarantine-agent"]},
        {"id": "13", "icon": "fa fa-dot-circle-o", "label": "Cluster Detection",  "route": "#/heatMap", "roles": ["quarantine-agent"]},
        {"id": "2", "icon":"fa fa-users", "label": "Users", "roles": ["quarantine-agent", "admin-uploader"], "subitems": [
            {"id": "3", "iconClass": "fa fa-key","label": "All Users", "route": "#/quarantineUsers", "roles": ["quarantine-agent"]},
  
             {"id": "7", "iconClass": "fa fa-key", "label": "Import Users", "route": "#/admin", "roles": ["admin-uploader"]}
        ]},
        
        
        {"id": "8", "icon": "fa fa-search", "label": "Contact Tracing ", "roles": ["admin-trace"], "subitems": [
            {"id": "9", "iconClass": "fa fa-key", "label": "User tracing", "route": "#/trace", "roles": ["admin-trace"]},
            {"id": "10", "iconClass": "fa fa-key", "label": "Users at risk", "route": "#/contactPositive", "roles": ["admin-trace"]},
            {"id": "11", "iconClass": "fa fa-key", "label": "Investigated users", "route": "#/investigatedUsers", "roles": ["admin-trace"]}
        ]}, 
        

    ],
    
    "subitems": [
        {"id":"1", "iconClass":"fa fa-key", "label": "Change Password", "route":"#/changePassword"}
    ], 
    
    "logout": {"icon": "fa fa-sign-out", "label": "Logout", "route":"#/logout"}
};

var routingItems = {
    "params": [
        {"route": "map", "template": "/app/view/html/views/map/map.html", "controller": "mapCtrl as vm"},
                //{"route": "heatMap", "template": "/app/view/html/views/map/heatMap.html", "controller": "mapCtrl as vm"},
        {"route": "map/deviceId/:deviceId*", "template": "/app/view/html/views/map/map.html", "controller": "mapCtrl as vm"},
        {"route": "dashboard-home", "template": "/app/view/html/views/dashboard/dashboard-home2.html", "controller": "dashboardHomeCtrl as vm"},
        {"route": "heatMap", "template": "/app/view/html/views/dashboard/cluster-detection2.html", "controller": "clusterDetectionCtrl as vm"},			

        {"route": "dashboard/branchId/:branchId*", "template": "/app/view/html/views/dashboard/dashboard2.html", "controller": "dashboardCtrl as vm"},
                {"route": "dashboard3/branchId/:branchId*", "template": "/app/view/html/views/dashboard/dashboard-details.html", "controller": "dashboardCtrl3 as vm"},
        {"route": "pauseRequests", "template": "/app/view/html/views/users/pause-requests.html", "controller": "pauseRequestCtrl as vm"},
        {"route": "notInQuarantine", "template": "/app/view/html/views/users/not-in-quarantine.html", "controller": "notInQuarantineCtrl as vm"},
        
        {"route": "users", "template": "/app/view/html/views/users/users-home.html", "controller": "devicesHomeCtrl as vm" },

        {"route": "quarantineUsers", "routeDef": {isInQuarantine: true}, "template": "/app/view/html/views/users/users-home.html", "controller": "devicesHomeCtrl as vm"},
        {"route": "pausePermit", "routeDef": {isPausePermit: true}, "template": "/app/view/html/views/users/users-home.html", "controller": "devicesHomeCtrl as vm"},
        {"route": "investigatedUsers", "routeDef": {isInvestiagtedUsers: true}, "template": "/app/view/html/views/users/users-home.html", "controller": "devicesHomeCtrl as vm"},

        {"route": "settings-home", "template": "/app/view/html/views/settings/settings-home.html", "controller": "settingsHomeCtrl as vm"},
        {"route": "changePassword", "template": "/app/view/html/views/login/changePassword.html", "controller": "changePasswordCtrl"},
        {"route": "admin", "template": "/app/view/html/views/admin/admin-home.html", "controller": "adminFormCtrl as vm" },
        {"route": "trace", "template": "/app/view/html/views/admin/trace.html", "controller": "traceCtrl as vm"},

        {"route": "contactPositive", "template": "/app/view/html/views/admin/contactPositive.html", "controller": "contactPositiveCtrl as vm"},
        {"route": "trace/deviceId/:deviceId*", "template": "/app/view/html/views/admin/trace.html", "controller": "traceCtrl as vm"},
        /*  {"route": "extractedDevices", "template": "/app/view/html/views/admin/extractedDevices.html", "controller": "extractedDevicesCtrl as vm"},*/

        {"route": "logout", "template": "/app/view/html/logout.html"}
    	
    ]
};

var groupsLandingPagesItems = {
    "quarantine-agent": "/dashboard-home",
    "admin-trace": "/trace",
    "admin-uploader": "/admin",
    "default": "/"
}




var myApp = angular.module('myApp', [
    "Layout", 
    "List",
    "underscore", 
	"btford.markdown", 
	"schemaForm", 
	"Accelerometer", 
	"Button", 
	"Slider", 
	"ToggleSwitch", 
	"Grid", 
	"Map", 
	"Alert", 
	"xeditable", 
	"ui.bootstrap", 
	"ngRoute", 
	"slickCarousel", 
	"ngAnimate", 
	"ngSanitize", 
	"WsClient", 
	"HttpClient", 
	"DataService", 
	"Chart", 
	"gridster",
	"Gauge",
	"Speedometer", 
	"Odometer",
	"SearchBox", 
	"ngMaterial", 
	"ngMessages", 
	"material.svgAssetsCache", 
	"Thermometer", 
	"angularSpectrumColorpicker",
	"angular-underscore/filters", 
	"ui.codemirror",  
	"Dygraphs", 
	"mgcrea.ngStrap", 
	"mgcrea.ngStrap.modal",
    "pascalprecht.translate",
    'ui.select', 
    'ui.highlight',
    'mgcrea.ngStrap.select',
	"Display",
    "QmcSearch",
    "QmcGrid",
    "QmcForms",
    "ngSchemaFormFile",
    "Imagemap",
    //"Plotly"
]);

myApp
    .constant("headerItemsJson", JSON.parse(Handlebars.compile(JSON.stringify(headerItems))({"cdnImagesPath": cdnImagesPath})))
    .constant("routingJson", routingItems)
	.constant("groupsLandingPages", groupsLandingPagesItems)
    .config(httpsConfig)
    .config(wssConfig)
    .config(['$routeProvider', 'routingJson', '$sceProvider', 'groupsLandingPages', function($routeProvider, routingJson, $sceProvider, groupsLandingPages){
    for(var i = 0; i < routingJson.params.length; i++){
        $routeProvider
            .when("/" + routingJson.params[i].route, {
                    templateUrl: routingJson.params[i].template,
                    controller: routingJson.params[i].controller,
            		reloadOnSearch: false,
            		routeDef : routingJson.params[i].routeDef
            })
    }

    var userGroups = JSON.parse($.cookie().user).groups ? JSON.parse($.cookie().user).groups : [];
    if(typeof(userGroups) == "string"){
        userGroups = [userGroups]
    }
    
    var landingOptions = _.keys(groupsLandingPages);
    var availableOptions = _.intersection(landingOptions, userGroups);
    if(availableOptions && availableOptions.length > 0)
        $routeProvider.otherwise(groupsLandingPages[availableOptions[0]]); //groupsLandingPages is listed by priority
    else
        $routeProvider.otherwise(groupsLandingPages["default"])
}]); 

myApp.filter('noDecimals', function() {
    return function(input) {
        if(!input) return "N/A";
        return Math.floor(input) ;
    };
});

myApp.filter('lastScan', function() {
    return function(input) {
        if(!input) return "N/A";
        return  moment(parseFloat(input, "MM/DD/YYYY")).calendar();;
    };
});
myApp.filter('startDate', function() {
  return function(input) {
      if(!input) return;
      var f = moment(parseFloat(input)).toNow(true);
       return f.charAt(0).toUpperCase() + f.slice(1);

     // return f.charAt(0).toUpperCase() + f.slice(1);
      // return moment(parseFloat(input*1000)).fromNow(true);
  };
});
myApp.filter('timeRemaining', function() {
  return function(input) {
      if(!input) return;
      var f = moment(parseFloat(input)).fromNow(true);
      return f.charAt(0).toUpperCase() + f.slice(1);
      // return moment(parseFloat(input*1000)).fromNow(true);
  };
});

myApp.filter('idOnly', function() {
    return function(input) {
      if(!input) return 'N/A';
      return input.split('_')[0];
    };
});

myApp.filter('setPath', ['$sce', function($sce){
    return function(input, data) {
      if(!input) return input;
      return Handlebars.compile($sce.getTrustedHtml(input))(data);
    };
}])

myApp.constant(
    "infoWindowActions",
    {
        'endQuarantine': {
            'title': 'End Quarantine',
            'form': [
                {
                    'type': 'section',
                    'htmlClass': 'col-xs-12',
                    'items': [
                        {
                            'type': 'section',
                            'items': [{
                                'key': 'comment',
                            }]
                        }
                    ]
                }
            ],
            'schema': {
                'type': 'object',
                'title': 'Schema',
                'properties': {
                    'comment': {
                        'title': 'Comment',
                        'type': 'string',
                        'x-schema-form': {
                            'type': 'textarea',
                            'placeholder': 'Ex: Ending quarantine after developing antibodies.'
                        }
                    }
                },
                'required': [
                    'comment'
                ]
            }
        },
        'sendSMS': {
            'title': 'Send SMS',
            'form': [
                {
                    'type': 'section',
                    'htmlClass': 'col-xs-12',
                    'items': [
                        {
                            'type': 'section',
                            'items': [{
                                'key': 'comment',
                            }]
                        }
                    ]
                }
            ],
            'schema': {
                'type': 'object',
                'title': 'Schema',
                'properties': {
                    'comment': {
                        'title': 'Comment',
                        'type': 'string',
                        'x-schema-form': {
                            'type': 'textarea',
                            'placeholder': ''
                        }
                    }
                },
                'required': [
                    'comment'
                ]
            }
        },
    
        "pauseQuarantine": {
            'title': 'Pause Quarantine',
            "form": [
                {
                    "type": "section",
                    "items": [
                        	{
                                "type": "section",
                                "htmlClass": "col-xs-12",
                                "items": [{
                                    "key": "time",
                                }]
                            }
                    ]
                },
                {
                    "type": "section",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "col-xs-12",
                            "items": [{
                                "key": "comment",
                            }]
                        },
                    ]
                }
            ],
            "schema": {
                "type": "object",
                "title": "Schema",
                "properties": {
                    "time": {
                       "type": "number",
                        "title": "Time (minutes)"
                    },
                    "comment": {
                        "title": "Comment",
                        "type": "string",
                        "x-schema-form": {
                            "type": "textarea",
                            "placeholder": "Ex: Pausing quarantine for couple of hours until doctor checkup."
                        }
                    }
                },
                "required": [
                    "time", "comment"
                ]
            }
        }
    }
)
myApp.controller('mapCtrl', ['wsClient', '$location', '$scope', 'constants', '$routeParams', 'httpClient', '$sce', '$interval', '$timeout', '$uibModal', 'infoWindowActions', function(wsClient, $location, $scope, constants, $routeParams, httpClient, $sce, $interval, $timeout, $uibModal, infoWindowActions) {
    var vm = this;
    vm.showResultLoading = false;
    vm.deviceKey = null;
	vm.testResult = null;
	vm.testResultColor = null;
    vm.testDate = null;
    vm.sources = constants.sources;
    vm.icons = constants.infoWindows.icons;
    vm.infoWindowActions = infoWindowActions;
    
    vm.message = {};
    vm.hasAlert = false;
    
    vm.showAlert = function(type, content) {
        vm.hasAlert = false;
        vm.message = {
            "type" : type,
            "content" : content
        }
        vm.hasAlert = true;
    }
    
    vm.closeAlert = function() {
      vm.hasAlert = false;
   }

    
    vm.cdnImagesPath = cdnImagesPath; //Global Variable
        
    vm.callApi = function(apiName, params, desc) {
        vm.closeAlert();
        console.log('calling callAPI api <' + apiName + '> with params <' + JSON.stringify(params) + '>');
    	httpClient
        .post(apiName, params)
        .then(
        function(data, response) {
            vm.showAlert('success', desc + ' successful')
            console.log(data);
        },
        function(err) {
            vm.showAlert('danger', desc + ' failure: ' + (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en? err.data.metadata.description.en: 'unknown error'));
            console.log(err);
        });

    }
    
    vm.displayUserId = function(marker) {
        var x = false;
        if (marker.details.userId && marker.details.userId.value && marker.details.userId.value.trim() != '') {
            x = true;
        }
        return x;
    }
    
    vm.displayPassport = function(marker) {
        var x = false;
        if (!vm.displayUserId(marker) && marker.details.passport && marker.details.passport.value && marker.details.passport.value.trim() != '') {
            x = true;
        }
        return x;
    }
    
    vm.displayOther = function(marker) {
        var x = false;
        if (!vm.displayUserId(marker) && !vm.displayPassport(marker) && marker.details.id && marker.details.id.trim() != '') {
            x = true
        }
        return x;
    }
    
    vm.loadOverlay = function(marker, overlayForm, backendApi) {
        vm.closeAlert();
        var of = angular.copy(overlayForm);
        var formWidget = {
            'label': of.title,
            'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
            'schema': angular.copy(of.schema),
            'form': angular.copy(of.form),
            'options': {}
        }
	    var self = this;
    	var modalInstance= $uibModal.open({
        	animation: true,
	        component: 'scriptrQmcFormOverlay',
    	    size: 'lg',
        	scope: $scope,
	        resolve: {
    	    	widget: function() {
        			return formWidget;
    			}
        	}
    	});
        
        modalInstance.result.then(function (wdgModel) {
            if(wdgModel != 'cancel') {
                console.log('Model Data', wdgModel);
                var successHandler = function(data) {
                    vm.showAlert('success', of.title + ' successful')
                }
                var failureHandler = function(err) {
                    vm.showAlert('danger', of.title + ' failure: ' + err.errorDetail);
                }
                wdgModel.deviceId = marker.details.id.value;
                vm.callBackendApiPost(backendApi, wdgModel, successHandler, failureHandler) 
            }
        }, function () {
            console.info('modal-component for widget update dismissed at: ' + new Date());
        });
    }
    
    vm.callBackendApiGet = function(apiId, parameters, successHandler, failureHandler) {
        console.log('GET calling backend api <' + apiId + '> with params ' + JSON.stringify(parameters));
        vm._callBackendApi(apiId, parameters, 'G', successHandler, failureHandler);
    }
    
    vm.callBackendApiPost = function(apiId, parameters, successHandler, failureHandler) {
        console.log	('POST calling backend api <' + apiId + '> with params ' + JSON.stringify(parameters));
        vm._callBackendApi(apiId, parameters, 'P', successHandler, failureHandler);
    }
    
    vm._callBackendApi = function(apiId, parameters, method, successHandler, failureHandler) {
        var httpMeth = httpClient.post;
        if (method == 'G') {
            httpMeth = httpClient.get;
        }
        
    	httpMeth(apiId, parameters)
        .then(
        function(data, response) {
            console.log(data);
            if (data && data.status && data.status == 'failure') {
            	if (typeof failureHandler === 'function') failureHandler(data);
            } else {
	            if (typeof successHandler === 'function') successHandler(data);
            }
        },
        function(err) {
            console.log(err);
            if (typeof failureHandler === 'function') failureHandler(err);
        });
    }
    

   vm.getJobStatus = function(api,params,timeout,successFnc, failureFnc){
        var checkInterval = 1;
        if(timeout > 0 ){
            timeout = timeout - checkInterval;
             httpClient.post(api, params, null,false).then(
                function(data) {
             		console.dir(data);
                    if(data.jobStatus == "complete"){
                        var jobResult = JSON.parse(data.jobResult);
                        if(jobResult.resultJSON.response.metadata.status == "success"){
                            successFnc(jobResult.resultJSON.response.result);
                        	return;
                        }else{
                              failureFnc("An error occurred, please try again later.");
                        }
          
                    }
                    var nextFireTime = checkInterval * 1000;
                    setTimeout(vm.getJobStatus, nextFireTime,api,params,timeout,successFnc, failureFnc);
            },function(ex){
                 failureFnc(ex);
            });
        }else{
            failureFnc("TIME_OUT");
        }
    };
    
    vm.updateData = function(devId){
        console.log("Getting an update for info window");
        vm.showResultLoading = true;
     
        var params = {"deviceId": devId};
        var fd = new FormData();
        for ( var key in params ) {
            fd.append(key, params[key]);
        }
        httpClient.post("admin/profile/accountDetailsJob", params, null, false).then(
            function(data, response) {
                if(data.status == "failure") {
                    console.log("failure");
                } else {
                     vm.getJobStatus("admin/profile/accountDetailsJob", {jobId:  data.jobId }, 30, function (res){
                         vm.testDate = res.date ? res.date : "Not available";
                         vm.testResult = res.riskMessage.en;
                         vm.testResultColor = res.risk;
                         vm.showResultLoading = false;
                    },function(err){
                         vm.showResultLoading = false;
                         console.log("reject", err.data.metadata.description.en); 
                    })
                } 
            }, function(err) {
                  vm.showResultLoading = false;
                console.log("reject", err.data.metadata.description.en);
            }
        );
    }
    vm.go = function(path) {
        $location.path(path)
    }
    
    vm.init = function() {
        vm.frmGlobalOptions = {
            "destroyStrategy" : "remove",
            "formDefaults": {"feedback": true}
        }
         if($routeParams && $routeParams.deviceId) {
             vm.deviceKey = $routeParams.deviceId;
             vm.params = {"id":  vm.deviceKey }
             vm.tag = "dashboard_" +  vm.deviceKey;
         }
        
         
         wsClient.onReady.then(function () {
             // Subscribe to socket messages with widget id removeDeviceFromMap, to broadcast an event to map to remove the device entry
             wsClient.subscribe("removeDeviceFromMap", function(data, response) {
                   $scope.$broadcast("mapRemoveAssets",  data);
             }, $scope.id);
         });
        
    }
    
    vm.onSelectAsset = function(data) {
        if(data){
            vm.selectedDevice = data;
            vm.params = {"id": data.assetId}
        }
        /**if($routeParams && $routeParams.deviceId != data.assetId )
        		$location.path("/map/deviceId/"+data.assetId)
               **/
    }
    
    vm.setMarkerIcon = function(data, marker){
     // the below causes the initial marker to show with the correct uae project icons,
     // but subsequently upon handling a "publish" the updated marker is shown with a car icon
     // commenting the below line to keep using the same logic with the marker icon when there's an automatic update
     //   if(marker.pointRef == 0) {
            marker.icon = JSON.parse(Handlebars.compile(JSON.stringify(constants.quarantineState[(marker.details.quarantineState && marker.details.quarantineState.value) ? marker.details.quarantineState.value :"default"]["mapMarker"]))({"cdnImagesPath": vm.cdnImagesPath}));
            if(data.alert.value == "on") {
                    marker.animation = google.maps.Animation.BOUNCE;
            }  
     //   }
        return marker
    }
}]);
    
myApp.controller('menuCtrl', ['headerItemsJson', function(headerItemsJson) {
    var vm = this;
    vm.headerItems = headerItemsJson;
    vm.user = JSON.parse($.cookie('user'));
     
}]);

myApp.controller('settingsHomeCtrl', ['httpClient', '$routeParams', 'constants', function(httpClient, $routeParams, constants) {
       var vm = this;
       vm.init = function(){
       }
		
}]);


myApp.controller('dashboardHomeCtrl', ['$location', '$scope', '$rootScope', 'httpClient', '$sce', '$timeout', '$interval', '$routeParams', '$mdDialog', 'constants', function( $location,$scope,$rootScope,httpClient, $sce, $timeout, $interval, $routeParams, $mdDialog, constants) {
    var vm = this;
    vm.sources = constants.sources;
    vm.icons = constants.infoWindows.icons;
    vm.cdnImagesPath = cdnImagesPath; //Global Variable
    vm.view = "dashboard"; 
    vm.user =  JSON.parse($.cookie('user'));
    vm.gridsterOptions = {
        floating: true,
        defaultSizeY: 50,
        defaultSizeX:50,
        minRows: 1, // the minimum height of the grid, in rows
        maxRows: 100,
        columns: 10, // the width of the grid, in columns
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: '50', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [10, 10], // the pixel distance between each widget
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        mobileBreakPoint:480, // if the screen is not wider that this, remove the grid layout and stack the items
        minColumns: 1, // the minimum columns the grid must have
        resizable: {
            enabled: false
        },
        draggable: {
            enabled: false
        }
    };
    vm.highAlerts = null;
    vm.transientAlerts = null;
    vm.branchesData = null;
    vm.changeState = function(value) {
        vm.view = value;
    }
    
    vm.init = function() {
        var refreshInterval =  30;
        //Load Section 1 data
        vm.getHighAlertData();
        vm.getTransientAlertData();
        vm.refreshTimer = $interval(
            function(){
                vm.getTransientAlertData()
            }, refreshInterval * 1000);
        vm.getBranchesData();
        vm.getTopBranchesData();
    };
    
    /**  vm.highOccupancyBreachesColDef = [{headerName: "Branch Name", field: "name"},{headerName: "Average occupancy", field: "average",   autoHeight: 'true'}];**/
    /**  address: "649 Yonge St, Barrie, ON L4N 4E7, Canada"
alert: true
average: 55
floors: [{…}]
id: "649_Yonge"
lat: 44.3562902
latitude: 44.3562902
long: -79.6454961
longitude: -79.6454961
max: 95
maxOccupancy: 95
min: 0
name: "649 Yonge"
optimal: 48**/
    vm.colorRows = function(params) {
        if (params.data.alert == true) {
            return 'rag-alert';
        }
    }
    vm.allBranchesColDef = [{headerName: "Branch Name", field: "name"},
                            {headerName: "Address", field: "address", width: 200, cellClass: "textWrap"},
                            {headerName: "Floors", field: "floors", cellRenderer: function(params) {
                                return params.value.length;
                            } },
                            {headerName: "Max Occupancy", field: "max"},
                            {headerName: "Optimal Occupancy", field: "optimal"},
                            {headerName: "Current occupancy", field: "average",   autoHeight: 'true'},
                            {
                                headerName: "Actions", field: "id", editable : false, 
                                cellRenderer: function(params) {
                                    var eDiv = document.createElement('div');
                                    var zButton;
                                    eDiv.innerHTML = '<button class="btn btn-primary btn-approve">View Details</button>';
                                    zButton = eDiv.querySelectorAll('.btn-approve')[0];
                                    zButton.addEventListener('click', function() {
                                        vm.viewDetails(params);
                                    });
                                    return eDiv;
                                } 
                            }];
   
        vm.topBreachesColDef = [{headerName: "Name", field: "name"},
                                {headerName: "Branch Name", field: "branchName"},
                                  {headerName: "Count", field: "breachCount"},
                          ];
    
    vm.getHighAlertData = function() {
        //Load Section 1 data
        httpClient.get("rbc/api/getHighAlertData", vm.params).then(
            function(data, response) {
                vm.highAlerts = data;
                console.log("High alerts", data)
            },
            function(err) {
                console.log('ERROR', err);
            });
    };
    vm.getTransientAlertData = function() {
        //Load Section 1 data
        httpClient.get("rbc/api/getTransientAlertData", vm.params).then(
            function(data, response) {
                vm.transientAlerts = data;
                console.log("Transient Data", data)
            },
            function(err) {
                console.log('ERROR', err);
            });
    };
    vm.highOccupancyBreachesData = null;
    vm.branchesMapData = null;
    vm.topBreachesData = null;
    vm.getTopBranchesData = function() {
        //Load Section 1 data
        httpClient.get("rbc/api/getBreaches/top", vm.params).then(
            function(data, response) {
                vm.topBreachesData = data;
                vm.topBreachesChart = [{
                    x: _.pluck(data, "name"),
                    y: _.pluck(data, "breachCount")
                }]
                console.log("Top Breaches Data", data)
            },
            function(err) {
                console.log('ERROR', err);
            });
    };
    
    vm.getBranchesData = function() {
        //Load Section 1 data
        httpClient.get("rbc/api/getBranches", vm.params).then(
            function(data, response) {
                vm.allBranchesData = data;
                vm.allBranchesFilteredData = angular.copy(data);
                console.log("All Branches Data", vm.branchesData)
                // vm.highOccupancyBreachesData = _.where(data, {"alert": true});
                // console.log("High Occupancy Breaches Data", vm.highOccupancyBreachesData)
                vm.branchesMapData = vm.format(data);
                console.log("Branches Map Data", vm.branchesMapData)
            },
            function(err) {
                console.log('ERROR', err);
            });
    };
    vm.setMarkerIcon = function(data, marker){
        var markerIcon = constants.source[marker.details.type.value][(marker.details.alert && marker.details.alert.value) ? "alert" :"normal"]["mapMarker"]
        
        marker.icon = JSON.parse(Handlebars.compile(JSON.stringify(markerIcon))({"cdnImagesPath": vm.cdnImagesPath}));
        if(data.alert.value == true) {
            marker.animation = google.maps.Animation.BOUNCE;
        }  
        return marker;
    }
    vm.onSelectAsset = function(data) {
        return;
    }
    vm.format = function(data){
        var result = {};
        for(var index = 0; index < data.length; index++ ){
            var datum = data[index];
            if(!datum.latitude){
                continue;
            }
            datum["lat"] =  Number(datum.latitude);
            datum["long"] =  Number(datum.longitude);
            if(result[datum.id] == null){
                result[datum.id] = {
                    "0": [],
                    "order": ["0"],
                    "source": datum.source || "simulator"
                };
            }
            var point = _.mapObject(datum, function(value, key){ return {"value": value}; });
            if(point.creationDate == null)  point.creationDate = {"value": (new Date()).toISOString()};
            result[datum.id]["0"].push(point);
        }
        return result;
    }
    vm.viewDetails = function(params) {
        if(params){
            vm.selectedBranch = params;
        }
        if($routeParams && $routeParams.branchId != params.value)
            $location.path("/dashboard/branchId/"+params.value)
            }
    vm.viewDetailsByName = function(params) {
        if(params){
            vm.selectedBranch = params.replace(/ /g,"_");
        }
        if($routeParams && $routeParams.branchId != params.replace(/ /g,"_"))
            $location.path("/dashboard/branchId/"+params.replace(/ /g,"_"))
   }
    
    
    
   vm.filterText = null;
    
   vm.hasFilterText = function(sectionContent){
        if(vm.filterText == undefined || vm.filterText == null || vm.filterText == "" || JSON.stringify(_.values(sectionContent)).toLowerCase().indexOf(vm.filterText.toLowerCase()) != -1) {
            return true;
        } else {
            return false;
        }
   };
    
   vm.filterData = function(value) {
       $scope.$broadcast("runExternalFilter-allBranchesFilteredData", {})
   }
   
    
    vm.filterListGrid = function(node) {
        if(vm.filterText != undefined && vm.filterText != null && vm.filterText != "")
        	return JSON.stringify(node.data).toLowerCase().indexOf(vm.filterText.toLowerCase()) !=-1;
        else
            return true;
    }
    
    vm.isListGridFilterPresent = function() {
         return !(vm.filterText == undefined && vm.filterText == null && vm.filterText == "")
    }
    
    
    vm.topBreachesTracesConfig = [{
        type: 'scatter',
        name :"Employees Top Breaches",
        mode: 'markers',
        marker: {
        color: '#E06364',
        line: {
          color: 'rgba(156, 165, 196, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 25
      }
    }];
    
    vm.topBreachesLayoutConfig = {
        "title":false,
        "margin":{
            "l":25,
            "r":15,
            "b":20,
            "t":20
        },
        "xaxis":{
            "showgrid":false,
            "showline": false,
            "title":"Employees Name",
            "titlefont":{
                "font":{
                    "color":"rgb(204, 204, 204)"
                }
            },
            "tickfont":{
                "font":{
                    "color":"rgb(102, 102, 102)"
                }
            },
            "ticks":"outside"
        },
        "yaxis":{
            "showgrid": false,
            "showline": false,
            "title":"Breaches Count by Day",
            "titlefont":{
                "font":{
                    "color":"rgb(204, 204, 204)"
                }
            },
            "tickfont":{
                "font":{
                    "color":"rgb(102, 102, 102)"
                }
            }
        },
        "hovermode": 'closest',
        "legend":{
            "font":{
                "size":10
            },
            "yanchor":"top",
            "y":0.99,
            "xanchor":"left",
            "x":0.01,
            "orientation":"v"
        }
    }
}]);
myApp.controller('dashboardCtrl', ['$location', '$scope', '$rootScope', 'httpClient', '$sce', '$timeout', '$interval', '$routeParams', '$mdDialog', 'constants', function( $location,$scope,$rootScope,httpClient, $sce, $timeout, $interval, $routeParams, $mdDialog, constants) {
    var vm = this;
    vm.sources = constants.sources;
    vm.icons = constants.infoWindows.icons;
    vm.cdnImagesPath = cdnImagesPath; //Global Variable
    vm.dataLoaded = true;
    vm.view = "dashboard"; 
    vm.changeState = function(value) {
        vm.view = value;
    }
    vm.gridsterOptions = {
        defaultSizeY: 50,
        defaultSizeX:50,
        minRows: 1, // the minimum height of the grid, in rows
        maxRows: 100,
        columns: 10, // the width of the grid, in columns
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: '50', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [10, 10], // the pixel distance between each widget
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        mobileBreakPoint:480, // if the screen is not wider that this, remove the grid layout and stack the items
        minColumns: 1, // the minimum columns the grid must have
        resizable: {
            enabled: false
        },
        draggable: {
            enabled: false
        }
    };
    vm.slickConfig = {
        infinite: true,
        arrows: true,
        autoplay: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<span class='prevSlide'><i class='fa fa-angle-left'></i></span>",
        nextArrow:"<span class='nextSlide'><i class='fa fa-angle-right'></i></span>",
        enabled: true,
        method: {},
        event: {
            beforeChange: function (event, slick, currentSlide, nextSlide) {
            },
            afterChange: function (event, slick, currentSlide, nextSlide) {
            }
        }
    };
    vm.heatmapLayerOption = {minOpacity: 0.3, maxZoom: 0,radius: 30,blur: 30, max: 1.0, gradient: { 
        0.1: 'lightblue',
        0.2: 'powderblue',
        0.3: 'cadetblue', 
        0.4: 'gold', 
        0.5: 'gold', 
        0.6: 'yellow', 
        0.7: 'coral', 
        0.8: 'orange', 
        0.9: 'darkorange', 
        1: 'orangered' 
    }};
    vm.init = function() {
        vm.params = {"branchId": $routeParams.branchId};
        vm.branchId = $routeParams.branchId;
        var refreshInterval = 20;
        vm.getBranchDetails($routeParams.branchId);
       /** vm.refreshTimer = $interval(
            function(){
                vm.getBranchDetails($routeParams.branchId);
            }, refreshInterval * 1000); **/
    };
    
    vm.occupancyByRoom = null;
    vm.occupancyByRoomColDef = [{headerName: "Floor", field: "description", cellRenderer: "group"},
                                {headerName: "Details", field: "current", cellRenderer: function(params) {
                                    return (params.value) ? ("Current " + params.data.current +" (Optimal "+ params.data.optimal +")" ): "";
                                }},
                                /* {headerName: "Optimal", field: "optimal"},
                                {headerName: "Occupancy", field: "current"},*/
                                {headerName: "Area", field: "area"}, 
                                {headerName: "Max area occupancy", field: "maxOccupancy"},
                                {headerName: "Optimal", field: "optimal"},
                                {headerName: "Current area occupancy", field: "occupancy"}
                               ];
    vm.colorRows = function(params) {
        if (params.data.current >=  params.data.optimal) {
            return 'rag-alert';
        }
    }
    vm.getNodeChildDetails = function(rowItem) {
        if (rowItem.areas) {
            return {
                group: true,
                // open gf be default
                expanded: rowItem.name === 'gf',
                // provide ag-Grid with the children of this group
                children: rowItem.areas,
                // the key is used by the default group cellRenderer
                key: rowItem.name
            };
        } else {
            return null;
        }
    }
    vm.title= "Title of detailed dashboard";
    vm.branchDetails = null; 
    vm.getBranchDetails = function(branchId) {
        //Load Section 1 data
        httpClient.get("rbc/api/getBranches/"+branchId, vm.params).then(
            function(data, response) {
                data["remaining"] = ""+Math.max(0, (data.optimal - data.average));
                vm.branchDetails = data;
                console.log("Branch Data "+branchId, data)
                vm.occupancyByRoom = data.floors;
                console.log("occupancy by room Data ", vm.occupancyByRoom);
            },
            function(err) {
                console.log('ERROR', err);
            });
    };
    vm.formatHeatmapData = function(data) {
        var formattedData = [];
        _.forEach(_.pluck(data, "mapLocation"), function(entry){
            formattedData = formattedData.concat(entry);
        });
        return formattedData;
    }
    
    vm.floorPlanListCallback = function(data, searchBox) {
        data = data.floors;
        var searchData = [];
        if(!searchBox.localData || searchBox.localData.length == 0 ) { //First time loading data, add an all
            searchData = searchData.concat(data);
        } else {
           if(searchBox.localData.length > 0) {
               searchData = searchBox.localData.concat(data)
           }  
        }
        return _.uniq(searchData, 'name')
    }
    
     vm.floorPlanListSelect = function(data) {
        if(data!=undefined) {
          if(data) {
            self.selectedFloor = data.originalObject.name;
            vm.slickConfig.method.slickGoTo(_.findIndex(vm.branchDetails.floors, { name: self.selectedFloor}));
          }
        }
    }
     
     
    vm.floorPlanListChange = function(data) {
        
    }
    
    
    
    
    
    vm.filterText = null;
    
   vm.hasFilterText = function(sectionContent){
        if(vm.filterText == undefined || vm.filterText == null || vm.filterText == "" || JSON.stringify(_.values(sectionContent)).toLowerCase().indexOf(vm.filterText.toLowerCase()) != -1) {
            return true;
        } else {
            return false;
        }
   };
    
   vm.filterData = function(value) {
       $scope.$broadcast("runExternalFilter-allFloorsFilteredData", {})
   }
   
    
    vm.filterListGrid = function(node) {
        if(vm.filterText != undefined && vm.filterText != null && vm.filterText != "")
        	return JSON.stringify(node.data).toLowerCase().indexOf(vm.filterText.toLowerCase()) !=-1;
        else
            return true;
    }
    
    vm.isListGridFilterPresent = function() {
         return !(vm.filterText == undefined && vm.filterText == null && vm.filterText == "")
    }
}]);

myApp.controller('clusterDetectionCtrl', ['$location', '$scope', '$rootScope', 'httpClient', '$sce', '$timeout', '$interval', '$routeParams', '$mdDialog', 'constants', function( $location,$scope,$rootScope,httpClient, $sce, $timeout, $interval, $routeParams, $mdDialog, constants) {
    var vm = this;
    vm.sources = constants.sources;
    vm.icons = constants.infoWindows.icons;
    vm.cdnImagesPath = cdnImagesPath; //Global Variable
    vm.view = "list"; 
    vm.user =  JSON.parse($.cookie('user'));
    vm.gridsterOptions = {
        floating: true,
        defaultSizeY: 50,
        defaultSizeX:50,
        minRows: 1, // the minimum height of the grid, in rows
        maxRows: 100,
        columns: 10, // the width of the grid, in columns
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: '50', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [10, 10], // the pixel distance between each widget
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        mobileBreakPoint:480, // if the screen is not wider that this, remove the grid layout and stack the items
        minColumns: 1, // the minimum columns the grid must have
        resizable: {
            enabled: false
        },
        draggable: {
            enabled: false
        }
    };
    vm.branchesData = null;
    vm.changeState = function(value) {
        vm.view = value;
    }
    
    vm.init = function() {
        var refreshInterval =  30;
        vm.refreshTimer = $interval(
            function(){
                vm.getBranchesData();
            }, refreshInterval * 1000);
        vm.getBranchesData();
    };
    

    vm.colorRows = function(params) {
        if (params.data.alert == true) {
            return 'rag-alert';
        }
    }
    vm.highOccupancyBreachesColDef = [{headerName: "Branch Name", field: "name", cellRenderer: "group"},
                            {headerName: "Address", field: "address", width: 200, cellClass: "textWrap"},
                            //{headerName: "Floors", field: "floors", cellRenderer: "group", hide: true},
                            {headerName: "Floors", field: "description", cellRenderer: "group"},
                            {headerName: "Area", field: "area"}, 
                            {headerName: "Max Occupancy", field: "max"},
                            {headerName: "Optimal Occupancy", field: "optimal"},
                            {headerName: "Current occupancy", field: "average",   autoHeight: 'true'},
                            /**{
                                headerName: "Actions", field: "id", editable : false, 
                                cellRenderer: function(params) {
                                    var eDiv = document.createElement('div');
                                    var zButton;
                                    eDiv.innerHTML = '<button class="btn btn-primary btn-approve">View Details</button>';
                                    zButton = eDiv.querySelectorAll('.btn-approve')[0];
                                    zButton.addEventListener('click', function() {
                                        vm.viewDetails(params);
                                    });
                                    return eDiv;
                                }
                            }**/];
    
 /**   vm.occupancyByRoomColDef = [{headerName: "Floor", field: "description", cellRenderer: "group"},
                                {headerName: "Details", field: "current", cellRenderer: function(params) {
                                    return (params.value) ? ("Current " + params.data.current +" (Optimal "+ params.data.optimal +")" ): "";
                                }},
                                
                                {headerName: "Area", field: "area"}, 
                                {headerName: "Max area occupancy", field: "maxOccupancy"},
                                {headerName: "Optimal", field: "optimal"},
                                {headerName: "Current area occupancy", field: "occupancy"}
                               ]; **/

    vm.getNodeChildDetails = function(rowItem) {
        if (rowItem.floors) {
            return {
                group: true,
                // provide ag-Grid with the children of this group
                children: rowItem.floors,
                // the key is used by the default group cellRenderer
                key: rowItem.description
            };
        } else if (rowItem.areas) {
            return {
                group: true,
                // provide ag-Grid with the children of this group
                children: rowItem.areas,
                // the key is used by the default group cellRenderer
                key: rowItem.name
            };
        } else {
            return null;
        }
    }
    vm.getBranchesData = function() {
        //Load Section 1 data
        httpClient.get("rbc/api/getBranches", vm.params).then(
            function(data, response) {
                console.log("All Branches Data", data)
                var filteredBranches = _.filter(data, function(branch){  if(branch.alert == true) { return true } });
var filteredBranches = _.forEach(filteredBranches, function(branch) { return branch.floors = _.forEach(_.filter(branch.floors, function(floor){ return (floor.current > floor.optimal);}),function(floor){delete floor.name; return floor;})})
var filteredAreas = _.forEach(filteredBranches, function(branch) { return _.forEach(branch.floors, function(floor) { floor.areas = _.filter(floor.areas, function(area){return area.occupancy > area.optimal;}) })})

                vm.highOccupancyBreachesData = filteredBranches
                console.log("All Branches Data", vm.highOccupancyBreachesData)
            },
            function(err) {
                console.log('ERROR', err);
            });
    };
    
    vm.viewDetails = function(params) {
        if(params){
            vm.selectedBranch = params;
        }
        if($routeParams && $routeParams.branchId != params.value)
            $location.path("/dashboard/branchId/"+params.value)
            }
    vm.viewDetailsByName = function(params) {
        if(params){
            vm.selectedBranch = params.replace(/ /g,"_");
        }
        if($routeParams && $routeParams.branchId != params.replace(/ /g,"_"))
            $location.path("/dashboard/branchId/"+params.replace(/ /g,"_"))
   }
    
    
    
   vm.filterText = null;
    
   vm.hasFilterText = function(sectionContent){
        if(vm.filterText == undefined || vm.filterText == null || vm.filterText == "" || JSON.stringify(_.values(sectionContent)).toLowerCase().indexOf(vm.filterText.toLowerCase()) != -1) {
            return true;
        } else {
            return false;
        }
   };
    
   vm.filterData = function(value) {
       $scope.$broadcast("runExternalFilter-highOccupancyBreachesData", {})
   }
   
    
    vm.filterListGrid = function(node) {
        if(vm.filterText != undefined && vm.filterText != null && vm.filterText != "")
        	return JSON.stringify(node.data).toLowerCase().indexOf(vm.filterText.toLowerCase()) !=-1;
        else
            return true;
    }
    
    vm.isListGridFilterPresent = function() {
         return !(vm.filterText == undefined && vm.filterText == null && vm.filterText == "")
    }
    
}]);
myApp.controller('devicesHomeCtrl', ['$location', '$scope', '$rootScope', 'httpClient', '$routeParams', '$timeout', '$mdDialog', 'infoWindowActions', '$uibModal', '$route', function($location,$scope,$rootScope,httpClient, $routeParams, $timeout, $mdDialog, infoWindowActions, $uibModal, $route) {
    var vm = this;
    vm.infoWindowActions = infoWindowActions;
    
    vm.isInQuarantine = ($route.current.$$route.routeDef && $route.current.$$route.routeDef.isInQuarantine) ? true : false;
    vm.isInvestigatedUsers = ($route.current.$$route.routeDef && $route.current.$$route.routeDef.isInvestiagtedUsers) ? true : false;
    vm.isPausePermit = ($route.current.$$route.routeDef && $route.current.$$route.routeDef.isPausePermit) ? true : false;
    
    vm.gridClass = "";
    vm.gridAPI = "admin/profile/list";
    vm.title = "User Verification"
    
    if(vm.isInvestigatedUsers){
        vm.title = "Investigated Users"
        vm.gridClass = "gridClickable"
    }
    
    if(vm.isInQuarantine){
        vm.title =  "Users"
    }
    
    if(vm.isPausePermit){
        vm.gridAPI = "admin/profile/listPausePermit";
        vm.title = "Pause Permit Requests"
    }
    
    // todo: the below list should be retrieved from the backend
    vm.cities =  ["Others"];

    vm.timerLabels = ["1hr", "2hrs", "3hrs", "4hrs", "5hrs", "6hrs"];
    vm.timerValues = ["60", "120", "180", "240", "300", "360"]; 
      
    vm.devicesColDefRef = [
       {
            headerName: "Date",
            field: "creationDate",
            width: 180,
            cellClass: "textWrap",
            editable: false, 
            headerCheckboxSelection: false, 
            checkboxSelection: false,  
            cellRenderer: function(params) {
                if (params.value) {
                    var result = moment(params.value);
                    if(!result.isValid()) {
                        result = moment(parseInt(params.value));
                        if(!result.isValid())
                            result = moment.unix(parseInt(params.value));
                    }
                    return  result.format('DD-MMM-YYYY hh:mma');
                } else
                    return params.value;
            }
        }, {
            headerName: "Id", 
            field: "id", 
            width: 180,
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {headerName: "Name", field: "nameEn", width: 200, cellClass: "textWrap", editable: false},
        {headerName: "Phone Number", field: "mobile",  width: 150, editable : false},
        {headerName: "Photo", field: "photo",  width: 100, editable : false,
         cellRenderer: function(params) {
             var eDiv = document.createElement('div');
             var btn = '<button class="deviceImg btn btn-primary btn-block" type="button">View</button>';
             eDiv.innerHTML = btn;
             var deviceImg = eDiv.querySelectorAll('.deviceImg')[0];
             deviceImg.addEventListener('click', function(clickParams) { 
                 vm.showDevicePhotosDialog(params); 
             });
             return eDiv;
         }
        },
        {headerName: "City", field: "city", width: 150, cellEditor: "select", editable: true, cellEditorParams: {values: vm.cities}},
        {headerName: "Timer", field: "timer", width: 150, cellEditor: "select", editable: true, cellEditorParams: {values: vm.timerLabels},
         cellRenderer: function(params) {
             if (!params.value)
                 params.value = vm.timerLabels[0];
             return params.value;
         }
        }
    ];

    vm.pausePermitColDefRef = [
        {
            headerName: "Date", 
            field: "startDate",
            cellClass: "textWrap", 
            editable: false, 
            headerCheckboxSelection: false, 
            checkboxSelection: false,  
            cellRenderer: function(params) {
                if(params.value){
                    var result =  moment(parseInt(params.value));
                    if(!result.isValid()){
                        result =  moment.unix(parseInt(params.value))
                    }
                    return  result.format('DD-MMM-YYYY hh:mma');
                }else
                    return params.value;
            }
        },
        {
            headerName: "Id", 
            field: "deviceId", 
            cellClass: "textWrap", 
            editable : false,
            cellRenderer: function(params) {
                return params.value? params.value.split("_")[0]: 'N/A';
            }
        },
        {headerName: "Comments", field: "comments", cellClass: "textWrap",width: 300, editable : false},
        {
            headerName: "Time", 
            field: "pausePermitTime", 
            cellEditor: "select", 
            editable: true, 
            cellStyle: {cursor: 'pointer'},
            cellEditorParams: {values: vm.timerLabels},
            cellRenderer: function(params) {
                if (!params.value)
                    params.value = vm.timerLabels[0];
                return params.value;
            }
        },
        {
            headerName: "Actions", 
            field: "workflowState", 
            editable : false, 
            cellRenderer: function(params) {
                var eDiv = document.createElement('div');
                var zButton;
                if(params.value == "entryPoint") {
                    eDiv.innerHTML = '<button class="btn btn-primary btn-approve">Approve</button> <button class="btn btn-primary btn-reject">Reject</button>';

                    zButton = eDiv.querySelectorAll('.btn-approve')[0];
                    zButton.addEventListener('click', function() {
                        vm.approvePausePermit(params);
                    });

                    zButton = eDiv.querySelectorAll('.btn-reject')[0];
                    zButton.addEventListener('click', function() {
                        vm.rejectPausePermit(params);
                    });

                    return eDiv;

                } else if(params.value == "approved") {
                    return "<i class='fa fa-check-circle' aria-hidden='true'></i>";

                } else if(params.value == "approving") {
                    return "Approval in progress";

                } else {
                    return params.value;
                }
            }
        }
    ];

    // the action column will made visible or not by the function vm.updateColDef. 
    // accordingly the column will be hidden if the state is 'rejected' or 'pendingHomeCheckin'
    //
    vm.actionColDef = {
        headerName: "Actions", field: "workflowState", editable : false, 
        cellRenderer: function(params) {
            var eDiv = document.createElement('div');
            var zButton;

            if (params.value && params.value == "pendingValidation") {
                eDiv.innerHTML = '<button class="btn btn-primary btn-approve">Approve</button> <button class="btn btn-primary btn-reject">Reject</button>';

                zButton = eDiv.querySelectorAll('.btn-approve')[0];
                zButton.addEventListener('click', function() {
                    vm.approve(params);
                });

                zButton = eDiv.querySelectorAll('.btn-reject')[0];
                zButton.addEventListener('click', function() {
                    vm.reject(params);
                });

                return eDiv;

            } else if(params.value == "approved") {
                return "<i class='fa fa-check-circle' aria-hidden='true'></i>";

            } else if(params.value == "rejected") {
                // action column will not be visible in this case anyway
                return "<i class='fa fa-ban' aria-hidden='true'></i>";

            } else if(params.value == "pendingHomeCheckin") {
                // action column will not be visible in this case anyway
                return "<i class='fa fa-hourglass' aria-hidden='true'></i>";

            } else if(params.value == "breachCheckinTimer") {
                eDiv.innerHTML = '<button class="btn btn-primary btn-approve">Extend timer</button>';

                zButton = eDiv.querySelectorAll('.btn-approve')[0];
                zButton.addEventListener('click', function() {
                    vm.extend(params);
                });

                return eDiv;

            } else if(params.value == "approving") {
                return "Approval in progress";

            } else if(params.value == "rejecting") {
                return "Rejection in progress";

            } else if(params.value == "extending") {
                return "Timer extension in progress";

            } else {
                return params.value;
            }
        }
    };

    vm.quarantineFields = [
        {headerName: "Last Scan", field: "lastScanDate", width: 180, cellClass: "textWrap", editable : false, 
         cellRenderer: function(params) {
             if (params && params.value) {
                 var m = moment(parseInt(params.value));
                 if (m.isValid()) return m.format("MM-DD-YYYY hh:mm A");
             } else 
                 return '';
         }
        },
        {headerName: "Test Result", field: "testResult", width: 100, cellClass: "textWrap", editable : false,
         cellRenderer: function(params) {
             if (params.value && params.value.progress == 'true') {
                 return ('<i class="fa fa-spinner fa-spin fa-1x"></i>');
             } else return params.value || '';
         }
        },
        {headerName: "Test Date", field: "testDate", width: 180, cellClass: "textWrap", editable : false,
         cellRenderer: function(params) {
             if (params.value && params.value.progress == 'true') {
                 return ('<i class="fa fa-spinner fa-spin fa-1x"></i>');
             } else if(params.value == "N/A"){
                 return "Not available";
             } else if (params.value) {
                 return moment(params.value).format('DD-MMM-YYYY hh:mma');
             } else return params.value || '';
          }
        },
        
    ];

    vm.quarantineActionColDef = {
        headerName: "Actions", field: "workflowStateX", editable : false, width: 350,
        cellRenderer: function(params) {
            if (params.value) {
                return (params.value + ' in progress')
            }
            var eDiv = document.createElement('div');

        
            var html = '<button class="btn btn-primary btn-getTestResult">Get Test Result</button>';


        	html = html + ' <button class="btn btn-primary btn-contactTracing">Trace</button>';
            eDiv.innerHTML = html;

            var traceBtn = eDiv.querySelectorAll('.btn-contactTracing')[0];
            traceBtn.addEventListener('click', function() {
                 window.location = window.location.origin + "/qmc/index#/trace/deviceId/" +params.data.id
            });
            // test result action
            var getTestResultBtn = eDiv.querySelectorAll('.btn-getTestResult')[0];
            var sh = function(data) {
                if (data.status == "failure") {
                    eh({'errorDetail': 'unknown error', 'data': data});

                } else if (data.jobId) {
                    vm.getJobStatus("admin/profile/accountDetailsJob", {'jobId':  data.jobId }, 30, sh, eh);

                } else {
                    params.data.testDate = data.date ? data.date : "N/A";
                    params.data.testResult = data.riskMessage.en;
                    params.data.workflowStateX = null;
                    vm.showAlert('success', 'Test results retrieved for ' + params.data.nameEn);
                    params.$scope.rowNode.setData(params.data); //to refresh row data
                }
            }
            var eh = function(err) {
                console.log(err);
                var errDesc = err.errorDetail || (err.data && err.data.metadata && err.data.metadata.description? err.data.metadata.description.en: 'N/A');
                vm.showAlert('danger', 'Test results failed for ' + params.data.nameEn + ': ' + errDesc);
                params.data.testResult = 'N/A';
                params.data.testDate = 'N/A';
                params.data.workflowStateX = null;
                params.$scope.rowNode.setData(params.data); //to refresh row data
            }
            getTestResultBtn.addEventListener('click', function() {
                vm.closeAlert();
                params.data.testResult = {'progress': 'true'};
                params.data.testDate = {'progress': 'true'};
                params.data.workflowStateX = 'Test Result';
                params.$scope.rowNode.setData(params.data);
                vm.callBackendApiPost('admin/profile/accountDetailsJob', {'deviceId':params.data.id}, sh, eh);
            });


            return eDiv;
        }
    }

    vm.rejectPausePermit = function(params) {
        params.data.workflowState ="rejecting"  ;
        params.$scope.rowNode.setData(params.data);//To refresh rendering

        var parameters ={
            dockey: params.data.key,
            action: "reject",
        }
        console.log('rejecting with parameters = ' + JSON.stringify(parameters));
        httpClient.post("admin/quarantine/pausePermit/update", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    params.data.workflowState ="entryPoint";
                    params.$scope.rowNode.setData(params.data);
                    vm.showAlert("danger", data.errorDetail);
                    return;
                }
                params.data.workflowState ="rejected"  ;
                params.$scope.rowNode.setData(params.data); //to refresh row data

                vm.showAlert("success", "Rejection successful!")
                console.log("[admin/profile/reject] response", data);
            },
            function(err) {
                if(err.status == "success"){
                    params.data.workflowState ="rejected"  ;
                    params.$scope.rowNode.setData(params.data); //to refresh row data

                    vm.showAlert("success", "Rejection successful!")
                    console.log("[admin/profile/reject] response", params.data);
                    return;
                }
                params.data.workflowState ="entryPoint";
                params.$scope.rowNode.setData(params.data);

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert("danger", errDesc)
                console.log("[admin/quarantine/pausePermit/update] response", errDesc);
            }
        );
    }

    vm.approvePausePermit = function(params) {
        params.data.workflowState ="approving";
        params.$scope.rowNode.setData(params.data); //To refresh rendering of column

        if (params.data.pausePermitTime == undefined || params.data.pausePermitTime == null) {
            params.data.pausePermitTime = vm.timerLabels[0];
        }

  
        
        var parameters = {
            dockey: params.data.key,
            action: "approve",
            time: vm.timerValues[vm.timerLabels.indexOf(params.data.pausePermitTime)]
        }
        console.log('approving with parameters = ' + JSON.stringify(parameters));
        httpClient.post("admin/quarantine/pausePermit/update", parameters).then(
            function(data, response) {
                if(data.status && data.status == "failure"){
                    params.data.workflowState ="entryPoint";
                    params.$scope.rowNode.setData(params.data);
                    vm.showAlert("danger", data.errorDetail);
                    return;
                }
                params.data.workflowState ="approved"  ;
                params.$scope.rowNode.setData(params.data); //to refresh row data

                vm.showAlert("success", "Approval successful!");
                console.log("[admin/profile/verify] response", data);
            },
            function(err) {
                console.dir(err);
                if(err.status == "success"){
                    params.data.workflowState ="approved"  ;
                    params.$scope.rowNode.setData(params.data); //to refresh row data

                    vm.showAlert("success", "Approval successful!");
                    console.log("[admin/profile/verify] response", params.data);
                    return;
                }
                params.data.workflowState ="entryPoint";
                params.$scope.rowNode.setData(params.data);

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert("danger", errDesc);
                console.log("[admin/profile/verify] response", errDesc);
            }
        );
    }

    vm.onRowDoubleClicked = function(row) {
        if (vm.isInvestigatedUsers) {
            window.location = window.location.origin + "/qmc/index#/trace/deviceId/" +row.data.id
        }
    }
    
    vm.getJobStatus = function(api,params,timeout,successFnc, failureFnc){
        var checkInterval = 1;
        if(timeout > 0 ){
            timeout = timeout - checkInterval;
            httpClient.post(api, params, null,false).then(
                function(data) {
                    console.dir(data);
                    if(data.jobStatus == "complete"){
                        var jobResult = JSON.parse(data.jobResult);
                        if(jobResult.resultJSON.response.metadata.status == "success"){
                            successFnc(jobResult.resultJSON.response.result);
                            return;
                        }else{
                            failureFnc("An error occurred, please try again later.");
                        }

                    }
                    var nextFireTime = checkInterval * 1000;
                    setTimeout(vm.getJobStatus, nextFireTime,api,params,timeout,successFnc, failureFnc);
                },function(ex){
                    failureFnc(ex);
                });
        }else{
            failureFnc("TIME_OUT");
        }
    };

    vm.loadOverlay = function(marker, overlayForm, backendApi) {
        vm.closeAlert();
        var of = angular.copy(overlayForm);
        var formWidget = {
            'label': of.title,
            'buttons': {'save': {'label': 'Save'}, 'cancel': {'label': 'Cancel'}},
            'schema': angular.copy(of.schema),
            'form': angular.copy(of.form),
            'options': {}
        }
        var self = this;
        var modalInstance= $uibModal.open({
            animation: true,
            component: 'scriptrQmcFormOverlay',
            size: 'lg',
            scope: $scope,
            resolve: {
                widget: function() {
                    return formWidget;
                }
            }
        });

        modalInstance.result.then(function (wdgModel) {
            if(wdgModel != 'cancel') {
                console.log('Model Data', wdgModel);
                var successHandler = function(data) {
                    vm.showAlert('success', of.title + ' successful')
                }
                var failureHandler = function(err) {
                    vm.showAlert('danger', of.title + ' failure: ' + err.errorDetail);
                }
                wdgModel.deviceId = marker.data.id;
                vm.callBackendApiPost(backendApi, wdgModel, successHandler, failureHandler) 
            }
        }, function () {
            console.info('modal-component for widget update dismissed at: ' + new Date());
        });
    }

    vm.updateColDef = function(wfs) {
        if(vm.isPausePermit){
            vm.devicesColDef =  vm.pausePermitColDefRef;
            return
        }
        vm._devicesColDef = vm.devicesColDefRef.slice(0, vm.devicesColDefRef.length);
        if(vm.isInvestigatedUsers || vm.isInQuarantine){
            if(vm._devicesColDef[5]){
                vm._devicesColDef.splice(4, vm._devicesColDef.length);
            }
            if(vm.isInvestigatedUsers)
              vm._devicesColDef[0].field = "process-tracing-data-time";
            if(vm.isInQuarantine){
                vm._devicesColDef = vm._devicesColDef.concat(vm.quarantineFields);
                vm._devicesColDef.push(vm.quarantineActionColDef);
                
            }
            vm._devicesColDef.shift(); //Remove Creation Date
            vm.devicesColDef  = vm._devicesColDef;
            return;
        }

        if (wfs == 'rejected' || wfs == 'pendingHomeCheckin') {
            vm._devicesColDef[5].editable = false;
            vm._devicesColDef[5].cellStyle = {cursor: 'default'};

            vm._devicesColDef[6].editable = false;
            vm._devicesColDef[6].cellStyle = {cursor: 'default'};

        } else {
            vm._devicesColDef[5].editable = true;
            vm._devicesColDef[5].cellStyle = {cursor: 'pointer'};

            vm._devicesColDef[6].editable = true;
            vm._devicesColDef[6].cellStyle = {cursor: 'pointer'};

            vm._devicesColDef.push(vm.actionColDef);
        }
        
        vm.devicesColDef  = vm._devicesColDef
    }

    vm.approve = function(params) {
        params.data.workflowState ="approving";
        params.$scope.rowNode.setData(params.data); //To refresh rendering of column

        if(params.data.city == undefined || params.data.city == null) {
            params.data.workflowState ="pendingValidation";
            params.$scope.rowNode.setData(params.data); //to refresh row data

            vm.showAlert("danger", "City is required!");

        } else if (vm.cities.indexOf(params.data.city) == -1) {
            params.data.workflowState ="pendingValidation";
            params.$scope.rowNode.setData(params.data); //to refresh row data

            vm.showAlert("danger", "City is invalid!");

        } else if (params.data.timer && vm.timerLabels.indexOf(params.data.timer) == -1) {
            params.data.workflowState ="pendingValidation";
            params.$scope.rowNode.setData(params.data); //to refresh row data

            vm.showAlert("danger", "Check-in Time is invalid!");

        } else {
            console.log('timer = ' + params.data.timer);
            if (params.data.timer == undefined || params.data.timer == null) {
                params.data.timer = vm.timerLabels[0];
            }

            var parameters = {
                deviceId: params.data.id,
                city: params.data.city,
                time: vm.timerValues[vm.timerLabels.indexOf(params.data.timer)]
            }
            console.log('approving with parameters = ' + JSON.stringify(parameters));
            httpClient.post("admin/profile/verify", parameters).then(
                function(data, response) {
                    params.data.workflowState ="approved"  ;
                    params.$scope.rowNode.setData(params.data); //to refresh row data

                    vm.showAlert("success", "Approval successful!");
                    console.log("[admin/profile/verify] response", data);
                },
                function(err) {
                    params.data.workflowState ="pendingValidation";
                    params.$scope.rowNode.setData(params.data);

                    var errDesc = 'Unknown error';
                    if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                        errDesc = err.data.metadata.description.en;
                    } else if (err.errorDetail) {
                        errDesc = err.errorDetail;
                    }
                    vm.showAlert("danger", errDesc);
                    console.log("[admin/profile/verify] response", errDesc);
                }
            );
        }
    }

    vm.reject = function(params) {
        params.data.workflowState ="rejecting"  ;
        params.$scope.rowNode.setData(params.data);//To refresh rendering

        var parameters = {"deviceId": params.data.id }
        console.log('rejecting with parameters = ' + JSON.stringify(parameters));
        httpClient.post("admin/profile/reject", parameters).then(
            function(data, response) {
                params.data.workflowState ="rejected"  ;
                params.$scope.rowNode.setData(params.data); //to refresh row data

                vm.showAlert("success", "Rejection successful!")
                console.log("[admin/profile/reject] response", data);
            },
            function(err) {
                params.data.workflowState ="pendingValidation";
                params.$scope.rowNode.setData(params.data);

                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                vm.showAlert("danger", errDesc)
                console.log("[admin/profile/reject] response", errDesc);
            }
        );
    }

    vm.extend = function(params) {
        if(params.data.city == undefined || params.data.city == null) {
            vm.showAlert("danger", "City is required!");

        } else if (vm.cities.indexOf(params.data.city) == -1) {
            vm.showAlert("danger", "City is invalid!");

        } else if (params.data.timer && vm.timerLabels.indexOf(params.data.timer) == -1) {
            vm.showAlert("danger", "Check-in Time is invalid!");

        } else {
            params.data.workflowState ="extending";
            params.$scope.rowNode.setData(params.data); //To refresh rendering of column

            console.log('timer = ' + params.data.timer);
            if (params.data.timer == undefined || params.data.timer == null) {
                params.data.timer = vm.timerLabels[0];
            }

            var parameters = {
                deviceId: params.data.id,
                city: params.data.city,
                time: vm.timerValues[vm.timerLabels.indexOf(params.data.timer)]
            }
            console.log('extending with parameters = ' + JSON.stringify(parameters));
            httpClient.post("admin/profile/extendHomeCheckin", parameters).then(
                function(data, response) {
                    params.data.workflowState ="pendingHomeCheckin"  ;
                    params.$scope.rowNode.setData(params.data); //to refresh row data

                    vm.showAlert("success", "Extension successful!");
                    console.log("[admin/profile/extendHomeCheckin] response", data);
                },
                function(err) {
                    params.data.workflowState ="breachCheckinTimer";
                    params.$scope.rowNode.setData(params.data);

                    var errDesc = 'Unknown error';
                    if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                        errDesc = err.data.metadata.description.en;
                    } else if (err.errorDetail) {
                        errDesc = err.errorDetail; 
                    }
                    vm.showAlert("danger", errDesc);
                    console.log("[admin/profile/extendHomeCheckin] response", errDesc);
                }
            );
        }
    }

    vm.showDevicePhotosDialog = function(params) {
        $mdDialog.show({
            controller: 'photoDialogCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/view/html/views/users/user-photos.html',
            clickOutsideToClose:true,
            escapeToClose: true,
            locals: {deviceData: params.data},
            ok: 'Close'
        });
    }

    vm.init = function(){
        vm.workflowState = "pendingValidation"

        if(vm.isInvestigatedUsers){
            vm.workflowState = null;
            vm.lastProcessData = "true";
            vm.investigatedUsersState = "all";
        }else{
            if(vm.isInQuarantine){
                vm.workflowState = null;
                vm.quarantineState= "all";
            }else{
                if(vm.isPausePermit){
                    vm.workflowState = null;
                    vm.pausePermit ="pending"
                }
            }
        }
        vm.updateColDef(vm.workflowState);
        vm.params = {
            "state": vm.workflowState, 
            "lastProcessData" : vm.lastProcessData,
            "quarantineState" : vm.quarantineState,
            "pausePermit" : vm.pausePermit
        };
        vm.renderGrid = true;
        //TODO Get the cities from a backend script.  + add loading
    }

    vm.changeState = function(state, contactTracingState, quarantineState) {
        vm.renderGrid = false;
        console.log("changeState", state);
        console.log("contactTracingState", contactTracingState);

        if(state){
            vm.params = {"state": state };
            vm.updateColDef(state);
        }else{
            if(contactTracingState){
                if(contactTracingState == "all"){
                    vm.params = { "lastProcessData" : vm.lastProcessData}
                }else{
                    vm.params = {  "contactTracingState" : contactTracingState }
                }
            }else{
                if(quarantineState){
                    vm.params = {  "quarantineState" : quarantineState }
                } 
            }
        }

        $timeout(function(){ 
            vm.renderGrid = true}
        , 500);
    }

    vm.showAlert = function(type, content) {
        vm.message = {
            "type" : type,
            "content" : content
        }
        $timeout(function(){ 
            vm.hasAlert = true;
        }, 500);
 
    }

    vm.closeAlert = function() {
        vm.hasAlert = false;
    }
    
    vm.callBackendApiGet = function(apiId, parameters, successHandler, failureHandler) {
        console.log('GET calling backend api <' + apiId + '> with params ' + JSON.stringify(parameters));
        vm._callBackendApi(apiId, parameters, 'G', successHandler, failureHandler);
    }

    vm.callBackendApiPost = function(apiId, parameters, successHandler, failureHandler) {
        console.log	('POST calling backend api <' + apiId + '> with params ' + JSON.stringify(parameters));
        vm._callBackendApi(apiId, parameters, 'P', successHandler, failureHandler);
    }

    vm._callBackendApi = function(apiId, parameters, method, successHandler, failureHandler) {
        var httpMeth = httpClient.post;
        if (method == 'G') {
            httpMeth = httpClient.get;
        }

        httpMeth(apiId, parameters)
            .then(
            function(data, response) {
                console.log(data);
                if (data && data.status && data.status == 'failure') {
                    if (typeof failureHandler === 'function') failureHandler(data);
                } else {
                    if (typeof successHandler === 'function') successHandler(data);
                }
            },
            function(err) {
                console.log(err);
                if (typeof failureHandler === 'function') failureHandler(err);
            });
    }

}]);

myApp.controller('photoDialogCtrl', ['httpClient', 'deviceData', '$mdDialog', function(httpClient, deviceData, $mdDialog) {
    var vm = this;
    vm.isLoading = true;
    vm.loadStatus = 'Loading photos...';
    vm.deviceId = deviceData.id;
    vm.deviceName = deviceData.nameEn;
    vm.photo1Loaded = false;
    vm.photo2Loaded = false;
    vm.photo1Src = '';
    vm.photo2Src = '';

    vm.init = function() {
        httpClient.get("admin/profile/getPhotos", {'deviceId': vm.deviceId}).then(
            function(data, response) {
                vm.isLoading = false;
                console.log("[admin/profile/getPhotos] response", data);

                if (data[0] != null) {
                    vm.photo1Loaded = true;
                    vm.photo1Src = 'data:' + data[0].contentType + ';base64, ' + data[0].content;
                } else {
                    vm.loadStatus = 'One or more missing photos';
                }

                if (data[1] != null) {
                    vm.photo2Loaded = true;
                    vm.photo2Src = 'data:' + data[1].contentType + ';base64, ' + data[1].content
                } else {
                    vm.loadStatus = 'One or more missing photos';
                }
            },
            function(err) {
                vm.isLoading = false;
                var errDesc = 'Unknown error';
                if (err.data && err.data.metadata && err.data.metadata.description && err.data.metadata.description.en) {
                    errDesc = err.data.metadata.description.en;
                } else if (err.errorDetail) {
                    errDesc = err.errorDetail;
                }
                console.log("[admin/profile/getPhotos] error", errDesc);
                vm.loadStatus = errDesc;
            }
        );
    }

    vm.closeDialog = function() {
        $mdDialog.hide();
    };
}]);

myApp.controller('contactPositiveCtrl', ['httpClient', '$routeParams', function(httpClient, $routeParams) {
    var vm = this;
    
    vm.devicesColDef = [
        {headerName: "Id", field: "id",  editable : false, width: 300,
         cellRenderer: function(params) {
             return params.value.split("_")[0];
        }},
        {headerName: "Name", field: "nameEn",  editable : false},
        {headerName: "Phone Number", field: "mobile",  editable : false}
    ];
       
    vm.init = function(){
        console.log('contactPositiveCtrl init');
        vm.params = {'contact': 'true'};
        vm.renderGrid = true;
    }
    
    vm.showAlert = function(type, content) {
        vm.message = {
            "type" : type,
            "content" : content
        }
        vm.hasAlert = true;
    }
    
    vm.closeAlert = function() {
      this.hasAlert = false;
   }
    
}]);

myApp.constant(
    "adminConfig",
    {
        "uploaderForm": {
            "form": [
                {
                    "type": "section",
                    "items": [
                           {
                                "type": "section",
                                "items": [{
                                    "key": "image",
                                    "type": "nwpFileUpload",
                                    "i18n": {
                                        "add": "Open file browser",
                                        "preview": "Preview Upload",
                                        "filename": "File Name",
                                        "progress": "Progress Status",
                                        "upload": "Upload",
                                        "dragorclick": "Drag and drop your file here or click here",
                                        "required": "Required"
                                    },
                                    "notitle": false
                                }]
                            }
                        
                    ]
                }
            ],
            "schema": {
                "type": "object",
                "title": "Schema",
                "properties": {
                    "image": {
                        "title": "File",
                        "type": "array",
                        "format": "singlefile",
                        "default": "fileattach.png",
                        "x-schema-form": {
                            "type": "array"
                        },
                        "pattern":       {
                            "mimeType":          "text/csv",
                            "validationMessage": "Wrong File Type. Allowed types ",
                        },
                        "maxSize":       {
                            "maximum":            "10MB",
                            "validationMessage":  "File exceeded allowed size of "
                        }
                    }
                },
                "required": [
                    "image"
                ]
            }
        }
    }
)
myApp.controller('adminFormCtrl', ['$location', '$scope', '$rootScope', 'httpClient', '$sce', '$q', 'adminConfig', function( $location,$scope,$rootScope,httpClient, $sce,$q, adminConfig) {
    var vm = this;
    vm.showLoading = false;
    vm.init = function(){
        var uploaderForm = angular.copy(adminConfig.uploaderForm);
        vm.frmGlobalOptions = {
            "destroyStrategy" : "remove",
            "formDefaults": {"feedback": true}
        }
        vm.schema =  angular.copy(uploaderForm.schema)
        vm.form =   angular.copy(uploaderForm.form)
        vm.model = {}
    }
    
   vm.resetForm =  function(form) {
       vm.model = {}
       $scope.$broadcast('schemaFormRedraw');
   }
    vm.save = function(form){
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        // Then we check if the form is valid
        if (form.$valid) {
            vm.showLoading = true;
            var d = $q.defer();  
            var data = angular.copy(vm.model);
            if(form.uploadForm.file.$dirty) {
                data["file"] = form.uploadForm.file.$modelValue
            } 
            delete data["image"]
          	var fd = new FormData();
            for ( var key in data ) {
                fd.append(key, data[key]);
            }
               
            httpClient.post("admin/api/uploadQuarantineFileJob", fd, null,true).then(
                function(data, response) {
                    vm.showLoading = false;
                    if(data.status == "failure") {
                        vm.showAlert("danger", data.errorDetail);
                    } else {
                        vm.getJobStatus("admin/api/uploadQuarantineFileJob", {jobId: data.jobId }, 30, function (){
                             vm.showAlert("success", "The dashboard has been saved successfully.");
                             vm.showLoading = false;
                       		 d.resolve(data, response);  
                        },function(errorCode, errorDetail){
                             vm.showAlert("danger", errorDetail? errorDetail : errorCode);
                             vm.showLoading = false;
                             d.reject(errorCode, errorDetail);  
                        })
             
                    }

                }, function(err) {
                    vm.showAlert("danger", err.data.response.metadata.errorDetail);
                               vm.showLoading = false;
                    console.log("reject", err.data.response.metadata.errorDetail);
                    d.reject(err); 
            
                });
            return d.promise;  
        }
    }
    
    vm.getJobStatus = function(api,params,timeout,successFnc, failureFnc){
        var checkInterval = 1;
        if(timeout > 0 ){
            timeout = timeout - checkInterval;
            //var params = {"jobId":handle};
            var fd = new FormData();
            for ( var key in params ) {
                fd.append(key, params[key]);
            }
             httpClient.post(api, fd, null,true).then(
                function(data) {
             
                    if(data.jobStatus == "complete"){
                        var jobResult = JSON.parse(data.jobResult);
                        if(jobResult.resultJSON.response.result == "success"){
                            successFnc(jobResult.result);
                            return;
                        }else{
                            failureFnc("An error occurred, please try again later.");
                            return;
                        }
                    }
                    var nextFireTime = checkInterval * 1000;
                    setTimeout(vm.getJobStatus, nextFireTime,api,params,timeout,successFnc, failureFnc);
            },function(ex){
                 failureFnc(ex);
            });
        }else{
            failureFnc("TIME_OUT");
        }
    }
        
   vm.showAlert = function(type, content) {
        vm.message = {
            "type" : type,
            "content" : content
        }
        vm.hasAlert = true;
    }
    
    vm.closeAlert = function() {
      this.hasAlert = false;
   }
}])

myApp.constant(
    "searchConfig",
    {
        "searchForm": {
            "form": [
                {
                    "type": "section",
                    "items": [
                        {
                            "type": "section",
                            "htmlClass": "fa fa-search",
                            "items": [{
                                "key": "searchBox",
                                "type": "string",
                                "notitle": true,
                                "default" : "Arial",
                                "placeholder" : "search by employee id"
                            }]
                        }
                    ]
                }
            ],
            "schema": {
                "type": "object",
                "title": "Schema",
                "properties": {
                    "searchBox": {
                        "type": "string"
                    }
                },
                "required": ["searchBox"]
            }
        }
    }
);

myApp.controller('traceCtrl', ['$location', '$scope', '$rootScope', 'httpClient', '$sce', '$q', 'searchConfig', '$routeParams', '$mdDialog', '$timeout', function( $location,$scope,$rootScope,httpClient, $sce,$q, searchConfig, $routeParams, $mdDialog, $timeout) {
    var vm = this;
    
    // mss: check for devMode to create dummy encounter data when real data is not available
    vm.devMode = false;
    vm.getDevModeWarning = function() {
        return vm.devMode? '- dev mode !!': '';
    }
    vm.loadingDiv = '<i class="fa fa-spinner fa-spin fa-2x fa-fws"></i>'
    vm.latestTriggeredMap = {};
    vm.showSearchLoading = false;
    vm.showTestResultLoading = false;
    vm.success = false;
    vm.showGrid = true;
    vm.showSearch = true;
    vm.mainLoading = false;
    vm.hasDeviceId = false;
    vm.backTriggered = true;
    vm.gridData  = [];
    vm.defaultErrorMsg =  "An error occurred please try again later.";
    
    // backend apis here :
    vm.backendApiGetProfile = "admin/profile/get";
    vm.backendApiFlagAmber = "admin/profile/flagInvestigatedDeviceJob";
    vm.backendApiGetEncounters = "scriptrTrace/ui/api/getEncountersV2Job";
    vm.backendApiAccountDetails = "admin/profile/accountDetailsJob";
    vm.backendApiScheduleTriggerDataUpload = "scriptrTrace/api/scheduleTriggerDataUpload";
    
    vm.init = function(){
        vm.frmGlobalOptions = {
            "destroyStrategy" : "remove",
            "formDefaults": {"feedback": true}
        }
        if($routeParams && $routeParams.deviceId) {
            vm.getDeviceFromParams();
        }
        
        var searchForm = angular.copy(searchConfig.searchForm);
        vm.schema =  angular.copy(searchForm.schema);
        vm.form =   angular.copy(searchForm.form);
        vm.model = {};

        vm.gridOptionsRef = [
            {
                headerName: "Name", 
                cellClass: "textWrap",
                field: "nameEn",
                width: 200
            },
            {
                headerName: "Date/Time", 
                cellClass: "textWrap",
                field: "encounterDate",
                width: 150
            },
            {
                headerName: "ID", 
                cellClass: "textWrap",
                field: "identifier", 
                width: 150
            },
            {
                headerName: "Mobile Number", 
                cellClass: "textWrap",
                field: "mobile", 
                width: 150
            },
            {
                headerName: "Minutes", 
                field: "encounterMinutes", 
                width: 70
            },
            {
                headerName: "Phone Type", 
                cellClass: "textWrap",
                field: "phoneType", 
                width: 200
            },
            {
                headerName: "Distance", 
                cellClass: "textWrap",
                field: "distance",
                width: 100,
                valueGetter: function(params){
                    return params.data;
                },
                cellRenderer: function(params){
                    if (params.value && params.value.distance && params.value.distance == "risky")
                        return 'Within 2m';
                    else
                        return 'Outside 2m';
                }
            },
            {
                headerName: "Risk Level", 
                field: "severity",
                width: 120,
                valueGetter: function(params){
                    return params.data;
                },
                cellRenderer: function(params){
                    if (params.value.severity == "high")
                        return '<span><i class="fa fa-flag red" aria-hidden="true"></i></span>';
                    else if(params.value.severity == "medium")
                        return '<span><i class="fa fa-flag orange" aria-hidden="true"></i></span>';
                    else
                        return '<span><i class="fa fa-flag blue" aria-hidden="true"></i></span>';
                }
            }
        ];
        
        vm.gridOptions = vm.gridOptionsRef.slice(0);
        
        vm.gridOptionsAction = {
            headerName: 'Action',
            field: 'severity',
            width: 120,
            cellRenderer: function(params){
                var eDiv = document.createElement('div');
                eDiv.innerHTML = '<button class="btn btn-primary btn-flag-amber">Flag as risky</button>';
                var zButton = eDiv.querySelectorAll('.btn-flag-amber')[0];
                zButton.addEventListener('click', function() {
                    vm.doConfirmAmberFlag(params);
                });
                return eDiv;
            }
        };
        
        vm.gridUsers =  [{
            headerName: "Student Id",
            field: "userId",
            width:300
        },{
            headerName: "Name", 
            field: "nameEn",
            width: 300, 
        },{
            headerName: "Mobile Number", 
            field: "mobile", 
            width: 300
        }];

    };

    vm.showAlert = function(type, content) {
        vm.message = {
            "type" : type,
            "content" : content
        }
        vm.hasAlert = true;
        window.scrollTo(0,0);
    };

    vm.closeAlert = function() {
        this.hasAlert = false;
    };

    vm.getUsersInfo = function(){
        vm.gridUsers.api.setRowData(vm.usersInfo);
    };

    vm.handleUserRowClick = function(event){
        vm.userInfo = event.data;
        vm.latestTriggered = false;
        vm.mainLoading = false;
        vm.getTestData();
        vm.loadContacts();
    };
    
    vm.getDeviceFromParams = function(){
        vm.hasDeviceId = true;
        vm.mainLoading = true;
        vm.showSearch = false;
        vm.latestTriggered = false;
        vm.deviceId = $routeParams.deviceId.replace(/\s/g, '');
        vm.searchPassport = $routeParams.deviceId.replace(/\s/g, '');
        vm.latestTriggeredMap[vm.searchPassport] = false;
        vm.getProfile($routeParams.deviceId);
    };
    
    vm.backToSearch = function(){
        vm.mainLoading = true;
        vm.backTriggered = true;
        if($routeParams && $routeParams.deviceId) {
            vm.getDeviceFromParams();
        }else{
            vm.showSearch = true;
            vm.latestTriggered = vm.latestTriggeredMap[vm.searchPassport];
            vm.deviceId = vm.searchPassport;
            vm.showGrid = true;
            vm.getProfile();
        }
    };

    vm.getJobStatus = function(api, params, timeout, successFnc, failureFnc) {
        var checkInterval = 3;
        if (timeout > 0) {
            timeout = timeout - 1;
            httpClient.post(api, params, null,false).then(
                function(data) {
                    console.dir(data);
                    if(data.jobStatus == "complete"){
                        var jobResult = JSON.parse(data.jobResult);
                        if(jobResult.errorJSON){
                            return failureFnc(vm.defaultErrorMsg); 
                        }
                        if(jobResult.resultJSON.response.metadata.status == "success"){
                            successFnc(jobResult.resultJSON.response.result);
                            return;
                        }else{
                            failureFnc(vm.defaultErrorMsg);
                        }

                    }
                    if(data.result != null && data.result.jobDone) {
                        successFnc(data.result);
                        return;
                    }
                    var nextFireTime = checkInterval * 1000;
                    setTimeout(vm.getJobStatus, nextFireTime, api, params, timeout, successFnc, failureFnc);
                },function(ex){
                    failureFnc(ex);
                });
        }else{
            failureFnc("TIME_OUT");
        }
    };

    vm.handleRowClick = function(event){
        //  vm.mainLoading = true;
        vm.backTriggered = false;
        //get passport id from clicked row
        var emiratesIdTrimmed = (event.data.id).replace(/\s/g, '');
        vm.deviceId = emiratesIdTrimmed;
        vm.showSearch = false;
        vm.showGrid = true;
        vm.getProfile(emiratesIdTrimmed);
        vm.loadContacts(emiratesIdTrimmed);
        vm.latestTriggered = vm.latestTriggeredMap[vm.deviceId];
    };

    vm.loadContacts = function(deviceId){
        vm.loading = true;
        vm.noContacts = false;
        if( typeof(deviceId) == "undefined" ||  typeof(deviceId) == "object"){
            deviceId = vm.userInfo.id
        }
        $timeout(function(){ 
            var x = document.getElementById('userInfoDiv');
            if (x) x.scrollIntoView();
        }, 500);
		
        httpClient.get(vm.backendApiGetEncounters, {deviceId : deviceId}).then(function(data, response) {
            if (data) {
                vm.getJobStatus(vm.backendApiGetEncounters, {jobId: data, deviceId : deviceId}, 30, function (data){
                    if (data) {
                        var transformedData = [];
                        
                        // mss: in devMode, generate dummy encounters if real encounter data not available
                        if (Object.keys(data).length == 0 && vm.devMode) {
	                        // mss: random number of encounters between 1 and 10
                            var n = Math.floor(Math.random() * 10 + 1);	
                            for (var i = 1; i <= n; i++) {
                                var bogus = {
                                    'nameEn': 'bogus name en ' + i,
                                    'identifier': 'bogus identifier long ' + i,
                                    'mobile': 'bogus mobile 971000' + i,
                                    'id': 'bogus id 000' + i,
                                    'encounterDate': moment().format("MM/DD/YYYY hh:mm A"),
                                    'encounterMinutes': '' + i*3,
                                    'phoneType': 'bogus phone xyz' + i,
                                    'distance': i % 3 == 0? 'risky': 'bogus',
                                    'severity': ['low', 'medium', 'high'][(i-1) % 3]
                                }
                                transformedData.push(bogus);
                            }
                        }
                        else {
                            for (var key in data) {
                                var entryData = data[key];
                                if(entryData.encounters){
                                    for (var encKey in entryData.encounters) {
                                        var encounterData = entryData.encounters[encKey];
                                        var res = {};
                                        if(entryData.userInfo){
                                            res["nameEn"] = entryData.userInfo.nameEn;
                                            res["identifier"] = entryData.userInfo.userId ? entryData.userInfo.userId : entryData.userInfo.id;
                                            res["mobile"] = entryData.userInfo.mobile;
                                            res["id"] = entryData.userInfo.id
                                        }else{
                                            res["nameEn"] = "N/A";
                                            res["identifier"] = "N/A";
                                            res["mobile"] = "N/A";
                                            res["id"] = "N/A";

                                        }

                                        res["encounterDate"] = moment.unix(encKey).format("MM/DD/YYYY hh:mm A");;
                                        res["encounterMinutes"] = encounterData.minutes;
                                        res["phoneType"] = entryData.model;
                                        res["distance"] = encounterData.distance;
                                        res["severity"] = encounterData.risk;
                                        transformedData.push(res);
                                    }
                                }
                            }
                        }

                        vm.gridData = transformedData;
                        vm.loading = false;
                        if( vm.gridData.length == 0){
                            vm.noContacts = true;
                        } 
                    }else{
                        vm.loading = false;  
                    }
                },function(errorCode, errorDetail){
                    vm.showAlert("danger", errorDetail? errorDetail : errorCode);
                    vm.showLoading = false;
                })
            }else{
                vm.loading = false;   
                vm.showAlert("danger",vm.defaultErrorMsg);
            }
        },function(err) {
            vm.loading = false;   
            vm.showAlert("danger",vm.defaultErrorMsg);
        });
    };

    vm.search = function(form){
        //  vm.mainLoading = true;
        $scope.$broadcast('schemaFormValidate');
        // Then we check if the form is valid
        if (form.$valid) {
            vm.showSearchLoading = true;
            vm.userInfo = null;
            vm.usersInfo = null;
            vm.latestTriggered = false;
            vm.deviceId = (form.searchBox.$modelValue).replace(/\s/g, '');
            vm.searchPassport = (form.searchBox.$modelValue).replace(/\s/g, '');
            vm.latestTriggeredMap[vm.searchPassport] = false;
            vm.getProfile();
        }
    };

    vm.getProfile = function(deviceId){
        vm.showProfileLoading = true;
        var params = {"id": vm.deviceId};
        if( typeof(deviceId) != "undefined"){
            params= {"deviceId": deviceId};
        }

        httpClient.get(vm.backendApiGetProfile, params).then(
            function(data, response) {
                if(data.status == "failure") {
                    vm.success = false;
                    vm.showSearchLoading = false;
                    vm.showAlert("danger",vm.defaultErrorMsg);
                } else {
                    if(data.documents && data.documents.length > 0){
                        if(data.documents.length == 1){
                            vm.userInfo = data.documents[0];
                            vm.showProfileLoading = false;
                            vm.showSearchLoading = false;
                            vm.mainLoading = false
                            vm.getTestData();
                            vm.loadContacts();
                        }else{
                            vm.usersInfo = data.documents;
                            //  vm.mainLoading = true;
                            vm.showProfileLoading = false;
                            vm.showSearchLoading = false;
                            return;
                        }
                    }else{
                        vm.userInfo = null;
                        vm.showProfileLoading = false;
                        vm.showSearchLoading = false;
                        vm.mainLoading = false
                        if(deviceId){
                            vm.showAlert("danger","User Not Found.");
                        }
                    }
                    vm.success = true;
                } 
            }, function(err) {
                vm.showProfileLoading = false;
                vm.mainLoading = false;
                vm.showAlert("danger",vm.defaultErrorMsg);
            }
        );
    };

    vm.getTestData = function(){
        // mss: hide the encountered devices grid while we decide whether to show the action button or not
        vm.showGrid = false;
        
        var params = {"deviceId": vm.userInfo.id};
        var d = $q.defer();
        var fd = new FormData();
        for ( var key in params ) {
            fd.append(key, params[key]);
        }
        vm.showTestResultLoading = true;

        httpClient.post(vm.backendApiAccountDetails, params, null, false).then(
            function(data, response) {
                if(data.status == "failure") {
                    vm.showTestResultLoading = false;
                    vm.showAlert("danger",vm.defaultErrorMsg);
                } else {
                    vm.getJobStatus(vm.backendApiAccountDetails, {jobId:  data.jobId }, 30, function(res) {
                        vm.userInfo.testDate = res.date ? res.date : "Not available";
                        vm.userInfo.testResult = res.riskMessage.en;
                        
                        // mss: if the investigate user is high risk, add an action button to flag the encountered user as amber
                        vm.userInfo.risk = res.risk;
                        vm.gridOptions = vm.gridOptionsRef.slice(0);
                        if (vm.userInfo.risk == 'high') {
                            vm.gridOptions.push(vm.gridOptionsAction);
                        }
                        vm.showGrid = true;
                        // mss: if the investigate user is high risk, add an action button to flag the encountered user as amber
                        
                        vm.showTestResultLoading = false;
                        d.resolve(data, response);
                    },function(err){
                        vm.showAlert("danger",vm.defaultErrorMsg);
                        console.dir(err);
                        vm.showTestResultLoading = false;
                        vm.showSearchLoading = false;
                        d.reject(err);  
                    })
                } 
            }, function(err) {
                vm.showAlert("danger",vm.defaultErrorMsg);
                vm.showTestResultLoading = false;
                d.reject(err);  
            }
        );
        return d.promise; 
    };

    vm.getLatestData = function(){
        vm.latestTriggeredMap[vm.userInfo.id] = true;
        vm.latestTriggered = true;
        console.log("get latest data is triggered");
        httpClient.get(vm.backendApiScheduleTriggerDataUpload, {"deviceId": vm.userInfo.id}).then(
            function(data) {
                console.dir(data);
                vm.showAlert("success", "Job created successfully.");
            },function(ex){
                console.dir(ex);
                vm.showAlert("danger", ex.errorDetail);
            });;
    };

    vm.doConfirmAmberFlag = function(device) {
        vm.closeAlert();
        var deviceName = device && device.data && device.data.nameEn? device.data.nameEn: 'Unknown';
        
        var confirmDialog = $mdDialog.confirm()
            .title('Confirm flagging?')
            .clickOutsideToClose(true)
            .textContent('This person "' + deviceName + '" will be flagged as risky.')
            .ok('Confirm')
            .cancel('Cancel');

        $mdDialog.show(confirmDialog).then(function() {
            console.log('Amber flagging of ' + deviceName + ' confirmed');
            var successHandler = function(data) {
                console.log('api success: ', data);
                vm.showAlert('success', 'User ' + deviceName + ' successfully flagged as risky user');
            }
            var failureHandler = function(err) {
                console.log('api failed: ', err);
                vm.showAlert('danger', 'User ' + deviceName + ' was not flagged as risky user: ' + err.errorDetail);
            }
            
            httpClient.post(vm.backendApiFlagAmber, {'investigatedDeviceId': vm.userInfo.id, 'encounteredDeviceId': device.data.id})
            .then(
            function(data, response) {
                if (data && data.status && data.status == 'failure') {
                    if (typeof failureHandler === 'function') failureHandler(data);
                } else {
                    vm.getJobStatus(vm.backendApiFlagAmber, {jobId: data.result.jobId, 'investigatedDeviceId': vm.userInfo.id, 'encounteredDeviceId': device.data.id}, 30, 
                    	function(data) {
                        	if (typeof successHandler === 'function') successHandler(data);
                    	},
                        function(err){
                        	if (typeof failureHandler === 'function') failureHandler(err);
                    	}
                	);
                } 
            }, function(err) {
                if (typeof failureHandler === 'function') failureHandler(err);
            });
        }, function() {
            console.log('Amber flagging of ' + deviceName + ' cancelled');
        });
    };
	
    vm.doScrollToGrid = function() {
        document.getElementById('encountersGridDiv').scrollIntoView();
    };
    
    vm.viewAsGraph = function(){
        if(vm.showGrid){
            // destroy graph if existant
            d3.selectAll('.graph-container svg').remove();
            vm.showGrid = false;
            vm.graphData = {"nodes": [], "links": []};

            vm.graphData["nodes"].push({"name": vm.userInfo.nameEn, "group": 1, "risk": "none"});

            angular.forEach(vm.gridData, function(value, key){
                vm.graphData["nodes"].push({"name": value.nameEn, "group": 1, "risk": value.severity});
                vm.graphData["links"].push({"source": key + 1, "target": 0, "value": 5});
            });

            vm.buildGraph();
        }else
            vm.showGrid = true;
    };

    vm.buildGraph = function(){
        var svg = d3.select(document.getElementById("graphDiv")).append("svg")
        .attr("width", width)
        .attr("height", height);

        var width = 960, height = 500

        var svg = d3.select(document.getElementById("graphDiv")).append("svg")
        .attr("width", width)
        .attr("height", height);

        var force = d3.layout.force()
        .gravity(0.05)
        .distance(200)
        .charge(-100)
        .size([width, height]);

        force
            .nodes(vm.graphData.nodes)
            .links(vm.graphData.links)
            .start();

        var link = svg.selectAll(".link")
        .data(vm.graphData.links)
        .attr("class", "links")
        .enter().append("line")
        .attr("class", "link");

        var node = svg.selectAll(".node")
        .data(vm.graphData.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);
        // Append a circle
        node.append("svg:circle")
            .attr("r", function(d) { return 30/*return Math.sqrt(d.size) / 10 || 4.5;*/ })
            .style("fill", "#eee")
            .style("stroke", function(d){ if(d.risk == "high") return "#f00"; if(d.risk == "low") return "#00f"; return "#000"});

        node.append("text")
            .attr("class", "nodetext")
            .attr("x", 20)
            .attr("y", 40)
            .attr("fill", "#000")
            .text(function(d) { return d.name; });
        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
    };

}])

myApp.controller('notInQuarantineCtrl', ['$scope', '$rootScope', 'httpClient', function($scope, $rootScope, httpClient) {
    var vm = this;
    vm.gridClass = "";
    vm.renderGrid = false;
    vm.gridAPI = "admin/profile/listOfUsersNotInQuarantine";
    vm.title = "Users Not In Quarantine";

    vm.colDef = [
        {headerName: "Id", field: "value", cellClass: "textWrap", editable : false,
         headerCheckboxSelection: false, checkboxSelection: false
        },
        {headerName: "Type", field: "type", cellClass: "textWrap", editable : false,
         headerCheckboxSelection: false, checkboxSelection: false
        }
    ]

    vm.init = function(){
        vm.renderGrid = true;
    }
}]);

myApp.controller('pauseRequestCtrl', ['$scope', '$rootScope', 'httpClient', '$timeout', '$uibModal', function($scope, $rootScope, httpClient, $timeout, $uibModal) {
    var vm = this;
    vm.gridClass = "";
    vm.gridAPI = "admin/quarantine/pausePermit/getListApi";
    vm.title = "Approved Pause Permits";
    vm.filter = 'all';
    vm.filterParams = {'filter': vm.filter}

    vm.colDef = [
        {headerName: "Id", field: "userId", cellClass: "textWrap", editable : false,
         headerCheckboxSelection: false, checkboxSelection: false,  
         cellRenderer: function(params) {
             return params.value || 'N/A';
         }
        },
        {headerName: "Phone", field: "mobile", cellClass: "textWrap", editable : false,
         headerCheckboxSelection: false, checkboxSelection: false,  
         cellRenderer: function(params) {
             return params.value || 'N/A';
         }
        },
        {headerName: "Starts", field: "startDate", cellClass: "textWrap", editable: false, 
         headerCheckboxSelection: false, checkboxSelection: false,  
         cellRenderer: function(params) {
             if (params.value) {
                 var mv = moment(parseInt(params.value));
                 if (!mv.isValid()) {
                     mv = moment.unix(parseInt(params.value));
                 }
                 var result =  mv.format('DD-MMM-YYYY hh:mma');
                 return result;
             }
             else
                 return params.value;
         }
        },
        {headerName: "Ends", field: "endDate", cellClass: "textWrap", editable: false, 
         headerCheckboxSelection: false, checkboxSelection: false,  
         cellRenderer: function(params) {
             if (params.value) {
                 var mv = moment(parseInt(params.value));
                 if (!mv.isValid()) {
                     mv = moment.unix(parseInt(params.value));
                 }
                 var result =  mv.format('DD-MMM-YYYY hh:mma');
                 return result;
             }
             else
                 return params.value;
         }
        },
        {headerName: "Comments", field: "comments", cellClass: "textWrap", editable : false, width: 300}
    ]

    vm.init = function(){
        vm.renderGrid = true;
    }

    vm.setFilter = function(filter) {
        vm.renderGrid = false;
        console.log("setFilter", filter);
        vm.filterParams = {"filter": filter };

        $timeout(function(){ 
            vm.renderGrid = true}
        , 500);
    }

}]);


angular.module('QmcSearch', ["List", "DataService"]);
angular
  .module('QmcSearch')
  .component(
  'scriptrSearchDevices',
  {
    bindings : {
      "label": "@",
      "api":"@",
      "selectedDevice": "@",
        
      "defaultPath": "@",
      "placeholder": "@",
      "allPath": "@", //If not available, defaultPath is used
      "searchFields": "@",
      "onFormatData": "&",
      
      "appendAllEntry": "<?",
      "titleField":"@",
      
    },
    templateUrl:'/app/view/javascript/components/search/search.html',
    controller: ['httpClient', 'wsClient', 'dataService', '$scope', '$rootScope', '$window', '$location', '$route', '$routeParams', function(httpClient, wsClient,dataService, $scope, $rootScope, $window, $location, $route, $routeParams) {
      
      var self = this;
      this.$onInit = function() {
          
        self.titleField = (self.titleField) ? self.titleField : "id";
        self.searchFields = (self.searchFields) ? self.searchFields : "id,name";
        self.appendAllEntry = (typeof self.appendAllEntry !== 'undefined' || self.appendAllEntry !== null) ? self.appendAllEntry : true;
          
        if(this.selectedDevice){
            self.selectedValue = self.selectedDevice
          this.params = {"id":  self.selectedDevice }
        }
        if(!this.defaultPath) {
          this.defaultPath = "/map";
        }
      }
      
      self.listCallback = function(data, searchBox){
       if(typeof self.onFormatData() == "function"){
              data = self.onFormatData()(data, self);
        }
        var searchData = [];
          
        if(!searchBox.localData || searchBox.localData.length == 0 ) { //First time loading data, add an all
            if(self.appendAllEntry) {
                searchData = [
                    {
                        "id" : "all",
                        "name" : "All"
                    }
                ];
            }
            searchData = searchData.concat(data);
        } else {
           if(searchBox.localData.length > 0) {
               searchData = searchBox.localData.concat(data)
           }  
        }
          
        return _.uniq(searchData, 'id')
        
       /** for(var i = 0; i < data.length; i++) {
         if(self.selectedDevice && data[i].id == self.selectedDevice)
          		self.selectedValue = data[i].id;
         } **/
         
      }
      
      this.onInputChanged = function(text) {
        self.searchText = {"search": text};
      }
      
      self.onSelect = function(data){
        if(data!=undefined) {
          if(data){
            self.selectedValue = data.originalObject.id;
            self.params = {"id": data.originalObject.id}
          }
          if(data && data.originalObject.id == "all") {
             $rootScope.$broadcast('mapRerender');
            //$location.path((self.allPath) ? self.allPath : self.defaultPath);
          } else {
            /**if($routeParams.deviceId)
              $route.updateParams({"deviceId": data.originalObject.id});
            else 
              $location.path(self.defaultPath + "/deviceId/" + data.originalObject.id);
             **/
             $rootScope.$broadcast('mapShowInfoWindowOnMarker',"simulator_" + data.originalObject.id);
          }
          $location.search({});
          return data;
        }
      }
    }]   
  });

agGrid.initialiseAgGridWithAngular1(angular);
angular.module('QmcGrid', ['agGrid', 'ui.bootstrap', 'ngRoute']);

angular
    .module("QmcGrid")
    .component(
    'scriptrQmcGrid',
    {
        bindings : {

            "onLoad" : "&onLoad",
            
            "gridDataIdentifierProperty": "@",

            "columnsDefinition" : "<columnsDefinition",
            
            "rowHeight": "<?",

            "enableServerSideSorting" : "<?", // Note that Client side sorting & filtering does not make sense in virtual paging and is just not supported, only Server side sorting & filtering is supported

            "enableServerSideFilter" : "<?",
            
            "refreshOnEdit": "<?",

            "enableColResize" : "<?",

            "pagination" : "@",  

            "enableDeleteRow" : "<?",

            "fixedHeight" : "<?",  

            "enableAddRow" : "<?",

            "cellEditable" : "<?",

            "enableClientSideSorting": "<?", // client-side sorting

            "api" : "@", // restApi 

            "onInsertRowScript" : "@",

            "onDeleteRowScript" : "@",

            "transport" : "@", //"http" or "wss" or "publish"

            "enableClientSideFilter" : "<?",

            "rowModelType" : "@", // rowModelType can be set to "pagination" or "virtual" (infinite scrolling)

            "rowModelSelection" : "@", //"multiple" or "single"

            "rowDeselection" : "<?",

            "onSelectionChanged": "&?",

            "rowData" : "<?",

            "suppressFilter": "<?",

            "gridHeight" : "@",

            /** pagination properties **/
            "paginationPageSize" : "<?", // In virtual paging context means how big each page in our page cache will be, default is 100

            /** virtual paging properties **/
            "paginationOverflowSize" : "<?", // how many extra blank rows to display to the user at the end of the dataset, which sets the vertical scroll and then allows the grid to request viewing more rows of data. default is 1, ie show 1 row.

            /** virtual paging properties **/
            "maxConcurrentDatasourceRequests" : "<?", // how many server side requests to send at a time. if user is scrolling lots, then the requests are throttled down 

            /** virtual paging properties **/
            "paginationInitialRowCount" : "<?",// how many rows to initially show in the grid. having 1 shows a blank row, so it looks like the grid is loading from the users perspective (as we have a spinner in the first col)

            /** virtual paging properties **/
            "maxPagesInCache" : "<?", // how many pages to store in cache. default is undefined, which allows an infinite sized cache, pages are never purged. this should be set for large data to stop your browser from getting full of data
            "apiParams" : "<?",

            "deleteParams": "<?",

            "addParams": "<?",

            "editParams": "<?",  

            "onFormatData" : "&",

            "onCellValueChanged" : "&",

            "onCellClicked" : "&",  

            "msgTag" : "@",

            "class" : "@",

            "defaultCellRenderer": "&",  

            "onGridReady" : "&",
            
            "useWindowParams": "@",
            
            "onRowDoubleClicked": "&",
            
            "sizeColumnsToFit": "<?",
            
            "onGetRowClass": "&?",
            
            "onGetNodeChildDetails": "&?",
            
             "onIsExternalFilterPresent":  "&?",
             "onDoesExternalFilterPass":  "&?",
             "gridEventsId": "@"
               
        },

        templateUrl : '/app/view/javascript/components/grid/grid.html',
        controller : ['$scope', '$window', '$uibModal', '$timeout', 'wsClient', 'dataStore', '$routeParams', function($scope, $window, $uibModal, $timeout, wsClient, dataStore, $routeParams) {

            var self = this;

            self.broadcastData = null;

            this.dataSource = {
                getRows : function(params) {
                    if(self.broadcastData != null){
                        if(self.broadcastData.api != null){
                            var api = self.broadcastData.api
                            }else{
                                var api = self.api
                                }
                        if(self.broadcastData.params != null){
                            self.apiParams = self.broadcastData.params
                        }
                        if(self.broadcastData.transport != null){
                            var transport = self.broadcastData.transport
                            }else{
                                var transport = self.transport
                                }
                    }else{
                        var api = self.api;
                        var apiParams = APIParams;
                        var transport = self.transport;
                    }
                    var APIParams = self.buildParams(params)
                    var tmp = null;
                    if(typeof self.onFormatData() == "function"){
                        tmp = function(data){ 
                            return self.onFormatData()(data); // Or we can have it as self.onFormatData({"data":data}) and pass it in the on-format-update as: vm.callback(data)
                        }
                    }
                    dataStore.getGridData(api, APIParams, transport, tmp).then(
                        function(data, response) {
                            if (data && data.documents) {
                                var rowsData = data.documents;
                                var count = parseInt(data.count);

                                var cleanedRows = self.cleanRows(rowsData);  
                                params.successCallback(cleanedRows, count);
                                if(self.sizeColumnsToFit)
                                	self.gridOptions.api.sizeColumnsToFit();

                                self.gridOptions.api.doLayout();
                                // if there's no rows to be shown, disbale the next button
                                if(cleanedRows == null || cleanedRows.length == 0){
                                    self.gridOptions.api.showNoRowsOverlay();  
                                    var el = angular.element( document.querySelector( '#btNext' ) );
                                    el.attr('disabled', 'true');
                                    
                                    if(count == 0) {
                                        angular.element(".ag-paging-page-summary-panel > span[ref=lbTotal]")[0].innerHTML = 1
                                    }
                                }else{
                                    self.gridOptions.api.hideOverlay();
                                }
                            } else {
                                params.failCallback();
                                self.gridOptions.api.showNoRowsOverlay();
                            }
                        }, function(err) {
                            console.log("reject", err);
                        });
                }
            }

            this.$onDestroy = function() {
                if(self.msgTag){
                    wsClient.unsubscribe(self.msgTag, null, $scope.$id); 
                }
                console.log("destory Grid")
            }

            this.cleanRows = function(rows){
                if(!Array.isArray(rows)){
                    rows = [rows];
                }
                var fieldExist = false;
                for(var i = 0; i < rows.length; i++){
                    for(row in rows[i]){
                        if(row != "key"){
                            fieldExist = false;
                            for (var n = 0; n < self.gridOptions.columnDefs.length; n++){
                                if(row == self.gridOptions.columnDefs[n].field){
                                    fieldExist = true;
                                    break;
                                }
                            }
                            if(!fieldExist){
                                delete rows[i][row];
                            }
                        }
                    }
                }
                return rows;
            }

            // Get data from backend
            this._createNewDatasource = function() {
                this.gridOptions.api.setDatasource(this.dataSource);
            }

            this.$onInit = function() {
                
                this._dataIdentifierProperty = (this.gridDataIdentifierProperty) ? this.gridDataIdentifierProperty : "key";
                this.useWindowParams = (this.useWindowParams) ? this.useWindowParams : "true";
                
                this.sizeColumnsToFit = (this.sizeColumnsToFit !== undefined) ? this.sizeColumnsToFit : true; //backward compatibility default true
                this.gridOptions = {
                    angularCompileRows: true,
                    domLayout: "autoHeight",
                    rowHeight : (this.rowHeight) ? this.rowHeight : 25,
                    enableSorting: (typeof this.enableClientSideSorting != 'undefined')? this.enableClientSideSorting : true,
                    enableServerSideSorting : (typeof this.enableServerSideSorting != 'undefined')? this.enableServerSideSorting : true,
                    enableServerSideFilter : (typeof this.enableServerSideFilter != 'undefined') ? this.enableServerSideFilter : true,
                    enableColResize : (typeof this.enableColResize != 'undefined') ? this.enableColResize : false,
                    enableFilter : true,
                    columnDefs : this.columnsDefinition,
                    //editType : 'fullRow',    
                    pagination: (typeof this.pagination != "undefined") ? this.pagination : false,  
                    cacheBlockSize: (this.paginationPageSize) ? this.paginationPageSize : 50,
                    rowData: (this.rowData)? this.rowData : null,
                    rowModelType : (this.api) ? "infinite" : "",
                    rowSelection : (this.rowModelSelection) ? this.rowModelSelection : "multiple",
                    paginationPageSize : (this.paginationPageSize) ? this.paginationPageSize : 50,
                    getRowClass: function(event) {
                        if(self.onGetRowClass != null && typeof self.onGetRowClass() == "function"){
                            return self.onGetRowClass()(event, self.gridOptions, self.gridApi);
                        }
                    }, 
                    getNodeChildDetails: function(event) {
                        if(self.onGetNodeChildDetails != null && typeof self.onGetNodeChildDetails() == "function"){
                            return self.onGetNodeChildDetails()(event);
                        }
                    }, 
                    isExternalFilterPresent: function(event) {
                        if(self.onIsExternalFilterPresent != null && typeof self.onIsExternalFilterPresent() == "function"){
                            return self.onIsExternalFilterPresent()();
                        }
                    }, 
    				doesExternalFilterPass: function(event) {
                        if(self.onDoesExternalFilterPass != null && typeof self.onDoesExternalFilterPass() == "function"){
                            return self.onDoesExternalFilterPass()(event);
                        }
                    }, 
                    overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><i class="fa fa-spinner fa-spin fa-fw fa-2x"></i> Please wait while your rows are loading</span>',
                    defaultColDef : {
                        filterParams : {
                            apply : true
                        },
                        suppressFilter: (typeof this.suppressFilter != 'undefined')? this.suppressFilter : false,
                        editable : (typeof this.cellEditable != 'undefined')? this.cellEditable : true,
                        cellRenderer : (typeof this.defaultCellRenderer() == 'function')? this.defaultCellRenderer() : null  
                    },
                    onSelectionChanged: function() {
                        if(self.onSelectionChanged != null && typeof self.onSelectionChanged() == "function"){
                            return self.onSelectionChanged()(self.gridOptions, self.gridApi);
                        }
                    },
                    onCellClicked: function(event) {
                        if(self.onCellClicked != null && typeof self.onCellClicked() == "function"){
                            return self.onCellClicked()(event,self.gridOptions, self.gridApi);
                        }
                    }, 
                    onCellValueChanged: function(event) {
                        
                    },
                    onRowValueChanged : function(event) { // used for adding/editing a row 
                        
                    },
                    onGridReady : function(event) {
                        console.log('the grid is now ready');
                        $timeout(function() {
                            self.gridOptions.api = event.api;
                            self.gridApi = event.api;  
                        }, 3000) 
                        if(typeof self.onGridReady() == "function"){
                            self.onGridReady()(self);
                        }
                        // set "Contains" in the column drop down filter to "StartWith" as it is not supported in document query 
                        event.api.filterManager.availableFilters.text.CONTAINS = "startsWith";
                        if(typeof self.rowData == 'undefined' || self.rowData == null || (self.rowData && self.rowData.length ==0)){
                            if(self.api){
                                self._createNewDatasource();
                            }else{
                                event.api.setRowData([]);
                            }
                        }else{
                            if(self.sizeColumnsToFit)
                            	event.api.sizeColumnsToFit();
                        }
                        // set a numeric filter model for each numerical column
                        if(this.columnsDefinition){
                            for(var i = 0; i < this.columnsDefinition.length; i++){
                                if(this.columnsDefinition[i].hasOwnProperty("type") && this.columnsDefinition[i]["type"] == "numeric"){
                                    this.columnsDefinition[i].filter = "number";
                                }
                            }  
                        }else{
                            //    self.gridOptions.api.showNoRowsOverlay();
                        }
                    },
                    onGridSizeChanged: function(event){
                        if(self.sizeColumnsToFit)
                        	self.gridOptions.api.sizeColumnsToFit();
                    }

                };
                
                    if(self.onRowDoubleClicked != null && typeof self.onRowDoubleClicked() == "function"){
                        self.gridOptions.onRowDoubleClicked = function(row){
                            return self.onRowDoubleClicked()(row)  
                        }
                    }
                this.fixedHeight = (typeof this.fixedHeight != 'undefined') ? this.fixedHeight : true;   
                this.style = {"height": "100%", "width": "100%"};   
                /**if(this.fixedHeight){
                    this.gridHeight = (this.gridHeight) ? this.gridHeight : "500";
                    this.style["height"] = this.gridHeight;
                    this.style["clear"] = "left";
                    this.style["width"] = "100%";
                }else{
                    this.style["height"] = "77%";
                } **/
                this.refreshOnEdit = (typeof this.refreshOnEdit != "undefined") ? this.refreshOnEdit : false;
                this.transport = (this.transport) ? this.transport : "wss";
                this.disableDeleteRow =  (this.enableDeleteRow == true) ? false : true;
                this.disableAddRow =  (this.enableAddRow == true) ? false : true;
                this.mode =  (this.gridOptions.rowModelType == 'infinite') ? "infinite" : "normal";

                if(self.msgTag){
                    dataStore.subscribe(this.onServerCall, self.msgTag, $scope);
                }

                $scope.$on("updateGridData", function(event, broadcastData) {
                    self.broadcastData = broadcastData;
                    self._createNewDatasource();
                });
                
                $scope.$on("runExternalFilter-"+self.gridEventsId, function(event, broadcastData) {
                    self.gridOptions.api.onFilterChanged();
                });
                
            }

            this.closeAlert = function() {
                this.show = false;
            };

            this.showAlert = function(type, content) {
                self.message = {
                    "type" : type,
                    "content" : content
                }
                self.showError = true;
                $timeout(function(){
                    self.showError = false;
                }, 5000);
            }

            this._saveData = function(event){
                if(event.data && event.data[self._dataIdentifierProperty]){
                    var params = event.data;
                    params.action = "edit";
                    if(this.editParams){
                        for(var key in this.editParams){
                            params[key] = this.editParams[key]
                        }
                    }  
                    dataStore.gridHelper(self.api, params).then(
                        function(data, response) {
                            self.gridOptions.api.hideOverlay();  
                            if (data && (data.result == "success" || data.status == "success")) {
                                //       self.showAlert("success", "Row(s) updated successfuly");
                                if(self.refreshOnEdit){
                                     self.onServerCall(data);
                                }
                            } else {
                                self.undoChanges();
                                if(data && data.errorDetail){
                                    self.showAlert("danger", data.errorDetail);
                                }else{
                                    self.showAlert("danger", "An error has occured");
                                }
                            }
                        },
                        function(err) {
                            self.gridOptions.api.hideOverlay();   
                            console.log("reject", err);
                            self.showAlert("danger", "An error has occured");
                        });
                }else{
                    var params = event.data;
                    params.action = "add";
                    if(this.addParams){
                        for(var key in this.addParams){
                            params[key] = this.addParams[key]
                        }
                    }   
                    dataStore.gridHelper(self.api, event.data).then(
                        function(data, response) {
                            self.gridOptions.api.hideOverlay();   
                            if (data && (data.result == "success" || data.status == "success")) {
                                //	  self.showAlert("success", "Row(s) Added successfuly");
                                if(self.refreshOnEdit){
                                     self.onServerCall(data);
                                }

                            } else {
                                self.undoChanges();
                                if(data && data.errorDetail){
                                    self.showAlert("danger", data.errorDetail);
                                }else{
                                    self.showAlert("danger", "An error has occured");
                                }
                            }
                        },
                        function(err) {
                            self.gridOptions.api.hideOverlay();   
                            console.log("reject", err);
                            self.showAlert("danger", "An error has occured");
                        });
                }
            }

            this.onAddRow = function(){
                var newRow = {};
                // Create a json object to save new row fields 
                for (var n = 0; n < self.gridOptions.columnDefs.length; n++){
                    newRow[self.gridOptions.columnDefs[n].field] = "";
                }
                self.gridOptions.api.insertItemsAtIndex(0, [newRow]);
                self.gridOptions.api.setFocusedCell(0, self.gridOptions.columnDefs[0].field);
                self.gridOptions.api.startEditingCell({
                    rowIndex: 0,
                    colKey: self.gridOptions.columnDefs[0].field,
                    charPress: self.gridOptions.columnDefs[0].field
                });
            }

            this.openConfirmationPopUp = function(){
                if(self.gridOptions.api.getSelectedNodes().length > 0){
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: 'deleteConfirmation',
                        size: 'md',
                        resolve: {
                            grid: function () {
                                return self;
                            }
                        }
                    }); 
                }
            }

            this.onRemoveRow = function(key) {
                if(self.gridOptions.rowModelType == "infinite"){
                    if(self.api){
                        var selectedNodes = self.gridOptions.api.getSelectedNodes();
                        var selectedKeys = [];
                        for(var i = 0; i < selectedNodes.length; i++){
                           	selectedKeys.push(selectedNodes[i].data[self._dataIdentifierProperty]);
                        }
                        if(selectedKeys.length > 0){
                            self.gridOptions.api.showLoadingOverlay();   
                            var params = {keys : selectedKeys, action: "delete"}
                            if(this.deleteParams){
                                for(var key in this.deleteParams){
                                    params[key] = this.deleteParams[key]
                                }
                            }  
                            dataStore.gridHelper(self.api, params).then(
                                function(data, response) {
                                    self.gridOptions.api.hideOverlay();     
                                    if (data && (data.result == "success" || data.status == "success")) {
                                        self.showAlert("success", "Row(s) deleted successfuly");
                                        self.onServerCall(data);
                                    } else {
                                        if(data && data.errorDetail){
                                            self.showAlert("danger", data.errorDetail);
                                        }else{
                                            self.showAlert("danger", "An error has occured");
                                        }
                                    }
                                },
                                function(err) {
                                    self.gridOptions.api.hideOverlay();     
                                    console.log("reject", err);
                                    self.showAlert("danger", "An error has occured");
                                });
                        }
                    }else{
                        self.showAlert("danger", "No script defined for delete row");
                    }
                }else{
                    var selectedNodes = self.gridOptions.api.getSelectedNodes();
                    self.gridOptions.api.removeItems(selectedNodes);
                }
            }

            this.onServerCall = function(data){
                self.gridOptions.api.refreshInfiniteCache();
            }

            this.undoChanges = function(data){
                if(self.oldEditedValue){ // undo field rename
                    self.gridOptions.api.forEachNode(function(node) {
                        if (node.childIndex == self.editedChildIndex || node.id == self.editedChildIndex) {
                            node.setSelected(true, true);
                        }
                    });
                    var selectedNode = self.gridOptions.api.getSelectedNodes()[0];
                    selectedNode.data[self.editedColumn] = self.oldEditedValue;
                    self.gridOptions.api.refreshView();
                }else{ // undo insert row
                    self.gridOptions.api.refreshInfiniteCache();
                }
            }

            this.onFilterChanged = function() {
                this.gridOptions.enableServerSideFilter = false;
                this.gridOptions.api.setQuickFilter(this.quickFilterValue);
                this.gridOptions.enableServerSideFilter = true;
            }

            this.onServerFilterChanged = function() {
                self._createNewDatasource();
            }

            this.buildParams = function(params) {
                var queryFilter = self.serverFilterText;
                var columnName = null;
                var type = null;
                var pageNumber = params.endRow / this.gridOptions.paginationPageSize;
                if (params.sortModel && params.sortModel.length > 0) {
                    var sort = params.sortModel[0].sort;
                    var sortingColumnName = params.sortModel[0].colId;
                    type = (this.gridOptions.api.getColumnDef(sortingColumnName).type) ? this.gridOptions.api.getColumnDef(sortingColumnName).type : null;
                }
                if (params.filterModel) {
                    for (p in params.filterModel) {
                        queryFilter = params.filterModel[p].filter;
                        var queryType = params.filterModel[p].type;
                        var filterColumnName = p;
                        type = (this.gridOptions.api
                                .getColumnDef(filterColumnName).type) ? this.gridOptions.api
                            .getColumnDef(filterColumnName).type
                        : null;
                    }
                }
                var APIParams = {
                    "resultsPerPage" : this.gridOptions.paginationPageSize,
                    "pageNumber" : pageNumber
                }
                if (sortingColumnName) {
                    APIParams["sortingColumnName"] = sortingColumnName;
                }
                if (filterColumnName) {
                    APIParams["filterColumnName"] = filterColumnName;
                }
                if (sort) {
                    APIParams["sort"] = sort;
                }
                if (type) {
                    APIParams["sortType"] = type;
                }
                if (queryFilter) {
                    APIParams["queryFilter"] = queryFilter;
                }
                if (queryType) {
                    APIParams["queryType"] = queryType;
                }
                APIParams["startRow"] = params.startRow;
                APIParams["endRow"] = params.endRow;
                if(this.apiParams){
                    for(var param in this.apiParams){
                        APIParams[param] = this.apiParams[param];
                    }
                }
                if (self.useWindowParams && self.useWindowParams == "true") {
                    APIParams = angular.merge(APIParams,$routeParams)
                }
                return APIParams;
            }

        }]
    });

angular
    .module('Grid')
    .service("dataStore", ['httpClient', 'wsClient', '$q', function(httpClient, wsClient, $q) {

    this.subscribe = function(callback, tag, $scope){
        wsClient.onReady.then(function() {
            wsClient.subscribe(tag, callback.bind(self), $scope.$id);
        });
    }

    this.gridHelper = function(api, params){
        var d = $q.defer(); 
        httpClient
            .get(api, params, "grid").then(function(data, response){
            d.resolve(data, response)
        }, function(err) {
            d.reject(err)
        });
        return d.promise;
    }


    this.getGridData = function(api, params, transport, formatterFnc) {

        var d = $q.defer(); 
        var self = this;
        if(transport == "https"){
            httpClient
                .get(api, params).then(function(data, response){
                if(formatterFnc /**Check if function also*/){
                    data = formatterFnc(data);
                }
                if(data && data.documents){
                    var data = {"documents": data.documents, "count": data.count}
                    d.resolve(data, response)
                }else{
                    d.resolve(null, response)
                }
            }, function(err) {
                d.resolve(null);
                d.reject(err);
            });
            return d.promise;
        } else if(transport == "wss"){
            if(api && typeof api != 'undefined'){
                wsClient.onReady.then(function() {
                    wsClient
                        .call(api, params, "grid").then(function(data, response) {
                        if(formatterFnc /**Check if function also*/){
                            data = formatterFnc(data);
                        }
                        if(data && data.documents){
                            var data = {"documents": data.documents, "count": data.count}
                            d.resolve(data, response)
                        }else{
                            d.resolve(null, response)
                        }
                    }, function(err) {
                        d.resolve(null);
                        d.reject(err);
                    }
                                                       ); 
                }); 
                return d.promise;
            }else{
                wsClient.onReady.then(function() {
                    wsClient.publish(params, "publish").then(function(data, response) {
                        if(data && data.documents){
                            var data = {"documents": data.documents, "count": data.count}
                            d.resolve(data, response)
                        }else{
                            d.resolve(null, response);
                        }
                    }, function(err) {
                        d.resolve(null);
                        d.reject(err);
                    }
                                                            );
                }); 
                return d.promise;
            }
        }
    }

}]);

angular
    .module('Grid')
    .component('deleteConfirmation', 
               {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    templateUrl:  '/UIComponents/dashboard/frontend/components/grid/popup.html',
    controller: ['$scope', function ($scope) {

        this.onSubmit = function() {
            this.resolve.grid.onRemoveRow();
            this.close({$value: true});
        };
        this.onCancel = function () {
            this.dismiss({$value: false});
        };
    }]
});

angular.module("QmcForms", [
	"underscore", 
	"btford.markdown", 
	"schemaForm", 
	"ui.bootstrap", 
	"ngRoute", 
	"ngAnimate", 
	"ngSanitize", 
	"WsClient", 
	"HttpClient", 
	"DataService", 
	"ngMaterial", 
	"ngMessages", 
	"material.svgAssetsCache", 
	"angularSpectrumColorpicker",
	"angular-underscore/filters", 
	"ui.codemirror",  
	"mgcrea.ngStrap", 
	"mgcrea.ngStrap.modal",
    "pascalprecht.translate",
    'ui.select', 
    'ui.highlight',
    'mgcrea.ngStrap.select']);
angular
  .module('QmcForms')
  .component('scriptrQmcFormOverlay', 
  {
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    templateUrl: '/app/view/javascript/components/forms/overlayForm.html',
    controller: ['$scope', function ($scope) {
        
       var self=this;
       this.$onInit = function () {
          
        this.widget = this.resolve.widget;
        
        $scope.$broadcast('schemaFormRedraw')
       
        this.frmGlobalOptions = {
          "destroyStrategy" : "remove",
          "formDefaults": {"feedback": false}
        }

        if(this.widget) {
            if(this.widget.schema) {
              this.schema =  angular.copy(this.widget.schema)
            } 
            if(this.widget.form) {
               this.form =   angular.copy(this.widget.form)
            }
            
            this.model =  (this.widget.options) ?  angular.copy(this.widget.options) : {}
            
            if(this.widget.onFormModelChange) {
                 this.frmGlobalOptions["formDefaults"].onChange = this.widget.onFormModelChange;
            }
              
          }
      };
        
      this.highlightTabs = function (formName) {
            var rootEl = $('form[name="' + formName + '"]');
            var tabHeaders = rootEl.find('ul li');
            var tabPanes = rootEl.find('.tab-pane') || [];
            rootEl.find('ul li a span.badge').remove();

            for (var i = 0; i < tabPanes.length; i++) {
                var errorCount = $(tabPanes[i]).find('div.ng-invalid').length;
                if (errorCount > 0) {
                    $(tabHeaders[i].childNodes[0]).append('<span class="badge sf-badge-error">' + errorCount + '</span>');
                }
            }
    	};
    

      this.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        console.log(this.model);
          
           setTimeout(function() {
           self.highlightTabs(form.$name);
        }, 100);

        // Then we check if the form is valid
        if (form.$valid) {
          //angular.extend(this.widget.options, this.model);
          this.close({$value: this.model});
          //do whatever you need to do with your data.
          //$scope.$emit('update_widget', {"model":  this.model});
          console.log("component_form_parent", this.model)
        } 
      };

      this.onCancel = function (myForm) {
        this.schema = {};
        this.form = {}
        this.model = angular.copy(this.widget.options);
        this.dismiss({$value: 'cancel'});
        console.log("Dissmissed")
      };

    }]
});
var changePasswordForm = 
    {
        "form" : [ {
            "type" : "section",
            "htmlClass" : "row",
            "items" : [   
                
                 {
                    "type" : "section",
                    "htmlClass" : "col-xs-4",
                    "items" : [
                        {
                            "key" : "oldPassword",
                            "type": "password"
                        },
                        {
                            "key" : "newPassword",
                            "type": "password",
                            "ngModelOptions": { allowInvalid: true },
                            "onChange": function(modelValue, form, model, scope) {
                                console.log(model)
                                if(modelValue != model["confirmPassword"])
                                    scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',false);
                                else {
                                    scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                    scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                }
                             }
                        },
                        {
                            "key" : "confirmPassword",
                            "type": "password",
                            "ngModelOptions": { allowInvalid: true },
                            "onChange": function(modelValue, form, model, scope) {
                                console.log(model)
                                 if(modelValue != model["newPassword"])
                                    scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',false);
                                 else {
                                     scope.$root.$broadcast('schemaForm.error.newPassword','doNotMatch',true);
                                     scope.$root.$broadcast('schemaForm.error.confirmPassword','doNotMatch',true);
                                 }
                             }
                        }
                 	]
                 }
            ]
        }],
        "schema" : {
            "type" : "object",
            "title" : "Schema",
            "properties" : {
                "oldPassword": {
                    "title": "Current Password",
                    "type": "string"
                },
                "newPassword": {
                    "title": "New password",
                    "type": "string",
                    "validationMessage": {
                      	"doNotMatch": "Passwords do not match."
                     }
                },
                "confirmPassword" : {
                    "type" : "string",
                    "title": "Confirm password",
                    "validationMessage": {
                      	"doNotMatch": "Passwords do not match."
                     }
                }
            },
            "required" : [ "currentPassword", "newPassword", "confirmPassword" ]
        }
    };

myApp.constant("changePasswordForm", changePasswordForm).controller('changePasswordCtrl', ['$scope', '$rootScope', 'wsClient', 'httpClient', '$sce', '$route', '$routeParams', '$interval', '$filter', '$location', 'changePasswordForm', '$cookies', '$timeout', function ($scope, $rootScope, wsClient, httpClient, $sce, $route, $routeParams, $interval, $filter, $location, changePasswordForm, $cookies, $timeout) {
    var vm = this;
    var changePasswordApi = "login/api/changePassword";
    vm.init = function() {
        vm.frmGlobalOptions = {
            "destroyStrategy" : "remove",
            "formDefaults": {"feedback": false},
            "validationMessage": { 
                302: "Required field."
            }
        }
        vm.schema =  angular.copy(changePasswordForm.schema);
        vm.form =   angular.copy(changePasswordForm.form);
        vm.model = {}
    }
    
    
    vm.changePassword = function(form) {
        $scope.$broadcast('schemaFormValidate');
        // Then we check if the form is valid
        if (form.$valid) {
             var params = {
                 "oldPassword": vm.model["oldPassword"],
                 "newPassword": vm.model["newPassword"]
             }
         	 httpClient.get(changePasswordApi, params ).then(
                function(data, response) {
                  if(data && data.token) {
                      console.log("data: ", data);
                      vm.successMsg = "Password changed successfully."
                     //MFE: we cannot use $cookies as ngCookies encodes as uri the cookies
                      //$cookies.put('token', data["token"], {'expires': data["expires"], 'path': data["path"]});
                     // $cookies.put('user', data["user"]);
                      window.document.cookie = "token=" + data["token"] + ";expires=" + data["expires"]+ ";Path=/;Secure";
                      window.document.cookie = "user=" + JSON.stringify(data["user"]) + ";expires=" + data["expires"]+ ";Path=/;Secure";
                      httpClient.updateToken(data["token"] );
                      wsClient.updateTokenAndReconnect();
                  }
                  console.log("resolve", data)
                },
                function(err) {
                  if(err.errorCode == "INVALID_CREDENTIALS")
                      vm.errorMsg = "Invalid current password."
                  else
                      vm.errorMsg = err.errorDetail;
                  console.log("reject", err);
                }
              )
        } 
       
    },
        
    vm.closeMessage = function() {
        vm.successMsg = "";
        vm.errorMsg = "";
    }
}]);




myApp.constant("constants", {
 appTitle: "Saepio - Stay Safe",
    
 source  : {
    "branch" : {
        "normal": { 
            "mapMarker": {
                url: "{{cdnImagesPath}}normal-bank.png"
            }
        },
       "alert": {
            "mapMarker": {
              url: "{{cdnImagesPath}}alert-bank.png"
            }
        }
     },
     "headOffice" : {
        "normal": { 
            "mapMarker": {
                url: "{{cdnImagesPath}}normal-corporate.png"
            }
        },
       "alert": {
            "mapMarker": {
              url: "{{cdnImagesPath}}alert-corporate.png"
            }
        }
     },
     "corporate" : {
        "normal": { 
            "mapMarker": {
                url: "{{cdnImagesPath}}normal-corporate.png"
            }
        },
       "alert": {
            "mapMarker": {
              url: "{{cdnImagesPath}}alert-corporate.png"
            }
        }
     },
     "ship" : {
        "normal": { 
            "mapMarker": {
                url: "{{cdnImagesPath}}normal-ship.png"
            }
        },
       "alert": {
            "mapMarker": {
              url: "{{cdnImagesPath}}alert-ship.png"
            }
        }
     }
  }, 
  quarantineState  : {
    "warn": { 
   	  "mapMarker": {
          url: "{{cdnImagesPath}}orange.png"
   	  }
    },
    "inQuarantine": { 
   	  "mapMarker": {
          url: "{{cdnImagesPath}}green.png"
   	  }
    },
   "alert": {
        "mapMarker": {
          url: "{{cdnImagesPath}}red.png"
   	    }
    },
    "failure": {
        "mapMarker": {
          url: "{{cdnImagesPath}}red.png"
   	    }
    },
   "breachConfinement": {
        "mapMarker": {
          url: "{{cdnImagesPath}}red.png"
   	    }
    },
    "escalated": {
        "mapMarker": {
          url: "{{cdnImagesPath}}red.png"
   	    }
    }
  }, 
  sources : {
    "simulator": { 
   	  "mapMarker": {
          url: "{{cdnImagesPath}}/sick.png"
   	  }
    }
  },
  sourcesLabels: {
    "simulator": "Quarantine Command center"
  },
  infoWindows: {
    "icons": {
        "id": '<img alt="passport icon" class="modalIcons" src="{{cdnImagesPath}}passport.png">',
        "phone": '<img alt="phone icon" class="modalIcons" src="{{cdnImagesPath}}phone.png" />',
        "optimalOccupancy": '<img alt="phone icon" class="modalIcons" src="{{cdnImagesPath}}optimal-occupancy.png" />',
        "maxOccupancy": '<img alt="phone icon" class="modalIcons" src="{{cdnImagesPath}}max-occupancy.png" />',
        "averageOccupancy": '<img alt="phone icon" class="modalIcons" src="{{cdnImagesPath}}average-occupancy.png" />',
        "testresult": '<img alt="test result icon" class="modalIcons" src="{{cdnImagesPath}}testResult.png" />',
        "coronatest": '<img alt="calendar icon" class="modalIcons" src="{{cdnImagesPath}}calender.png" />',
        "missed": '<img alt="missed scan icon" class="modalIcons" src="{{cdnImagesPath}}error.png" />',
        "clock": '<img alt="clock icon" class="modalIcons" src="{{cdnImagesPath}}clock.png" />',
        "alarmon": '<img alt="alarm on icon" class="modalIcons" src="{{cdnImagesPath}}alarmOn.png" />',
        "alarmoff": '<img alt="alarm off icon" class="modalIcons" src="{{cdnImagesPath}}alarmOff.png" />',
        "timer": '<img alt="time remaining icon" class="modalIcons" src="{{cdnImagesPath}}timer.png" />',
        "quarantine": '<img alt="calendar icon" src="{{cdnImagesPath}}calender.png" />',
     }
  }
})