// NOTE: THIS ISN'T USED, BUT IS HERE AS AN EXAMPLE.
// DOWNSIDE: YOU CAN'T USE THE COMMAND LINE OPTIONS.
// INSTEAD, YOU MUST PASS A CONFIG OBJECT BELOW TO jsonServer.defaults();
// YOU HAVE TO CHECK THE SOURCE CODE TO SET SOME ITEMS. Examples:
// Delay: https://github.com/typicode/json-server/issues/534
// ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
// Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
// CAN PASS A LIMITED NUMBER OF OPTIONS TO THIS TO OVERRIDE (SOME) DEFAULTS. SEE https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// GENERATE A SLUG FOR NEW COURSES USING THE PROVIDED COURSE DATA.
server.use((req, res, next) => {
  const savingNewCourse = req.url === "/courses/" && req.method === "POST";
  if (savingNewCourse) {
    const slug = req.body.title.replace(" ", "-");
    console.log(slug);
    req.body.slug = slug;
  }
  next();
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
