/*global app */
app.lib.list = {
	createList: function (itemArray) {
		var list;
		itemArray = itemArray || [];
			
		function propertySort(property) {
			return itemArray.sort(function (a, b) {
				return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			});
		}
		
		list = {
			item: function (index) {
				return itemArray[index];
			},
			first: function () {
				return itemArray[0];
			},
			last: function () {
				return itemArray[itemArray.length - 1];
			},
			add: function (item) {
				itemArray.push(item);
			},
			removeAt: function (index) {
				itemArray.splice(index,1);
			},
			toArray: function () {
				return itemArray;
			},
			toString: function () {
				return JSON.stringify(itemArray);
			},
			find: function (key, value) {
				var i, len = itemArray.length;
				for (i = 0; i < len; i += 1) {
					if (itemArray[i][key]) {
						if (itemArray[i][key] === value) {
							return itemArray[i];
						}
					}
				}
			},	
			insert: function (index, item) {
				itemArray.splice(index, 0, item);
			},
			remove: function (item) {
				var i, len = itemArray.length;
				for (i = 0; i < len; i += 1) {
					if (itemArray[i] === item) {
						 itemArray.splice(i,1);
					}
				}
			},
			sort: function () {
				return itemArray.sort();
			},
			sortByDelegate: function (delegate) {
				return itemArray.sort(delegate);
			},
			sortByKey: function (key) {
				return propertySort(key);
			}
		};
		
		Object.defineProperty( list, "count", {
			get: function () { return itemArray.length; },
			enumerable: true,
			configurable: false
		});
		
		return list;
	}
};
