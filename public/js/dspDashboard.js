angular
		.module('dspDashboard', ['ui.router'])

		.config(function($stateProvider, $urlRouterProvider) {
			
			$urlRouterProvider.otherwise('/dsp');

			$stateProvider
				.state('dsphome', {
					url: '/dsp',
					templateUrl: 'dsp-home.html'
				})

				.state('about', {
					url: '/dsp/about',
					templateUrl: 'dsp-about.html'
				})

				.state('dsplabinfo', {
					url: '/dsp/:serverId',
					templateUrl: 'dsp-labinfo.html',
					//controller: 'labinfoController'
				})
		})

		.controller('labinfoController', ['$state', '$stateParams', '$http' , function($state, $stateParams, $http){
			labCon = this;
			labCon.params = $stateParams;
			if(labCon.params.serverId == 1){
				labCon.name = "GroupServer";
				labCon.url = '/dsp/dspgroup'
			}else if(labCon.params.serverId == 2){
				labCon.name = "LabServer01";
				labCon.url = '/dsp/dsplab01'
			}
			
			$http({
				method: 'GET',
			  	url: labCon.url
			}).then(function successCallback(response) {
				console.log('Success, Got some data');
				console.log(response);
				labCon.list = response.data;
			  }, function errorCallback(response) {
				console.log('Error, no data recieved');
	  });

		}])