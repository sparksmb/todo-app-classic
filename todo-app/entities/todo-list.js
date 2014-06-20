/*jslint nomen: true */
/*global app, _ */
app.entity.todoList = {
	create: function (todoListItems) {
		'use strict';
		var todoList,
			util = _,
			todoListItem = app.entity.todoListItem;
		
		function createTodoListItem(item) {
			todoList.add(todoListItem.create(item));
		}
		
		function init() {
			var items = todoListItems || [];
			util.forEach(items, createTodoListItem);
			return todoList;
		}
		
		function getIsCompletedPredicate(isCompleted) {
			return function (item) {
				return item.isCompleted === isCompleted;
			};
		}
		
		function filterActive() {
            return todoList.findAll(getIsCompletedPredicate(false));
		}
		
		function filterCompleted() {
			return todoList.findAll(getIsCompletedPredicate(true));
		}
		
		todoList = Object.create(app.entity.list.create());
		
		todoList.ACTIVE = 1;
		todoList.ALL = 2;
		todoList.COMPLETED = 3;
		
		todoList.filter = function (itemStatus) {
			if (itemStatus === todoList.ACTIVE) {
				return filterActive();
			} else if (itemStatus === todoList.COMPLETED) {
				return filterCompleted();
			} else {
				return todoList.toArray();
			}
		};
		
		todoList.markCompleted = function (index) {
			todoList.items[index].markCompleted();
		};
		
		todoList.markUncompleted = function (index) {
			todoList.items[index].markUncompleted();
		};
		
		return init();
	}
};