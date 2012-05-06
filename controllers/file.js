module.exports = function(settings, req, res) {

	this.index = function() {

        res.render(settings.themes[settings.theme].index, {
            title: 'Index'
        });
	};

	this.upload = function() {

		res.render(settings.themes[settings.theme].upload, {
            title: 'Upload'
        });
	};

	return this;
};