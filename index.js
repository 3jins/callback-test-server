const http = require('http');
const fs = require('fs');
const util = require('util');
const {argv} = require('process')

/**
 * logging to file (copied from https://stackoverflow.com/a/70531748/7258660)
 */
const logFile = fs.createWriteStream('log.txt', { flags: 'a' });
const logStdout = process.stdout;

console.log = function () {
    // Storing without color codes
    logFile.write(util.format.apply(null,arguments).replace(/\033\[[0-9;]*m/g,"") + '\n');
    // Display normally, with colors to Stdout
    logStdout.write(util.format.apply(null, arguments) + '\n');
}
/**
 * logging to file
 */


/**
 * server
 */
const port = !!argv[2] ? argv[2] : 5913;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');

    const body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        logSeparator();
        console.log(Buffer.concat(body).toString());
    });
});

server.listen(port, () => {
    console.log(`Server started running at ${new Date}`);
    console.log(`Inbound port: ${port}`);
});

const logSeparator = () => {
    console.log('');
    console.log('=======================================================================================================================');
    console.log(new Date());
    console.log('=======================================================================================================================');
    console.log('');
};
/**
 * server end
 */

