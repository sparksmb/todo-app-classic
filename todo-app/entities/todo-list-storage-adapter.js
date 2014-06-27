/*global app */
app.entity.todoListStorageAdapter = {
	create: function (webStorageCreator) {
		'use strict';
		var todoListStorageAdapter = Object.create(webStorageCreator.create());
		
		todoListStorageAdapter.create = function (op) {
			op.operationName = 'todoList';
			return Object.getPrototypeOf(todoListStorageAdapter).create(op);
		};
		
		todoListStorageAdapter.read = function (op) {
			op.operationName = 'todoList';
			return Object.getPrototypeOf(todoListStorageAdapter).read(op);
		};
		
		todoListStorageAdapter.update = function (op) {
			op.operationName = 'todoList';
			return Object.getPrototypeOf(todoListStorageAdapter).update(op);
		};
		
		todoListStorageAdapter.destroy = function (op) {
			op.operationName = 'todoList';
			return Object.getPrototypeOf(todoListStorageAdapter).destory(op);
		};
		
		return todoListStorageAdapter;
	}
};
