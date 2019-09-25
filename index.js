var http = require('http');
var fs = require('fs');
var multiparty = require('multiparty');

let handler = (req, res) => {

	if(req.url === '/files' && req.method === 'GET'){
        fs.readdir('./', (err, files) => {
    
            if(err){
                res.write('Cant read directory');
                res.end();
                return;
            }
    
            res.write('<h1>Files list</h1>');
            res.write('<a href="/files/add">Add new file</a>');
            res.write('<ul>');
            files.forEach(file => {
                res.write('<li>' + file + '</li>');
            });
            res.write('</ul>');
            res.end();
        });
        return;
    }

	if(req.url === '/files/add' && req.method === 'GET'){
        fs.readFile('./addfile.html', (err, data) => {
            if(err){
                res.write('Error loading html file');
                res.end();
                return;
            }
            res.write(data);
            res.end();
        });
        
        return;
    }

	if(req.url === '/files' && req.method === 'POST'){
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if(err){
                res.write('Error parsing form');
                res.end();
                return;
            }
            
            fs.writeFile(fields['filename'] + "", 'some dump content', err => {
                if(err){
                    res.write('Error creating file');
                    res.end();
                    return;
                }
    
                res.writeHead(302, {
                    Location: '/files'
                });
                res.end();
            });
        })
        return;
    }

	res.write('HTTP 404: Not Found');
	res.end();
};

http.createServer(handler).listen(8080);