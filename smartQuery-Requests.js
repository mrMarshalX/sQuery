(function (root) {
	var prefix = '[Requests] ',
		methods = ['GET', 'POST', 'DELETE', 'PUT'];;

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

		if (!options) {
			throw 'Options object needs to be defined';
		}

		if (!options.method) {
			throw 'Specify method: GET, POST, PUT, DELETE';
		}

		if (methods.indexOf(options.methods.toUpperCase()) < 0) {
			throw 'Wrong CRUD method. Allowed methods are: GET, POST, PUT, DELETE';
		}

		if (!options.url) {
			throw 'Specify URL';
		}

		if (!options.success || !options.error) {
			throw 'Specify callbacks function for success and error';
		}

		if (options.method === 'POST' || options.methods === 'PUT') {
			if (!options.data) {
				throw 'Data for transfer needs to be specified';
			}
		}

		request.open(options.method, options.url, true);
		request.onload = options.success || null;
		request.onerror = options.error || null;
		request.send(options.data || null);
	};
})(window);