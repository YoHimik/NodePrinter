const fs = require('fs');
const printModel = require('./../models/print.model');

const printTypes = ['function', 'string']; //TODO: add file input

module.exports.validateAndGetPrint = validateAndGetPrint;
module.exports.validateInputFilePath = validateInputFilePath;
module.exports.printTypes = printTypes;

function validateAndGetPrint(key, value, type) {
    if (typeof key != 'string') {
        throw 'Invalid key! Must be string!';
    }

    if (printTypes.includes(typeof value) == undefined) {
        throw 'Invalid value! Must be one of the: ' + printTypes; 
    }

    if (type == undefined || type == null) {
        type = printTypes[0];
        return;
    }

    if (!printTypes.includes(type)) {
        throw 'Invalid print type! Must be one of the: ' + printTypes; 
    }

    let print = new printModel.Print(key, value, type);
    return print;
}

function validateInputFilePath(inputFilePath) {
    if (inputFilePath == undefined || typeof inputFilePath != 'string') {
        throw 'Invalid input file path!';
    }

    if (!fs.existsSync(inputFilePath)) {
        throw 'Input file not found!'
    }
}
