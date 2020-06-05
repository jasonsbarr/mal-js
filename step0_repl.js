const { readline } = require("./node_readline");

// Read
const READ = (str) => str;

// Eval
const EVAL = (ast, env) => ast;

// Print
const PRINT = (exp) => exp;

// REPL
const REP = (str) => PRINT(EVAL(READ(str), {}));

while (true) {
  let line = readline("user> ");
  if (line == null) break;
  if (line) {
    console.log(REP(line));
  }
}
