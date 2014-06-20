/*global app */
app.usecase.completeTodoListItem = {
	create: function (todoList) {
		'use strict';
		var completeTodoListItem;
		
		completeTodoListItem = {
			execute: function (index, isChecked) {
				if (isChecked) {
					todoList.markCompleted(index);
				} else {
					todoList.markUncompleted(index);
				}
			}
		};
		
		return completeTodoListItem;
	}
};
