'use strict';
angular.module('basic')
    .controller('AnalyticsCtrl', ['$scope',
        ($scope) => {
            $scope.msg = 'hey hey';
            $scope.labels1 = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
            $scope.data1 = [300, 500, 100, 40, 120];
            $scope.labels2 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data2 = [300, 500, 100];
            $scope.labels3 = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
            $scope.data3 = [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ];
            $scope.labels4 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series4 = ['Series A', 'Series B'];
            $scope.data4 = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $scope.colors5 = ['#45b7cd', '#ff6384', '#ff8e72'];

            $scope.labels5 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.data5 = [
                [65, -59, 80, 81, -56, 55, -40],
                [28, 48, -40, 19, 86, 27, 90]
            ];
            $scope.datasetOverride5 = [{
                    label: "Bar chart",
                    borderWidth: 1,
                    type: 'bar'
                },
                {
                    label: "Line chart",
                    borderWidth: 3,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    type: 'line'
                }
            ];
            $scope.labels6 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data6 = [300, 500, 100];
        }
    ]);