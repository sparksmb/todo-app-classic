/*jslint nomen: true */
/*global app, _ */
app.entity.list = {
	create: function (itemsArray) {
		'use strict';
		var list,
			util = _,
			listArray = [];
		
		function init() {
			var items = itemsArray || [];
			util.forEach(items, list.add);
			return list;
		}
		
		list = {
			items: listArray,
			toArray: function () {
				return listArray;
			},
			add: function (item) {
				listArray.push(item);
				return listArray.length - 1; //current index of item
			},
			find: function (predicate) {
				return util.find(listArray, predicate);
			},
			findAll: function (predicate) {
				return util.filter(listArray, predicate);
			}
		};
		
		return init();
	}
};