import { Hono } from "hono";

type Env = {
  Bindings: {
    MY_VAR: string;
  };
};

const app = new Hono<Env>();

export const clockRoute = app.get("/", async (c) => {
  return c.json({
    var: c.env.MY_VAR,
    time: new Date().toLocaleTimeString(),
  });
});
