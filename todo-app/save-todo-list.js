/*global app */
app.usecase.saveTodoList = {
	create: function (storage) {
		'use strict';
		var saveTodoList;
		
		saveTodoList = {
			execute: function (todoList) {
				return storage.update({
					operationName: 'FetchTodoList',
					data: JSON.stringify(todoList.toArray())
				});
			}
		};
		
		return saveTodoList;
	}
};