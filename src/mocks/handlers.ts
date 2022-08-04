import { rest } from "msw";

import data from "./data.json";

export const handlers = [
  rest.get("/users", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get("/users/:id", (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.status(200),
      ctx.json(data.find(({ username }) => username === id))
    );
  }),
];
