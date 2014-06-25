/*global app */
app.usecase.filterTodoList = {
	create: function (todoList) {
		'use strict';
		var filterTodoList;
		
		filterTodoList = {
			execute: function (filterStatus) {
				return todoList.filter(filterStatus);
			}
		};
		
		return filterTodoList;
	}
};
