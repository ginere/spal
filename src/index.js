/**
 *		- Exporting several packages ...
 *  Usage:
 *
 * var spal=require('spal');
 *
 * var spa=spal.spa;
 * var error=spal.error;
 * var log=spal.log;
 *
 */
'use strict';

module.exports={
    spa:require('./spa.js'),
    error:require('./error'),
    log:require('./log.js')    
};
