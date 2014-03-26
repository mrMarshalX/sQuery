(function (root) {
	var prefix = '[Requests] ';
	console.log(prefix.concat('loaded!'));
	root.sQuery = root.sQuery || {};
	// root.api = 'http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true';

	//REQUESTS
	sQuery.getJSON = function(url, options) {
		var request = new XMLHttpRequest();
		var options = options || {};
		var data;
		request.onload = options.success || function (e) {
			if (this.readyState === 4) {
				if (this.status >= 200 && this.status < 400) {
					data = JSON.parse(this.response);
				} else {
					console.error(this.statusText);
				}
			}
		};
		request.onerror = options.error || function (e) {
			console.error('GetJSON() error', e);
		}

		request.open('GET', url, options.sync || false);
		request.send(null);
		return data;
	};

	sQuery.ajax = function (options) {
		var request = new XMLHttpRequest();
		request.open(options.method, options.url, true);
		request.onload = options.success || null;
		request.onerror = options.error || null;
		request.send(options.data || null);
	};
})(window);