var printer = require('./../module/index');

printer.addToPrint('hello', 'hello World!', 'string');
printer.addToPrint('welcome', 'hello World!', 'string');
printer.addToPrint('sayHello', sayHello, 'function');

printer.print('./tests/test in.txt', './tests/test out.txt');

function sayHello(){
    return 'Hello from node printer!'
}