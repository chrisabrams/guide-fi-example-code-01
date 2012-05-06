(function(io, window) {

	var fi = {};

	fi.init = function() {
		var file     = document.getElementById('file'),
			progress = document.getElementById('file-upload-progress'),
			submit   = document.getElementById('file-upload-submit');
		
		file.onchange = function() {
			fi.select();
		};

		submit.onclick = function(e) {
			e.preventDefault();

			var file = document.getElementById('file').files[0];

			if(file) {
				progress.addClass("active"); //Makes the progress bar stripes move
				fi.upload();
			} else {
				fi.alert.msg('error', 'Please select a file to upload.');
			}
		};
	};

	fi.alert = {};

	fi.alert.dismiss = function() {
		var alert     = document.getElementById('alert-msg'),
			container = document.getElementById('alert');

		container.removeClass('alert-error');
		alert.innerHTML = '';
		container.style.display = 'none';
	};

	fi.alert.msg = function(type, msg) {
		var alert     = document.getElementById('alert-msg'),
			container = document.getElementById('alert')
			elClass   = 'alert-' + type;

		container.addClass('alert');
		container.addClass(elClass);
		alert.innerHTML = msg;
		container.style.display = 'block';

		//var close = document.body.hasClass('close');console.log(close);
	};

	fi.cancelled = function() {
		fi.alert.msg('default', 'Upload cancelled.');
	};

	fi.complete = function() {
		fi.alert.msg('success', 'File uploaded successfully!');
	};

	fi.failed = function() {
		fi.alert.msg('error', 'The file failed to upload.');
	};

	fi.progress = function(e) {
		if(e.lengthComputable) {
	    	var percent = Math.round(e.loaded * 100 / e.total),
	    		progressBar = document.getElementById('file-upload-progress-bar');

	    	progressBar.style.width = percent.toString() + '%';
		}
	};

	fi.select = function() {
		fi.alert.dismiss();

		var file          = document.getElementById('file').files[0],
			fileNameLabel = document.getElementById('file-name-label'),
			fileSizeLabel = document.getElementById('file-size-label'),
			fileTypeLabel = document.getElementById('file-type-label'),
			fileSize      = 0;
		
		if(file) {			
			if (file.size > 1024 * 1024) {
				fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			}
				
			else {
				fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
			}

			fileNameLabel.innerHTML = file.name;
			fileSizeLabel.innerHTML = fileSize;
			fileTypeLabel.innerHTML = file.type;
		} else {
			fi.alert.msg('error', 'Please select a file to upload.');
		}
	};

	fi.upload = function() {
		var fd = new FormData();
		fd.append('file', document.getElementById('file').files[0]);

		var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener("progress", fi.progress, false);
		xhr.addEventListener("load", fi.complete, false);
		xhr.addEventListener("error", fi.failed, false);
		xhr.addEventListener("abort", fi.canceled, false);
		xhr.open("POST", "/file/upload");
		xhr.send(fd);
	};

	fi.init();

} (window));