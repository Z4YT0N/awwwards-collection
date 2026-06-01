const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Remove /liquid-metal-drbaph prefix from URL for file lookup
    let url = req.url.replace('/liquid-metal-drbaph', '');
    let filePath = '.' + url;
    
    if (filePath === './') {
        filePath = './index.html';
    }

    // Map URLs to the correct public directory
    if (filePath.startsWith('./logos/')) {
        filePath = './public/liquid-metal-drbaph' + url;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpg'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.error('File not found:', filePath, 'Original URL:', req.url);
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const port = 3003;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
