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
			var i,
				completed = 0,
				items = todoListItems || [],
				item,
				len = items.length;
			
			for (i = 0; i < len; i += 1) {
				item = todoListItem.create(items[i]);
				item.id = i;
				if (item.isCompleted) {
					completed += 1;
				}
				todoList.add(item);
			}
			
			todoList.itemsLeft = len - completed;
			
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
		todoList.itemsLeft = null;
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
			todoList.itemsLeft -= 1;
		};
		
		todoList.markUncompleted = function (index) {
			todoList.items[index].markUncompleted();
			todoList.itemsLeft += 1;
		};
		
		todoList.add = function (item) {
			var index = Object.getPrototypeOf(todoList).add(item);
			todoList.items[index].id = index;
			todoList.itemsLeft += 1;
		};
		
		return init();
	}
};