module.exports = function(express, path, server, settings) {
    var fs = require('fs');

    //Show all errors and keep search engines from using robots.txt
    server.configure('development', function() {
        server.use(express.errorHandler({
            'dumpExceptions': true,
            'showStack': true
        }));
        server.all('/robots.txt', function(req,res) {
            res.send('User-agent: *\nDisallow: /', {'Content-Type': 'text/plain'});
        });
    });

    //Suppress errors, allow all search engines
    server.configure('production', function() {
        server.use(express.errorHandler());
            server.all('/robots.txt', function(req,res) {
            res.send('User-agent: *', {'Content-Type': 'text/plain'});
        });
    });

    //File Upload Page
    server.get('/file/upload', function(req, res) {
        res.render(settings.themes[settings.theme].upload, {
            title: 'Fi'
        });
    });

    server.post('/file/upload', function(req, res) {
        var tmp_path    = req.files.file.path; //get the temporary location of the file
        var target_path = path + '/uploads/' + req.files.file.name; //set where the file should actually exists - in this case it is in the "images" directory

        //move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if(err) throw err;
            //delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if(err) throw err;
                console.log('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
                res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
            });
        });
    });

    //Base url
    server.get('/', function(req, res) {
        res.redirect('/file/upload');
    });

    //404
    server.get('*', function(req, res) {
        if(req.accepts('html')) {
            res.status(404);
            res.render(settings.themes[settings.theme].errors.notfound, {
                title: 'Not Found'
            });
        }
    });
}