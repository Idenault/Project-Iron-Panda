// Ian Denault 101 057 419
// Lukas McClelland 101 057 299

var http = require('http');
var url = require ('url');
var fs = require ('fs');

var ROOT_DIR = 'html';

//create MIME types and get method
var MIME_TYPES = {
    'html': 'text/html',
    'js': 'text/javascript',
    'json': 'application/json',
    'txt': 'text/plain'
};

var get_mime = function(filename){
    var ext, type;
    for (ext in MIME_TYPES){
        type = MIME_TYPES[ext];
        if(filename.indexOf(ext, filename.length - ext.length) !== -1){
            return type;
        }
    }
    return MIME_TYPES['txt'];
};


//launch server
http.createServer(function(request, response){
    var urlObj = url.parse(request.url, true, false);

    var receivedData = '';

    request.on('data', function(chunk){
       receivedData += chunk;
    });

    request.on('end', function(){

        if(request.method === "POST"){
            var dataObj = JSON.stringify(receivedData);

            // -------------------------------------------
            // process the user requests for permissions here
            //
            //
            //
            //--------------------------------------------
        }

        if(request.method === "GET"){
            var filePath = ROOT_DIR + urlObj.pathname;

            fs.readFile(filePath, function(err, data){
                if (err) {

                    console.log("ERROR: File not found." + JSON.stringify(err));

                    response.writeHead(404);
                    response.end(JSON.stringify(err));
                    return;
                }

                response.writeHead(200, {'Content-Type': get_mime(filePath)});
                response.end(data);
            });
        }
    });
}).listen(3000);

console.log("Server Running at http://127.0.0.1:3000/assignment2.html Ctrl-C to stop server.");
