import { z } from "zod";
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import accounts from "./accounts";
import categories from "./categories";

import { HTTPException } from "hono/http-exception";
import { error } from "console";

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: "Internal error"}, 500)
})

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories);

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;
