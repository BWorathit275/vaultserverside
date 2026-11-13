const request = require("supertest");
const createApp = require("./app");

let app;
beforeEach(() => {
  app = createApp();
});

// TODO: test every route — status codes and bodies (see README)
