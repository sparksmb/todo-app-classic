/*global app */
app.entity.todoListItem = {
	create: function (data) {
		'use strict';
		var todoListItem;
		
		todoListItem = {
			id: null,
			text: data.text || '',
			isCompleted: data.isCompleted || false,
			markCompleted: function () {
				todoListItem.isCompleted = true;
			},
			markUncompleted: function () {
				todoListItem.isCompleted = false;
			}
		};
		
		return todoListItem;
	}
};