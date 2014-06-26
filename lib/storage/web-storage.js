/*global app */
app.entity.webStorage = {
	create: function () {
		'use strict';
		var webStorage;
		
		function init() {
			if (typeof (Storage) !== "undefined") {
				return webStorage;
			} else {
				throw 'Sorry! No Web Storage support..';
			}
		}
		
		function throwInvalidStorageOperation() {
			throw 'Storage operation is not valid';
		}
		
		function isValidOperation(op) {
			if (!op.operationName) {
				return false;
			}
			return true;
		}
		
		function validateAndExecuteOperation(op, storageCommand) {
			if (isValidOperation(op)) {
				return storageCommand(op);
			} else {
				throwInvalidStorageOperation();
			}
		}
		
		function writeData(key, data) {
			var serializedData;
			if (typeof data !== 'string') {
				serializedData = JSON.stringify(data);
			} else {
				serializedData = data;
			}
			localStorage.setItem(key, serializedData);
		}
		
		//Web Storage supports CRUD operations
		webStorage = {
			create: function (op, data) {
				return validateAndExecuteOperation(op, function (op) {
					writeData(op.operationName, op.data);
				});
			},
			read: function (op) {
				return validateAndExecuteOperation(op, function (op) {
					return localStorage.getItem(op.operationName);
				});
			},
			update: function (op) {
				return validateAndExecuteOperation(op, function (op) {
					writeData(op.operationName, op.data);
				});
			},
			destroy: function (op) {
				return validateAndExecuteOperation(op, function (op) {
					localStorage.removeItem(op.operationName);
				});
			},
			createOperation: function (op) {
				if (isValidOperation(op)) {
					return op;
				}
				throwInvalidStorageOperation();
			}
		};
		
		return init();
	}
};