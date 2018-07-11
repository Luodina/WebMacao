'use strict';
angular.module('basic')
    .controller('HistoryCtrl', ['$rootScope', '$scope', 'DBhistory', 'usSpinnerService', 'cameras', 'moment', '$stateParams', 'GLOBAL', '$http',
        ($rootScope, $scope, DBhistory, usSpinnerService, cameras, moment, $stateParams, GLOBAL, $http) => {
            //console.log('params:', $stateParams.user);
            $scope.history = [];
            $scope.inclUnregistr = true;
            $scope.filters = {};
            $scope.searchFilter = {};
            $scope.curPage = 1;
            $scope.style = "col-lg-12 col-md-12 col-sm-12";

            $scope.search = curPage => {
                $scope.curPage = curPage;
                DBhistory.get({ searchData: $scope.filters, page: $scope.curPage }, function(res) {
                    $scope.history = [];
                    handleSuccessDBhistory(res);
                });
            };
            $scope.search($scope.curPage);
            if ($stateParams.user) {
                $scope.filters._id = $stateParams.user;
                $scope.filters.inclUnregistr = false;
                $http.get('/api/db/people/' + $scope.filters._id).then(data => {
                    //console.log('data', data);
                    if (data && data.data.status === "success") {
                        $scope.selectedPerson = data.data.msg[0];
                        $scope.style = "col-lg-9 col-md-9 col-sm-9";
                        //$scope.pages = data.data.pages;
                    }
                });
            }
            if (cameras) {
                $scope.cameras = cameras;
                $scope.selected = 'ALL';
            };
            // dynamic filtering
            $scope.filterDocuments = document => {
                let locationFilter = true;
                let nameFilter = true;
                let inclUnregFlag = true;
                let camFilter = true;
                let timeFilter = true;
                // console.log('$scope.period.start', moment($scope.period.start).format());
                // console.log('$scope.period.finish', moment($scope.period.finish).format());
                // console.log('document.rec_time', moment(document.rec_time).format());
                // console.log('====000000', moment($scope.period.start).isBefore(moment(document.rec_time)))
                // console.log('====111111', moment(document.rec_time).isBefore(moment($scope.period.finish)))
                if (!(moment($scope.period.start).isBefore(moment(document.rec_time)) &&
                        moment(document.rec_time).isBefore(moment($scope.period.finish)))) {
                    timeFilter = false;
                }
                if ($scope.searchFilter) {
                    if (document.camera && document.camera[0] && $scope.searchFilter.location) {
                        if (document.camera[0].location.toLowerCase().indexOf($scope.searchFilter.location.toLowerCase()) === -1) {
                            locationFilter = false;
                        }
                    }
                    if (document.camera && document.camera[0] && $scope.selected !== 'ALL') {
                        if (document.camera[0].name.toLowerCase().indexOf($scope.selected.toLowerCase()) === -1) {
                            camFilter = false;
                        }
                    }
                    if (document.person && document.person[0] && $scope.searchFilter.name) {
                        if (document.person[0].personname.toLowerCase().indexOf($scope.searchFilter.name.toLowerCase()) === -1) {
                            nameFilter = false;
                        }
                    }
                }
                if (!$scope.inclUnregistr) {
                    if (document.person && document.person[0]) {
                        inclUnregFlag = true
                    } else { inclUnregFlag = false; }
                }
                if (locationFilter && nameFilter && inclUnregFlag && camFilter && timeFilter) { return document }
            };
            $scope.applyFilter = () => {
                if ($scope.selected !== 'ALL') { $scope.filters.camera = $scope.selected; }
                if ($scope.searchFilter.name !== null &&
                    $scope.searchFilter.name !== undefined &&
                    $scope.searchFilter.name.length !== 0
                ) { $scope.filters.name = $scope.searchFilter.name; }
                if ($scope.searchFilter.location !== null &&
                    $scope.searchFilter.location !== undefined &&
                    $scope.searchFilter.location.length !== 0
                ) { $scope.filters.location = $scope.searchFilter.location; }
                $scope.filters.inclUnregistr = $scope.inclUnregistr;
                $scope.filters.time = {
                    start: moment($scope.period.start).format(),
                    finish: moment($scope.period.finish).format()
                };
                DBhistory.get({ searchData: $scope.filters }, function(res) {
                    handleSuccessDBhistory(res);
                });
            };
            $scope.reset = () => {
                $scope.selected = 'ALL';
                $scope.searchFilter.name = undefined;
                $scope.searchFilter.location = undefined;
                $scope.inclUnregistr = true;
                DBhistory.get({}, function(res) {
                    handleSuccessDBhistory(res);
                });
            };
            $scope.period = {
                start: moment.utc(),
                finish: moment().format()
            };
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };
            $scope.setSelected = name => {
                $scope.selected = name;
            };
            //console.log('$scope.filters :', $scope.filters)

            // All.get({}, function(res) {
            //     //console.log('res from rtmFace', res);
            //     handleSuccessrtmFace(res);
            // });
            // let handleSuccessrtmFace = function(data) {
            //     if (data.dbList) {
            //         console.log('res from all', data);
            //         $scope.rtmAll = data.dbList;
            //     }
            // };
            let handleSuccessDBhistory = function(data) {
                if (data.dbList) {
                    //console.log('res from history', data);
                    $scope.history = data.dbList;
                    $scope.pages = data.pages;
                }
            };
        }
    ]);