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
			/*if(labCon.params.serverId == 1){
				
			}else if(labCon.params.serverId == 2){
				
			}*/
			switch(labCon.params.serverId) {
				case "1":
					labCon.name = "GroupServer";
					labCon.url = '/dsp/dspgroup';
					break;
				case "2":
					labCon.name = "LabServer01";
					labCon.url = '/dsp/dsplab01';
					break;
				case "3":
					labCon.name = "LabServer02";
					labCon.url = "/dsp/dsplab02";
					break;
				case "4":
					labCon.name = "LabServer03";
					labCon.url = "/dsp/dsplab03";
					break;
				case "5":
					labCon.name = "LabServer04";
					labCon.url = "/dsp/dsplab04";
					break;
				default:
					labCon.name = "Invalid Server"
					labCon.url = "/dsp"
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