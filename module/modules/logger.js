const config = require('./../config');

const printerStarted = 'NodePrinter started!';
const printerEnded = 'NodePrinter executed successfully!';

const logTypes = ['none', 'console', 'outFile', 'both'];
if (!logTypes.includes(config.logTo)) {
    throw 'Invalid logTo config value! Must be one of the: ' + logTypes.join();
}

let logBuffer = [];

module.exports.processStack = processStack;
module.exports.stackLog = stackLog;
module.exports.consoleLog = consoleLog;
module.exports.startPrinter = startPrinter;
module.exports.endPrinter = endPrinter;

function stackLog(message) {
    if (config.logTo != logTypes[0]) {
        logBuffer.push(message);
    }
}

function consoleLog(message) {
    if (config.logTo != logTypes[0]) {
        console.log(message);
    }
}

function startPrinter() {
    consoleLog(printerStarted);
}

function endPrinter() {
    consoleLog(printerEnded);
}

function outFileLog(message) {
    return config.commentSymbol + ' ' + message + config.lineSeparator;
}

function processStack(content) {
    content = config.commentSymbol + config.lineSeparator + content;
    for (let index = 0; index < logBuffer.length; index++) {
        const log = logBuffer[index];
        switch (config.logTo) {
            case 'console':
                consoleLog(log);
                break;
            case 'file':
                content = outFileLog(log) + content;
                break;
            case 'both':
                consoleLog(log);
                content = outFileLog(log) + content;
                break;
            case 'none':
                break;
        }
    }
    return content;
}

