class Reader {
  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
  }

  next() {
    return this.tokens[this.position++];
  }

  peek() {
    return this.tokens[this.position];
  }
}

const tokenize = (str) => {
  const re = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g;
  let match = null;
  let results = [];

  while ((match = re.exec(str)[1]) !== "") {
    if (match[0] === ";") continue;
    results.push(match);
  }

  return results;
};

const read_atom = (reader) => {};

const read_list = (reader, start = "(", end = ")") => {
  let ast = [];
  let token = reader.next();

  if (token !== start) {
    throw new Error(`Expected '${start}', got ${token}`);
  }

  while ((token = reader.peek()) !== end) {
    if (!token) {
      throw new Error(`Expected '${end}', got EOF`);
    }
    ast.push(read_form(reader));
  }

  reader.next();
  return ast;
};

const read_form = (reader) => {
  let token = reader.peek();

  switch (token) {
    case ")":
      throw new Error("Unexpected ')'");
    case "(":
      return read_list(reader);
    default:
      return read_atom(reader);
  }
};

const read_str = (str) => {
  const tokens = tokenize(str);

  return read_form(new Reader(tokens));
};
