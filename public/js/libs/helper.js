Element.prototype.hasClass = function(cls) {
	return this.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

Element.prototype.addClass = function(cls) {
	var _this = this;

	if(!_this.hasClass(cls)) {
		_this.className += " " + cls;
	}
};

Element.prototype.removeClass = function(cls) {
	var _this = this;

	if(_this.hasClass) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        _this.className = _this.className.replace(reg, ' ');
	}
};

Element.prototype.replaceClass = function(oldCls, newCls) {
	var _this = this;

	if(_this.hasClass(oldCls)){
        _this.removeClass(oldCls);
        _this.addClass(newCls);
    }   
    return;
};

Element.prototype.toggleClass = function(cls) {
	var _this = this;

	if(_this.hasClass(cls)){
        _this.removeClass(cls);
    } else {
    	_this.addClass(cls)
    }
    return;
};