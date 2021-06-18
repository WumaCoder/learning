export class ResponseParser {
  constructor() {
    const self = this;
    this.body = null;
    this.status = null;
    this.headers = {};
    this.state = lineStart;
    let line = "";
    function lineStart(c) {
      if (c === "\r") {
        return waitForLineEnd;
      } else {
        line += c;
        return lineStart;
      }
    }
    function waitForLineEnd(c) {
      if (c === "\n") {
        if (!self.status) {
          self.status = line;
        } else if (line) {
          const [key, value] = line.split(": ");
          self.headers[key] = value;
        } else {
          self.body = new BodyParser();
          return waitForBody;
        }
        line = "";
        return lineStart;
      } else {
        return lineStart;
      }
    }

    function waitForBody(c) {
      self.body.receive(c);
      return waitForBody;
    }
  }

  receive(input) {
    for (const c of input.split("")) {
      this.state = this.state(c);
    }
  }
}

class BodyParser {
  constructor() {
    const self = this;
    this.state = start;
    this.bodyText = "";
    function start(c) {
      self.bodyText += c;
      return start;
    }
  }

  receive(c) {
    this.state = this.state(c);
  }
}
