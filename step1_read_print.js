const { readline } = require("./node_readline");
const { read_str } = require("./reader");
const { pr_str } = require("./printer");

// Read
const READ = (str) => read_str(str);

// Eval
const EVAL = (ast, env) => ast;

// Print
const PRINT = (exp) => pr_str(exp, true);

// REPL
const REP = (str) => PRINT(EVAL(READ(str), {}));

while (true) {
  let line = readline("user> ");
  if (line == null) break;
  try {
    if (line) {
      console.log(REP(line));
    }
  } catch (e) {
    console.error(`${e}`);
  }
}
