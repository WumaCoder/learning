import { httpRequest, tcpSend } from "./httpRequest";

describe("httpRequest.js", () => {
  it("a request", async () => {
    const resText = await httpRequest({
      method: "POST",
      url: "/",
      port: 3000,
      body: {
        a: 1,
        b: 2,
      },
    });

    expect(resText.includes("Hello World")).toBe(true);
  });

  it("request remote http", () => {});
});
