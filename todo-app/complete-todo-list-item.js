/*global app */
app.usecase.completeTodoListItem = {
	create: function (todoList) {
		'use strict';
		var completeTodoListItem;
		
		completeTodoListItem = {
			execute: function (id, isChecked) {
				if (isChecked) {
					todoList.markCompleted(id);
				} else {
					todoList.markUncompleted(id);
				}
			}
		};
		
		return completeTodoListItem;
	}
};
