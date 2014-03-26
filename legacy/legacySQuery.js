		// SET OF UTIL FUNCTION TO DOM MANIPULATION AND SIMPLE EVENT MANAGEMENT AND REQUEST HANDLING
// @author Marcin Strażyński (m.strazynski@gmail.com)

(function (root) {
	root.api = 'http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true';
	root.sQuery = root.sQuery || {};
	root.utils = root.utils || {};
	var helpers = helpers || {};
	var version = '0.0.1';
	
	// sQuery core functions
	sQuery.version = 'sQuery v.'.concat(version);


	// REQUESTS
	// TODO: REIMPLEMENT
//	sQuery.getJSON = function(url, successCallback) {
//		var request = new XMLHttpRequest();
//		var id;
//		var response;
//		request.open('GET', url, true);
//
//		request.onload = successCallback || function (e) {
//			console.log(e);
//			id = helpers.createId('getJSON', this.response);
//			response = this.response;
//
//			if (id && response) {
//				return {
//					name: id, data: response
//				};
//			} else {
//				throw new Error('getJSON failed');
//			}
//		};
//
//		request.send();
//	};

	// TODO: REIMPLEMENT
//	sQuery.ajax = function (method, url, data) {
//		var request = new XMLHttpRequest();
//
//	};

	// TODO: REIMPLEMENT
//	sQuery.abortAll = function () {
//		sQuery.each(helpers.requests, function (item, index) {
//				console.log(index, item);
//				item.abort();
//		});
//	};

	// EFFECTS
	sQuery.hide = function (el) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		element.style.display = 'none';
		return element;
	};

	sQuery.show = function (el) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		element.style.display = '';
		return element;
	};

	// ELEMENTS
	sQuery.$ = function (selector) {
		return document.querySelector(selector);
	};

	sQuery.addClass = function (el, clName) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		element.classList.add(clName);
		return element;
	};

	sQuery.removeClass = function (el, clName) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		element.classList.remove(clName);
		return element;
	};

	sQuery.toggleClass = function (el, clName) {

	}

	sQuery.hasClass = function (el, clName) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		return element.classList.contains(clName);
	};

	sQuery.after = function (el, htmlString) {
		helpers.injectHTML(el, htmlString, 'after');
		return element;
	};

	sQuery.before = function (el, htmlString) {
		helpers.injectHTML(el, htmlString, 'before');
		return element;
	};

	sQuery.append = function (parent, el) {
		var e = this.isDOMElement(el) ? el : this.$(el);
		var p = this.isDOMElement(parent) ? parent : this.$(parent);
		p.appendChild(e);
		return p;
	};

	sQuery.children = function (el) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		return element.children;
	};

	sQuery.clone = function (el) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		return element.cloneNode();
	};

	sQuery.contains = function (parent, el) {
		var e = this.isDOMElement(el) ? el : this.$(el);
		var p = this.isDOMElement(parent) ? parent : this.$(parent);
		p.contains(e);
		return p;
	};

	sQuery.containsSelector = function (el, selector) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		return element.querySelector(selector) !== null;
	};

	sQuery.isDOMElement = function (el) {
		return el.nodeName ? true : false;
	};

	// MISC
	sQuery.each = function (arr, callback) {
		if (!callback) {
			throw new Error('Callback is not defined');
		}
		if (Array.prototype.forEach) {
			if (arr.constructor === Array) {
				arr.forEach(callback);
			} else {
				throw new Error('Passed argument is not an array');
			}
		} else {
			throw new Error('Native implementation is not supported');
		}
	};

	sQuery.now = function () {
		return Date.now();
	};

	// utility function that helps manage sQuery data
	utils.elements = [];
	utils.printIds = function () {
		return this.elements;
	};

	// private helpers for sQuery use only
	helpers.requests = [];

	helpers.counter = helpers.counter || 0;
	helpers.createId = function (prefix, data) {
		var id = prefix ? prefix.concat(++this.counter) : 'el'.concat(++this.counter);
		utils.elements.push({created: Date.now(), id: id, data: data}); 
		return id;
	};

	helpers.injectHTML = function (el, htmlString, position) {
		var element = this.isDOMElement(el) ? el : this.$(el);
		var pos = position === 'before' ? 'beforebegin' : 'afterend';
		element.insertAdjacentHTML(pos, htmlString);
	};
})(window);