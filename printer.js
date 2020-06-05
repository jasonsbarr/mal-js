const { _list_Q } = require("./types");

const pr_str = (obj) => {
  if (_list_Q(obj)) {
    return `(${obj.map((e) => pr_str(e)).join(" ")})`;
  } else if (typeof obj === "symbol") {
    return Symbol.keyFor(obj);
  } else if (obj === null) {
    return "nil";
  }

  return obj.toString();
};

module.exports = { pr_str };
