const Koa = require("koa");
const app = new Koa();
const env = require("./env");

// all paths lead too...
app.use((ctx) => {
  ctx.body = "Hello Koa";
});

app.listen(env.PORT);
