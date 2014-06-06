/*global app */
app.interFace.iViewData = function (iViewData) {
	if (iViewData) {
		if (typeof iViewData !== 'object') { 
			throw 'View data is not valid, expected an object!'; 
		}
		
		if ( !(iViewData.container_id) && typeof iViewData.container_id !== 'string') {
			throw 'View data property container_id not implemented!'; 
		}

		if (iViewData.template && typeof iViewData.template === 'object') {
			if ( !(iViewData.template.url || iViewData.template.html) ) {
				throw 'View data property template is missing url or html property!';
			}
			
			if (iViewData.template.url) {
				if (typeof iViewData.template.url !== 'string') {
					throw 'View data template url property is not of type string!';
				}
			}
			
			if (iViewData.template.html) {
				if (typeof iViewData.template.html !== 'string')  {
					throw 'View data template html property is not of type string!';
				}
			}
			
		} else {
			throw 'View data property template not implemented!';
		}
		
		if (!(iViewData.data) && typeof iViewData.data !== 'object') {
			throw 'View data property data not implemented!'; 
		}
	} else {
		throw 'View data is missing.';
	}
	
	return iViewData;
};
