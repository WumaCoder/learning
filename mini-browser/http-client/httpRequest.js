import * as net from "net";
import { ContentType } from "./ContentType";

export function httpRequest(opts) {
  const requestOptions = disposeOptions(opts);

  disposeBody(requestOptions);
  disposeHttp(requestOptions);

  const responseText = await sendHttpText(requestOptions);

  console.log(responseText);
  return new Promise((resolve, reject) => {});
}

export function sendHttpText({ port, httpText, host }, callback) {
  const client = net.createConnection({ port, host }, () => {
    client.write(httpText);
  });

  client.on("data", (data) => {
    callback(null, data.toString());
    client.end();
  });

  client.on("error", (err) => {
    callback(err, null);
    client.end();
  });
}

function toHeaderText(headers) {
  return Object.keys(headers).reduce((text, key) => {
    return text + `${key}: ${headers[key]}\r\n`;
  }, "");
}

function disposeHttp(requestOptions) {
  requestOptions.httpText = `${requestOptions.method} ${requestOptions.url} ${requestOptions.protocol}\r\n`;
  requestOptions.httpText += toHeaderText(requestOptions.headers);
  requestOptions.httpText += requestOptions.bodyText;
  requestOptions.httpText += "\r\n";
}

function disposeBody(requestOptions) {
  if (requestOptions.method === "GET") {
    requestOptions.bodyText = "";
    return;
  }
  const contentType = requestOptions.headers["Content-Type"];
  requestOptions.bodyText =
    "\r\n" + ContentType[contentType]?.(requestOptions.body);
  requestOptions.headers["Content-Length"] = requestOptions.bodyText.length;
}

function disposeOptions(opts) {
  const requestOptions = Object.assign(
    {
      method: "GET",
      url: "/",
      port: 80,
      protocol: "HTTP/1.1",
      params: {},
      query: {},
      body: {},
      headers: {},
    },
    opts
  );

  requestOptions.headers = Object.assign(
    {
      Host: "127.0.0.1",
      "Content-Type": "application/json",
    },
    requestOptions.headers
  );

  return requestOptions;
}
