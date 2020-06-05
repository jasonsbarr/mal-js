const RL_LIB = "libreadline";
const HISTORY_FILE = require("path").join(process.env.HOME, ".mal-history");
const fs = require("fs");
const ffi = require("ffi-napi");

let rllib = ffi.Library(RL_LIB, {
  readline: ["string", ["string"]],
  add_history: ["int", ["string"]],
});
let rl_history_loaded = false;

const readline = (prompt = "user> ") => {
  if (!rl_history_loaded) {
    rl_history_loaded = true;
    let lines = [];
    if (fs.existsSync(HISTORY_FILE)) {
      lines = fs.readFileSync(HISTORY_FILE).toString().split("\n");
    }

    // Max of 2000 lines
    lines = lines.slice(Math.max(lines.length - 2000, 0));
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) {
        rllib.add_history(lines[i]);
      }
    }
  }

  let line = rllib.readline(prompt);
  if (line) {
    rllib.add_history(line);
    try {
      fs.appendFileSync(HISTORY_FILE, line + "\n");
    } catch (e) {
      // ignored
    }
  }

  return line;
};

module.exports = { readline };
