const config = require('./config');
const fs = require('fs');
const logger = require('./modules/logger');
const validator = require('./modules/validator');

let printList = [];

module.exports.addToPrint = addToPrint;
module.exports.print = print;
module.exports.config = config;

function addToPrint(key, value, type) {
    let print = validator.validateAndGetPrint(key, value, type);
    printList.push(print);
}

function print(inputFilePath, outputFilePath) {
    logger.startPrinter();

    validator.validateInputFilePath(inputFilePath);

    if (outputFilePath == undefined) {
        outputFilePath = inputFilePath;
    }

    fs.readFile(inputFilePath, config.inputEncoding, function (err, content) {
        if (err) {
            throw err;
        }

        let processedContent = processInputFile(content);
        processedContent = logger.processStack(processedContent);

        fs.writeFile(outputFilePath, processedContent, config.outputEncoding, function (err) {
            if (err) {
                throw err;
            }

            logger.endPrinter();
        });
    });
}

function processInputFile(content) {
    let lines = content.split(config.lineSeparator);
    for (let index = 0; index < lines.length; index++) {
        let words = lines[index].split(' ');

        while (words.includes(config.printCommand)) {
            let keyWordIndex = words.indexOf(config.printCommand);

            if (keyWordIndex + 1 >= words.length || words[keyWordIndex + 1] == '') {
                throw 'NodePrint argument not found! Try delete spaces after "' + config.printCommand + '" command.';
            }

            let print = printList.find(p => p.key == words[keyWordIndex + 1]);
            if (print == undefined) {
                logger.stackLog('Found key "' + words[keyWordIndex + 1] + '" in file, but not found key binding!');
                words.splice(keyWordIndex, 2);
                continue;
            }

            print.used = true;

            let value = processPrintValue(print);
            if (value == config.printCommand) {
                logger.stackLog('Found "' + config.printCommand + '" value in key "' + print.key + '" and was skipped.');
            } else {
                words[keyWordIndex + 1] = value;
            }

            words.splice(keyWordIndex, 1)
        }
        if (words.length == 0) {
            lines.splice(index, 1)
            index--;
        } else {
            lines[index] = words.join(' ');
        }
    }

    checkUnusedPrints();

    return lines.join(config.lineSeparator);
}

function processPrintValue(print) {
    switch (print.type) {
        case 'string':
            return print.value;
        case 'function':
            let out = print.value();
            if (typeof out != 'string') {
                throw 'Invalid function value of ' + print.key + ' key! Must be string!';
            }
            return out;
    }
}

function checkUnusedPrints() {
    for (let index = 0; index < printList.length; index++) {
        const print = printList[index];
        if (!print.used) {
            logger.stackLog('Key binding "' + print.key + '" not used in file!');
        }
    }
}