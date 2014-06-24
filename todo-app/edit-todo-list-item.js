/*global app */
app.usecase.editTodoListItem = {
	create: function (todoList) {
		'use strict';
		var editTodoListItem;
		
		editTodoListItem = {
			execute: function (oldText, newText) {
				var item = todoList.find(function (item) {
					return item.text === oldText;
				});
				item.text = newText;
			}
		};
		
		return editTodoListItem;
	}
};
