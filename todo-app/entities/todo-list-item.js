/*global app */
app.entity.todoListItem = {
	create: function (data) {
		'use strict';
		var todoListItem;
		
		todoListItem = {
			text: data.text || '',
			isCompleted: data.isCompleted || false
		};
		
		return todoListItem;
	}
};