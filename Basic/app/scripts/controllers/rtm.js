'use strict';
angular.module('basic')
    .controller('RtmCtrl', ['$rootScope', '$scope', '$filter', 'rtmReg', 'rtmRegTest', 'rtmAll', '$interval', 'cameras', 'GLOBAL',
        ($rootScope, $scope, $filter, rtmReg, rtmRegTest, rtmAll, $interval, cameras, GLOBAL) => {
            $scope.rtm = {};
            $scope.fromdb = [];
            $scope.cams = cameras;
            //console.log('GLOBAL', GLOBAL);
            // let handleSuccessTest = function(data) {
            //     console.log('TEST', data);
            // };
            let handleSuccess = data => {
                let fromdb = data.dbList;
                if (fromdb) {
                    $scope.rtmReg = fromdb;
                }
            };
            let handleSuccessrtmFace = data => {
                if (data.dbList) {
                    $scope.rtmAll = data.dbList;
                }
            };
            $interval(function() {
                rtmReg.get({}, function(res) {
                    handleSuccess(res);
                    //console.log('rtmReg res', res);
                });
                // rtmRegTest.get({}, function(res) {
                //     handleSuccessTest(res);
                // });
                rtmAll.get({}, function(res) {
                    handleSuccessrtmFace(res);
                    //console.log('rtmAll res', res);
                });
            }, GLOBAL.CONFIG.PERIOD);
            /*
             * (C) Copyright 2014 Kurento (http://kurento.org/)
             *
             * All rights reserved. This program and the accompanying materials
             * are made available under the terms of the GNU Lesser General Public License
             * (LGPL) version 2.1 which accompanies this distribution, and is available at
             * http://www.gnu.org/licenses/lgpl-2.1.html
             *
             * This library is distributed in the hope that it will be useful,
             * but WITHOUT ANY WARRANTY; without even the implied warranty of
             * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
             * Lesser General Public License for more details.
             *
             */
            function getopts(args, opts) {
                let result = opts.default || {};
                args.replace(
                    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                    function($0, $1, $2, $3) { result[$1] = $3; });

                return result;
            };
            let args = getopts(location.search, {
                default: {
                    ws_uri: 'ws://' + GLOBAL.CONFIG.kurentoIP + ':' + GLOBAL.CONFIG.kurentoPort + '/kurento',
                    ice_servers: undefined
                }
            });
            if (args.ice_servers) {
                console.log("Use ICE servers: " + args.ice_servers);
                kurentoUtils.WebRtcPeer.prototype.server.iceServers = JSON.parse(args.ice_servers);
            } else {
                console.log("Use freeice");
            }
            let videoOutput = document.getElementById('videoOutput');
            let address = document.getElementById('address');
            let pipeline;
            let webRtcPeer;
            //Run Stream By each click URL
            $scope.start_cam_webrtc = id => {
                console.log("click id=" + id);
                start_cam_webrtc(id);
            };

            function start_cam_webrtc(id) {
                console.log("click id=" + id);
                address = id; //document.getElementById('address');

                if (address) {
                    stop_webrtc();
                }
                start_webrtc(id);
            }

            function start_webrtc(id) {
                let videoOutput = document.getElementById('videoOutput');
                let address = id; //document.getElementById('address');
                console.log('Run address=' + address + ' start() = ' + args.ws_uri);
                if (!address) {
                    window.alert("You must set the video source URL first");
                    return;
                }
                //address.disabled = true;
                showSpinner(videoOutput);
                let iceServers = [{
                    "url": "turn:10.254.1.66:8888",
                    "username": "asl",
                    "credential": "asl123"
                }];
                let options = {
                    remoteVideo: videoOutput,
                    //onicecandidate: onIceCandidate,
                    configuration: {
                        iceServers: iceServers
                    }
                };
                let constraints = {
                    audio: true,
                    video: {
                        //  1:2 W:960 H:540
                        //  1:3 W:640 H:360
                        mandatory: {
                            //maxWidth : 640,   maxHeight: 360,  minWidth : 640,  minHeight: 360,
                            maxWidth: 960,
                            maxHeight: 540,
                            minWidth: 960,
                            minHeight: 540,
                        }
                    },
                };
                webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
                    function(error) {
                        if (error) {
                            return console.error(error);
                        }
                        webRtcPeer.generateOffer(onOffer);
                        webRtcPeer.peerConnection.addEventListener('iceconnectionstatechange', function(event) {
                            if (webRtcPeer && webRtcPeer.peerConnection) {
                                console.log("oniceconnectionstatechange -> " + webRtcPeer.peerConnection.iceConnectionState);
                                console.log('icegatheringstate -> ' + webRtcPeer.peerConnection.iceGatheringState);
                            }
                        });
                    }, constraints);
            }

            function onOffer(error, sdpOffer) {
                if (error) return onError(error);
                console.log('ws_uri = ' + args.ws_uri);
                kurentoClient(args.ws_uri, function(error, kurentoClient) {
                    if (error) return onError(error);
                    kurentoClient.create("MediaPipeline", function(error, p) {
                        if (error) return onError(error);
                        pipeline = p;
                        pipeline.create("PlayerEndpoint", { uri: address }, function(error, player) {
                            if (error) return onError(error);
                            pipeline.create("WebRtcEndpoint", function(error, webRtcEndpoint) {
                                if (error) return onError(error);
                                setIceCandidateCallbacks(webRtcEndpoint, webRtcPeer, onError);
                                webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer) {
                                    if (error) return onError(error);
                                    webRtcEndpoint.gatherCandidates(onError);
                                    webRtcPeer.processAnswer(sdpAnswer);
                                });
                                player.connect(webRtcEndpoint, function(error) {
                                    if (error) return onError(error);
                                    console.log("PlayerEndpoint-->WebRtcEndpoint connection established");
                                    player.play(function(error) {
                                        if (error) return onError(error);
                                        console.log("Player playing ...");
                                    });
                                });
                            });
                        });
                    });
                });
            }

            function stop_webrtc() {
                //address.disabled = false;
                if (webRtcPeer) {
                    webRtcPeer.dispose();
                    webRtcPeer = null;
                }
                if (pipeline) {
                    pipeline.release();
                    pipeline = null;
                }
                hideSpinner(videoOutput);
            }

            function setIceCandidateCallbacks(webRtcEndpoint, webRtcPeer, onError) {
                webRtcPeer.on('icecandidate', function(candidate) {
                    console.log("Local icecandidate " + JSON.stringify(candidate));
                    candidate = kurentoClient.register.complexTypes.IceCandidate(candidate);
                    webRtcEndpoint.addIceCandidate(candidate, onError);
                });
                webRtcEndpoint.on('OnIceCandidate', function(event) {
                    let candidate = event.candidate;
                    console.log("Remote icecandidate " + JSON.stringify(candidate));
                    webRtcPeer.addIceCandidate(candidate, onError);
                });
            }

            function onError(error) {
                if (error) {
                    console.error(error);
                    stop();
                }
            }

            function showSpinner() {
                for (var i = 0; i < arguments.length; i++) {
                    arguments[i].poster = 'img/transparent-1px.png';
                    arguments[i].style.background = "center transparent url('img/spinner.gif') no-repeat";
                }
            }

            function hideSpinner() {
                for (var i = 0; i < arguments.length; i++) {
                    arguments[i].src = '';
                    arguments[i].poster = 'img/webrtc.png';
                    arguments[i].style.background = '';
                }
            }
            $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox();
            });
        }
    ]);