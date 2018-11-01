const winston = require('winston');
const config  = require('./config');
const nodeEnv = config.get('NODE_ENV');
const path    = require('path');
const util    = require('util');
const _       = require('lodash');
require('winston-daily-rotate-file');

const logTransports = [];

logTransports.push(new winston.transports.Console({
    colorize: true,
    humanReadableUnhandledException: true,
    level: (nodeEnv === 'production' ? 'info' : 'debug')
}));

const logFilename = config.get('log:file:path');
console.log(logFilename);
if (logFilename) {
    logTransports.push(new winston.transports.DailyRotateFile({
        filename: '.log',
        dirname: logFilename,
        datePattern: 'cli_dd-MM-yyyy',
        maxsize: 10485760,
        maxFiles: 50,
        prepend: true,
        json: false,
        level: (nodeEnv === 'production' ? 'warn' : 'debug')
    }));
}

const log = new winston.Logger({
    transports: logTransports,
    handleExceptions: true,
    humanReadableUnhandledException: true
});

/**
 * Лог
 *
 * @param text string
 * @param desc string
 *
 */

const set = function (text, desc) {

    let error = text;
    if (_.isObject(desc)) {
        error += JSON.stringify(desc);
    } else if (_.isString(desc)) {
        error += desc;
    }else if (_.isNumber(desc)) {
        error += desc.toString();
    }


    log.debug(error);
};


module.exports = {
    log,
    set
};