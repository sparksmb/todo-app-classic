/*global app */
app.usecase.addTodoListItem = {
	create: function (todoList) {
		'use strict';
		var addTodoListItem;
		
		addTodoListItem = {
			execute: function (todoListItem) {
				todoList.add(todoListItem);
			}
		};
		
		return addTodoListItem;
	}
};