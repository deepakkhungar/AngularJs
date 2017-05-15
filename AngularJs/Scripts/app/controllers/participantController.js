(function () {
    'use strict';

    angular
        .module('AngularLab1')
        .controller('participantController', participantController);

	participantController.$inject = ['$scope', '$filter', 'participantFactory'];

	function participantController($scope, $filter, participantFactory) {
        $scope.title = 'participantController';

		$scope.Participants = [];

		$scope.ParticipantInfo = {
			"PID": "",
			"Name": "",
			"Gender": "",
			"Age": "",
			"Color" : ""
		};

		$scope.GetTotalParticpants = function () {
			alert(participantFactory.GetTotalParticipants($scope.Participants));
		};

		$scope.$watch("ParticipantInfo", function () {
			for (var iIdx = 0; iIdx <= $scope.Participants.length - 1; iIdx++)
			{
				var oData = $scope.Participants[iIdx];

				if (oData.Age > 80) {
					oData.Color = "Red";
				}
				else
				{
					oData.Color = "White";
				}
			}
		});

		$scope.SaveParticipant = function () {
			var oData = $scope.IsParticipantExists($scope.ParticipantInfo.PID);

			if (oData.length <= 0) {
				$scope.Participants.push($scope.ParticipantInfo);
			}
			else
			{
				oData[0].Name = $scope.ParticipantInfo.Name;
				oData[0].Gender = $scope.ParticipantInfo.Gender;
				oData[0].Age = $scope.ParticipantInfo.Age;
			}
			
			$scope.ParticipantInfo = {
				"PID": "",
				"Name": "",
				"Gender": "",
				"Age": "",
				"Color" : ""
			};
		}

		$scope.FetchParticipant = function (pid) {
			var oReturnData = {};

			angular.forEach($scope.Participants, function (data) {

				if (data.PID == pid) {
					$scope.ParticipantInfo = {
						"PID": data.PID,
						"Name": data.Name,
						"Gender": data.Gender,
						"Age": data.Age
					};

					oReturnData = data;
				}
			})

			return oReturnData;
		};

		$scope.FetchParticipantUsingFilterSvc = function (pid) {
			var oData = $filter('filter')($scope.Participants, {PID : pid});

			if (oData.length > 0) {
				$scope.ParticipantInfo = {
					"PID": oData[0].PID,
					"Name": oData[0].Name,
					"Gender": oData[0].Gender,
					"Age": oData[0].Age
				};

			}

			return oData;
		};

		$scope.IsParticipantExists = function (pid) {
			return $filter('filter')($scope.Participants, { PID: pid });
		};

		$scope.GetParticipantInfoWebAPI = function (pid) {
			return participantFactory.GetParticipantInfo(pid, function (data, status) {
				if (status == 200) {
					// Success
				}
				else
				{
					// Error Handling
				}
			});
		};
    }
})();
