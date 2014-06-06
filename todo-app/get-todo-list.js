/*global app */
app.usecase.getTodoList = {
	create: function (storage, todoList) {
		'use strict';
		var getTodoList;
		
		function getData() {
			return JSON.parse(storage.read({
				operationName: 'FetchTodoList'
			}));
		}
			
		getTodoList = {
			execute: function () {
				return todoList.create(getData());
			}
		};
		
		return getTodoList;
	}
};