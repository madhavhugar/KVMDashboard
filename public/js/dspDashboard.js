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

				.state('vminfo', {
					url: '/dsp/:serverId/:vmid',
					templateUrl: 'dsp-vminfo.html'
				})
		})

		.controller('labinfoController', ['$state', '$stateParams', '$http' , function($state, $stateParams, $http){
			labCon = this;
			labCon.params = $stateParams;
			
			switch(labCon.params.serverId) {
				case "1":
					labCon.name = "GroupServer";
					labCon.url = '/dspgroup';
					break;
				case "2":
					labCon.name = "LabServer01";
					labCon.url = '/dsplab01';
					break;
				case "3":
					labCon.name = "LabServer02";
					labCon.url = "/dsplab02";
					break;
				case "4":
					labCon.name = "LabServer03";
					labCon.url = "/dsplab03";
					break;
				case "5":
					labCon.name = "LabServer04";
					labCon.url = "/dsplab04";
					break;
				default:
					labCon.name = "Invalid Server"
					labCon.url = "/dsp"
			}
			
			$http({
				method: 'GET',
			  	url: "/dsp" + labCon.url
			}).then(function successCallback(response) {
				console.log('Success, Got some data');
				console.log(response);
				labCon.list = response.data;
			  }, function errorCallback(response) {
				console.log('Error, no data recieved');
	  });

			$http({
				method: 'GET',
				url: "/conciseinfo" + labCon.url
			}).then(function successCallback(response) {
					console.log('Got some more data');
					console.log(response);
					labCon.info = response.data;
					console.log(labCon.info.vminfo[0].name);
			}, function errorCallback(response) {
					console.log('Error, no data recieved');
			});
			//remove this
			//labCon.dummylist = { "vmlist" : [ {"name":"dsp-vm-student-tadasa","status":"running"}, {"name":"dsp-student-cnlab","status":"shut"} ]};

		}])

		.controller('vminfoController', ['$state', '$stateParams', '$http', function($state, $stateParams, $http){
			virtCon = this;
			virtCon.params = $stateParams;
			//console.log('/dsp/dspgroup/' + virtCon.params.vmid);

			switch(virtCon.params.serverId) {
				case "1":
					virtCon.name = "GroupServer";
					virtCon.url = '/dsp/dspgroup/' + virtCon.params.vmid;
					break;
				case "2":
					virtCon.name = "LabServer01";
					virtCon.url = '/dsp/dsplab01/' + virtCon.params.vmid;
					break;
				case "3":
					virtCon.name = "LabServer02";
					virtCon.url = "/dsp/dsplab02/" + virtCon.params.vmid;
					break;
				case "4":
					virtCon.name = "LabServer03";
					virtCon.url = "/dsp/dsplab03/" + virtCon.params.vmid;
					break;
				case "5":
					virtCon.name = "LabServer04";
					virtCon.url = "/dsp/dsplab04/" + virtCon.params.vmid;
					break;
				default:
					virtCon.name = "Invalid Server"
					virtCon.url = "/dsp"
			}

				//console.log(virtCon.url)
				$http({
					method: 'GET',
				  	url: virtCon.url
				}).then(function successCallback(response) {
					console.log('Success, Got some data');
					console.log(response);
					virtCon.list = response.data;
				  }, function errorCallback(response) {
					console.log('Error, no data recieved');
	  });
				//virtCon.dummylist = {"domain":{"type":"kvm","id":"20","name":"dsp-student-lab-silo-group1-2","uuid":"552fc171-cc8b-4d18-9cd5-963ebf5120d3","memory":{"unit":"KiB","$t":"4096000"},"currentMemory":{"unit":"KiB","$t":"4096000"},"vcpu":{"placement":"static","$t":"2"},"cputune":{"vcpupin":[{"vcpu":"0","cpuset":"1"},{"vcpu":"1","cpuset":"2"}]},"resource":{"partition":"/machine"},"os":{"type":{"arch":"x86_64","machine":"pc-i440fx-wily","$t":"hvm"},"boot":{"dev":"hd"}},"features":{"acpi":{},"apic":{},"vmport":{"state":"off"}},"cpu":{"mode":"custom","match":"exact","model":{"fallback":"allow","$t":"kvm64"},"feature":{"policy":"require","name":"ssse3"}},"clock":{"offset":"utc","timer":[{"name":"rtc","tickpolicy":"catchup"},{"name":"pit","tickpolicy":"delay"},{"name":"hpet","present":"no"}]},"on_poweroff":"destroy","on_reboot":"restart","on_crash":"restart","pm":{"suspend-to-mem":{"enabled":"no"},"suspend-to-disk":{"enabled":"no"}},"devices":{"emulator":"/usr/bin/kvm-spice","disk":[{"type":"file","device":"disk","driver":{"name":"qemu","type":"qcow2"},"source":{"file":"/var/lib/libvirt/images/dsp-student-lab-silo-group1-2.qcow2"},"backingStore":{},"target":{"dev":"vda","bus":"virtio"},"alias":{"name":"virtio-disk0"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x07","function":"0x0"}},{"type":"file","device":"cdrom","driver":{"name":"qemu","type":"raw"},"backingStore":{},"target":{"dev":"hda","bus":"ide"},"readonly":{},"alias":{"name":"ide0-0-0"},"address":{"type":"drive","controller":"0","bus":"0","target":"0","unit":"0"}}],"controller":[{"type":"usb","index":"0","model":"ich9-ehci1","alias":{"name":"usb"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x06","function":"0x7"}},{"type":"usb","index":"0","model":"ich9-uhci1","alias":{"name":"usb"},"master":{"startport":"0"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x06","function":"0x0","multifunction":"on"}},{"type":"usb","index":"0","model":"ich9-uhci2","alias":{"name":"usb"},"master":{"startport":"2"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x06","function":"0x1"}},{"type":"usb","index":"0","model":"ich9-uhci3","alias":{"name":"usb"},"master":{"startport":"4"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x06","function":"0x2"}},{"type":"pci","index":"0","model":"pci-root","alias":{"name":"pci.0"}},{"type":"ide","index":"0","alias":{"name":"ide"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x01","function":"0x1"}},{"type":"virtio-serial","index":"0","alias":{"name":"virtio-serial0"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x05","function":"0x0"}}],"serial":{"type":"pty","source":{"path":"/dev/pts/4"},"target":{"port":"0"},"alias":{"name":"serial0"}},"console":{"type":"pty","tty":"/dev/pts/4","source":{"path":"/dev/pts/4"},"target":{"type":"serial","port":"0"},"alias":{"name":"serial0"}},"channel":{"type":"spicevmc","target":{"type":"virtio","name":"com.redhat.spice.0","state":"disconnected"},"alias":{"name":"channel0"},"address":{"type":"virtio-serial","controller":"0","bus":"0","port":"1"}},"input":[{"type":"mouse","bus":"ps2"},{"type":"keyboard","bus":"ps2"}],"graphics":{"type":"vnc","port":"5903","autoport":"yes","listen":["127.0.0.1",{"type":"address","address":"127.0.0.1"}]},"sound":{"model":"ich6","alias":{"name":"sound0"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x04","function":"0x0"}},"video":{"model":{"type":"qxl","ram":"65536","vram":"65536","vgamem":"16384","heads":"1"},"alias":{"name":"video0"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x02","function":"0x0"}},"hostdev":{"mode":"subsystem","type":"pci","managed":"yes","driver":{"name":"vfio"},"source":{"address":{"domain":"0x0000","bus":"0x03","slot":"0x0e","function":"0x1"}},"alias":{"name":"hostdev0"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x03","function":"0x0"}},"redirdev":[{"bus":"usb","type":"spicevmc","alias":{"name":"redir0"}},{"bus":"usb","type":"spicevmc","alias":{"name":"redir1"}}],"memballoon":{"model":"virtio","alias":{"name":"balloon0"},"address":{"type":"pci","domain":"0x0000","bus":"0x00","slot":"0x08","function":"0x0"}}},"seclabel":{"type":"dynamic","model":"apparmor","relabel":"yes","label":"libvirt-552fc171-cc8b-4d18-9cd5-963ebf5120d3","imagelabel":"libvirt-552fc171-cc8b-4d18-9cd5-963ebf5120d3"}}};
				//console.log(virtCon.dummylist.domain.devices.disk[0].source.file);
		}])
