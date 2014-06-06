/*jslint nomen: true */
/*global app, _ */
app.entity.todoList = {
	create: function (todoListItems) {
		'use strict';
		var todoList,
			todoListItemArray = [],
			util = _,
			todoListItem = app.entity.todoListItem;
		
		function createTodoListItem(item) {
			todoListItemArray.push(todoListItem.create(item));
		}
		
		function init() {
			var items = todoListItems || [];
			util.forEach(items, createTodoListItem);
			return todoList;
		}
		
		todoList = {
			toArray: function () {
				return todoListItemArray;
			},
			add: function (item) {
				todoListItemArray.push(item);
			}
		};
		
		return init();
	}
};