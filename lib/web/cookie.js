/*global app, $ */
app.entity.cookie = {
	create: function (settings) {
		var setOptions = settings || {
				expires: 1,
				path: '/'
			},
			deleteOptions = {};
			deleteOptions.path = setOptions.path || '/';
			
		return {
			getCookie: function (name) {
				return $.cookie(name);
			},
			setCookie: function (name, value) {
				$.cookie(name, value, setOptions);
			},
			deleteCookie: function (name) {
				$.removeCookie(name, deleteOptions);
			}
		};
	}
};