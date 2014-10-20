// SET OF UTIL FUNCTION TO DOM MANIPULATION AND SIMPLE EVENT MANAGEMENT AND REQUEST HANDLING
// @author Marcin Strażyński (m.strazynski@gmail.com)

(function (root) {
	var prefix = '[Root] ',
		helpers = helpers || {},
		version = '0.0.3';

	root.sQuery = root.sQuery || {};
	
	// sQuery core functions
	sQuery.version = 'sQuery v.'.concat(version);

	console.log(prefix.concat('loaded! ', sQuery.version));

	// ELEMENTS
	sQuery.$ = function (selector, context) {
		var ctx = context || window.document;
		if (selector.charAt(0) === '#' &&
			selector.indexOf(' ') === -1 &&
			selector.indexOf('.') === -1) {
			return document.getElementById(selector.slice(1));
		} else {
			return ctx.querySelectorAll(selector);
		}
		// var found = document.querySelectorAll(selector);
		// return found.length === 1 ? found[0] : found;
	};

	if (root.$) {
		throw 'You have jQuery imported. Consider removing it';
	} else {
		$ = sQuery.$;
	}

	Element.prototype.addClass = function (clName) {
		this.classList.add(clName);
		return this;
	};

	Element.prototype.removeClass = function (clName) {
		this.classList.remove(clName);
		return this;
	};

	Element.prototype.toggleClass = function (clName) {
		if (this.hasClass(clName)) {
			this.removeClass(clName);
		} else {
			this.addClass(clName);
		}
		return this;
	}

	Element.prototype.hasClass = function (clName) {
		if (this.classList) {
		  return this.classList.contains(clName)
		} else {
		  return new RegExp('(^| )' + clName + '( |$)', 'gi').test(this.clName)	
		}
	};

	Element.prototype.after = function (htmlString) {
		helpers.injectHTML(this, htmlString, 'after');
		return this;
	};

	Element.prototype.before = function (htmlString) {
		helpers.injectHTML(this, htmlString, 'before');
		return this;
	};

	Element.prototype.append = function (el) {
		var e = sQuery.isDOMElement(el) ? el : helpers.createDOMElement(el);
		this.appendChild(e);
		return this;
	};

	Element.prototype.prepend = function (el) {
		var e = sQuery.isDOMElement(el) ? el : helpers.createDOMElement(el);
		this.insertBefore(e, this.firstChild);
		return this;
	};

	Element.prototype.getChildren = function () {
		return this.children;
	};

	Element.prototype.clone = function () {
		return this.cloneNode();
	};

	Element.prototype.containsSelector = function (selector) {
		return this.querySelector(selector) !== null;
	};

	Element.prototype.empty = function () {
		this.innerHTML = '';
		return this;
	};

	Element.prototype.isEmpty = function () {
		return this.innerHTML === '';
	};

	Element.prototype.find = function (selector) {
		return this.querySelectorAll(selector);
	};

	Element.prototype.css = function (ruleName, value) {
		return value === undefined || value === null ? getComputedStyle(this)[ruleName] : this.style[ruleName] = value;
	};

	Element.prototype.attr = function (attr, toChange) {
		return toChange === undefined || toChange === null ? this.getAttribute(attr) : this.setAttribute(attr, toChange.toString());
	};

	Element.prototype.html = function (value) {
		return value === undefined || value === null ? this.innerHTML : this.innerHTML = value;
	};

	Element.prototype.getOuterHTML = function () {
		return this.outerHTML;
	};

	Element.prototype.text = function (value) {
		return value === undefined || value === null ? this.textContext : this.textContext = value;
	};

	Element.prototype.is = function (arg) {
		return sQuery.isDOMElement(arg) ? this === arg : this.webkitMatchesSelector(arg);		
	};

	Element.prototype.nextElement = function () {
		return this.nextElementSibling;
	};

	Element.prototype.prev = function () {
		return this.prevElementSibling;
	};

	Element.prototype.parent = function () {
		return this.parentNode;
	};

	Element.prototype.offset = function () {
		var boundings = this.getBoundingClientRect();
		return {
			top: boundings.top,
			left: boundings.left,
			right: boundings.right,
			bottom: boundings.bottom			
		}
	};

	Element.prototype.remove = function () {
		return this.parentNode.removeChild(this);
	};

	Element.prototype.replaceWith = function (string) {
		return this.outerHTML = string;
	};

	Element.prototype.siblings = function () {
		var that = this, siblings = [];
		Array.prototype.filter.call(this.parentNode.children, function (child) {
			if (child !== that) {
				siblings.push(child);	
			}
		});	
		return siblings;
	};

	helpers.injectHTML = function (el, htmlString, position) {
		var pos = position === 'before' ? 'beforebegin' : 'afterend';
		el.insertAdjacentHTML(pos, htmlString);
	};

	helpers.createDOMElement = function (html) {
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = html;
		return tempDiv.firstChild;
	}
})(window);