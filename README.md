# Html to image server

#### A node.js/express app to convert SVGs/html to images via [Puppeteer](https://github.com/GoogleChrome/puppeteer).

## Getting Started

### Installation

* `npm install`
* `npm start`
* Send json to `http://localhost:3000/html-to-png` or `http://localhost:3000/html-to-jpeg`, I would recommend writing a little test app
```javascript
const fs = require("fs");

const file = "my-chart";
const type = "png";

fetch(`http://localhost:3000/html-to-${type}`, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Note that the content that you send should have height/width attributes set on the first element since those are used for screenshot dimensions
  body: JSON.stringify({
    content: fs
      .readFileSync(`./${file}.html`, { encoding: "utf8" })
      .replace(/(\r\n|\n|\r)/gm, " "),
    selector: "#hi",
  }),
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    if (res.msg == "Success") {
      let data = res.file.data;
      fs.writeFileSync(`./${file}.${type}`, Buffer.from(data));
    }
  })
  .catch((error) => {
    console.error(error);
  });

```

Note: When you install it downloads a recent version of Chromium that is guaranteed to work with the library.

### Usage

Requires Node v7.6.0 or greater.

## Built with

* [node.js](https://nodejs.org/en/) - Cross-platform JavaScript run-time environment for executing JavaScript code server-side. 
* [Puppeteer](https://github.com/GoogleChrome/puppeteer/) - Headless Chrome Node API.
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.

## License

This project is licensed under the The Unlicense [https://github.com/Malexion/Html-to-Image-Webserver/blob/master/LICENSE](https://github.com/Malexion/Html-to-Image-Webserver/blob/master/LICENSE).
