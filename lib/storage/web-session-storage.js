/*global app, window */
app.entity.webSessionStorage = {
	create: function (storage, sessionStorage) {
        'use strict';
		var webSessionStorage = Object.create(storage),
            operationDictionary = {};
			
        function getOperationKey(operation) {
            return JSON.stringify(operation);
        }
        
		function insertOperation(operation, result) {
            sessionStorage.setItem(getOperationKey(operation), result);
		}
		
        function init(thisStorage) {
            if (!sessionStorage) {
                throw 'ERROR: sessionStorage feature not available!';
            }
            return thisStorage;
        }
        
        webSessionStorage.create = function (operation) {
            Object.getPrototypeOf(webSessionStorage).create(operation);
            //insertOperation(operation, result);
        };
        
        webSessionStorage.read = function (operation) {
            var result = sessionStorage.getItem(getOperationKey(operation));
            if (result) {
                return result;
            } else {
                return Object.getPrototypeOf(webSessionStorage).read(operation);
            }
        };
        
        webSessionStorage.update = function (operation) {
            Object.getPrototypeOf(webSessionStorage).update(operation);
        };
        
        webSessionStorage.destory = function (operation) {
            Object.getPrototypeOf(webSessionStorage).update(operation);
        };
		
		return init(webSessionStorage);
	}
};