/*global app */
app.usecase.saveTodoList = {
	create: function (storage, todoList) {
		'use strict';
		var saveTodoList;
		
		saveTodoList = {
			execute: function () {
				return storage.update(
					JSON.stringify(todoList.toArray())
				);
			}
		};
		
		return saveTodoList;
	}
};