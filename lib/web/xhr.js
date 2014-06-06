/*global app, $ */
app.entity.xhr = {
	create: function (url) {
		var xmlHttp,
			xhr;
			
		function get(url, data, success) {
			var responseData,
				settings = {
					url: url,
					type: 'GET',
					error: function () {
						responseData = null;
					}
				};
			
			if (data) settings.data = data;
			if (success) {
				settings.success = success;
				settings.async = true;
			} else {
				settings.success = function (data) {
					responseData = data;
				};
				settings.async = false;
			}
			
			$.ajax(settings);
			
			return responseData;
		}
		
		function post(settings) {
			var responseData,
                postSettings = {
                    async: settings.async || false,
                    url: settings.url,
                    data: settings.data,
                    type: 'POST',
                    success: function (data) {
                        if (settings.done) {
                            responseData = settings.done(data);
                        } else {
                            responseData = data;
                        }
                    },
                    error: function () {
                        if (settings.fail) {
                            responseData = settings.fail();
                        } else {
                            responseData = null;
                        }
                    }
                };

            $.ajax(postSettings);
			return responseData;
		}
			
		xhr = {
			name: "xhr.js",
			version: "0.1.0",
			url: url || null,
			ajax: function (settings) {
				return post(settings);
			},
			get: function (url, data, success) {
				return get(url, data, success);
			}
		};
		
		return xhr;
	}
};