/**
 * Created by NATALI on 05.10.2016.
 * 
 */
'use strict';
angular.module('MyService', ['rzModule','angularFileUpload','e2e-mocks'])
    .controller('MainController', ['$scope', '$http','FileUploader',  function ($scope, $http, FileUploader ) {

    $scope.activeadd = false;
    $scope.activeinfo = false;
    $scope.slider = {
        minValue: 0,
        maxValue: 800,
        options: {
            floor: 0,
            ceil: 1000,
            translate: function(value) {
                return '$' + value;
            }
        }
    };
    $(document).ready(function() {

        $http.get('http://localhost:8080/data')
            .success(function(result) {
                $scope.savedData = result;
                console.log('data loaded', result);
            })
            .error(function(result) {
                console.log('eror loading data', result);
            });
    });


       $scope.uploader = new FileUploader({
            url: '/scripts/obr.php'
        });

        // FILTERS
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });


        // CALLBACKS

        $scope.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        $scope.uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            
        };
        $scope.uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        $scope.uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        $scope.uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        $scope.uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', $scope.uploader);

    $scope.info = function(item) {
        var index = $scope.savedData.indexOf(item);
        $scope.savedData.map(function(el) {el.active = false});
        $scope.activeInfo = $scope.savedData[index];
        $scope.savedData[index].active = !!($scope.activeInfo);
        if (typeof($scope.activeInfo.images) === 'string') {
            $scope.activeInfo.images = Array.of($scope.activeInfo.images);
        }
        $scope.activeadd = false;
        $scope.activeinfo = true;
        
    };
    $scope.add = function() {
        $scope.savedData.map(function(el) {el.active = false});
        $scope.activeadd = true;
        $scope.activeinfo = false;
        
    };
    $scope.save = function (record) {
         if ($scope.uploader.queue.length) {
            for (var i = 0; i < $scope.uploader.queue.length; i++) {
                var path = 'images/' + $scope.uploader.queue[i].file.name;
                $scope.record.images.push(path);
            }
        } else {
            $scope.record.images = null;
        }
        console.log($scope.record.images);


        $http.post('http://localhost:8080/data', record)
            .success(function(result) {
                console.log('succsfull added');
                $scope.savedData.push(result);
                $scope.record = null;

            })
            .error(function(result) {
                console.log('eror saving data',data);
            });
        if (uploader.getNotUploadedItems().length) uploader.uploadAll();
    };

        $scope.myFilter = function(item) {
            return item.price >= +$scope.slider.minValue && item.price <= +$scope.slider.maxValue;

        };
    }]);

