const { _list_Q } = require("./types");

const pr_str = (obj, print_readably = true) => {
  if (_list_Q(obj)) {
    return `(${obj.map((e) => pr_str(e)).join(" ")})`;
  } else if (typeof obj === "string") {
    if (print_readably) {
      return `"${obj
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '"')
        .replace(/\n/g, "\\n")}"`;
    } else {
      return obj;
    }
  } else if (typeof obj === "symbol") {
    return Symbol.keyFor(obj);
  } else if (obj === null) {
    return "nil";
  }

  return obj.toString();
};

module.exports = { pr_str };
