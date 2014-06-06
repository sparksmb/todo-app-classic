/*global app, window, unescape*/
app.entity.queryString = {
	create: function () {
		return {
			getQueryString: function (queryStringParameter) {
				var key = queryStringParameter, 
					regex, 
					qs, 
					returnValue = null;
					
				key = key.replace(/[\[]/,"\\\\[").replace(/[\]]/,"\\\\]");
				regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
				qs = regex.exec(window.location.href);
				
				if(qs !== null) {
					returnValue = decodeURIComponent(qs[1]);
				}
				
				return returnValue;
			}
		};
	}
};