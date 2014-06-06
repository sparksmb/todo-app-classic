/*global app */
app.entity.webStorage = {
	create: function () {
		'use strict';
		var webStorage;
		
		webStorage = {
			create: function () {
				
			},
			read: function () {
				return '[{"text":"Eggs","isCompleted":true},{"text":"Milk","isCompleted":false},{"text":"Apples","isCompleted":true},{"text":"","isCompleted":false}]';
			},
			update: function () {
				
			},
			destroy: function () {
				
			},
			createOperation: function (op) {
				return op;
			}
		};
		
		return webStorage;
	}
};