import { Hono } from "hono";
import renderClient from "@/middleware/renderClient";
import { clockRoute } from "@/server/routes/clock";

const app = new Hono();

app.route("api/clock", clockRoute);

app.get("*", renderClient);

export default app;
