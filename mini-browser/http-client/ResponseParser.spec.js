import { ResponseParser } from "./ResponseParser";
describe("ResponseParser.js", () => {
  it("text", () => {
    const responseText = `HTTP/1.1 200 OK\r\nX-Powered-By: Express\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: 12\r\nETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"\r\nDate: Fri, 18 Jun 2021 07:10:55 GMT\r\nConnection: keep-alive\r\nKeep-Alive: timeout=5\r\n\r\nHello World!\r\n`;

    const response = new ResponseParser();
    response.receive(responseText);
    console.log(response);
    expect(Boolean(response.headers)).toBe(true);
    expect(Boolean(response.status)).toBe(true);
    expect(Boolean(response.body)).toBe(true);
  });
  it("chunked", () => {
    const responseText = `HTTP/1.1 200 OK\r\nX-Powered-By: Express\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: 12\r\nETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"\r\nDate: Fri, 18 Jun 2021 07:10:55 GMT\r\nConnection: keep-alive\r\nKeep-Alive: timeout=5\r\n\r\nHello World!\r\n`;

    const response = new ResponseParser();
    response.receive(responseText);
    console.log(response);
  });
});
