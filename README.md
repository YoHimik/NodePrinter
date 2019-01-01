# NodePrinter
Simple code generator module based on Node.Js with comfortable pasting in file.
# Usage
See tests for example.

1. Prepare your generating file. Make labels in the following pattern *nodePrinter nameOfLabel* (label command may be changed in
config file). Must be one space before *nodePrint* command, after it and after *nameOfLabel* (finding command labels implemented by
spliting line in spaces). That label will be replaced.

2. Write simple js script for replacing labels. Use module function *addToPrint(nameOfLabel, value(string or function, that returns 
string , type(string or function)* to describe labels meaning. After this use module function *print(inputFilePath, (optional) outputFilePath)* for printing.
If outputFilePath not specified, then outputFilePath will be inputFilePath. Don not recommend use it, because you can lose original file. 

3. Run this script and get generated file. 
# Advantages
Readily generate calculations or table for your Latex document.

Useful log output for not used labels in file.

Custom log settings for output in console or after comment symbol (set in config) in output file. 

Easy write and run scripts from any IDE.

No build, no waiting and no problems.

