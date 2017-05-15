(function () {
    'use strict';

    angular
		.module('AngularLab1')
        .factory('participantFactory', participantFactory);

    participantFactory.$inject = ['$log', '$http'];

	function participantFactory($log, $http) {
        var oParticipantService = {};

		oParticipantService.GetTotalParticipants = function (oData) {
			return "You have " + oData.length + " participants.";
		};

		oParticipantService.GetParticipantInfo = function (pid, callbackfunc) {
			$http({ method: "GET", url: "/example/GetParticipantInfo/" + pid }).then(
				function (response) {
					callbackfunc(response.data, response.status);
				}, function (error) {
					$log.error("Error Occured - " + error.status);
					callbackfunc(error.data, error.status);
				}
			);
		};

		return oParticipantService;		
    }
})();