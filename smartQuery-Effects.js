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
		return this;
	};

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
		return this;
	};

	Element.prototype.move = function (direction, by, refreshRate) {
		var directions = ['left', 'right', 'top', 'bottom'],
			that = this,
			to,
			position = this.getBoundingClientRect(),
			currentPosition,
			dir = direction.toLowerCase(),
			interval;

		if (directions.indexOf(dir) === -1) {
			throw 'Wrong direction parameter. There are left, right, top and bottom properties';
		}

		if (this.style.position !== 'absolute') {
			this.style.position = 'absolute';
			this.style.left = position.left + 'px';
			this.style.top = position.top + 'px';
		}

		if (dir === directions[0] || dir === directions[1]) {
			currentPosition = position[directions[0]];
		} else {
			currentPosition = position[directions[2]];
		}

		if (refreshRate < 0) {
			throw 'Refresh rate could not be less than 0';
		}

		if (dir === directions[0]) {
			to = position.left - by;
		} else if (dir === directions[1]) {
			to = position.left + by;
		} else if (dir === directions[2]) {
			to = position.top - by;
		} else {
			to = position.top + by;
		}

		interval = setInterval(function () {
			var d;

			if (dir === directions[0] || dir === directions[2]) {
				currentPosition--;
			} else {
				currentPosition++;
			}

			if (dir === directions[0] || dir === directions[1]) {
				d = directions[0];
			} else {
				d = directions[2];
			}

			that.style[d] = currentPosition + 'px';

			if (currentPosition === to) {
				clearInterval(interval);
			}
		}, (refreshRate || 10));

		return this;
	};

	Element.prototype.moveLeft = function (by, refreshRate) {
		this.move('left', by, refreshRate);
	};

	Element.prototype.moveRight = function (by, refreshRate) {
		this.move('right', by, refreshRate);
	};

	Element.prototype.moveUp = function (by, refreshRate) {
		this.move('top', by, refreshRate);
	};

	Element.prototype.moveDown = function (by, refreshRate) {
		this.move('bottom', by, refreshRate);
	};
})();