(function () {
	var prefix = '[Effects] ';
	console.log(prefix.concat('loaded!'));
	// EFFECTS
	/**
		Hides DOM element
	*/
	Element.prototype.hide = function () {
		this.style.display = 'none';
		return this;
	};

	/**
		Shows DOM element
	*/
	Element.prototype.show = function () {
		this.style.display = '';
		return this;
	};

	Element.prototype.fadeOut = function (delay) {
		var opacity = this.style.opacity || getComputedStyle(this)['opacity'],
			that = this,
			timer = setInterval(function () {
				if (opacity <= 0.1) {
					clearInterval(timer);
					that.style.display = 'none';
				}
				that.style.opacity = opacity;
				that.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
				opacity = parseFloat(opacity) - 0.1;
			}, (delay || 50));
	}

	Element.prototype.fadeIn = function (delay) {
		var opacity = this.style.opacity || getComputedStyle(this)['opacity'],
			that = this,
			timer = setInterval(function () {
				if (opacity >= 1) {
					clearInterval(timer);
				}
				if (that.style.display === 'none') {
					that.style.display = 'block';
				}				
				that.style.opacity = opacity;
				that.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
				opacity = parseFloat(opacity) + 0.1;
			}, (delay || 50));	
	}
})();