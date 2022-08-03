import { rest } from "msw";

import data from "./data.json";

export const handlers = [
  rest.get("/users", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),
];
