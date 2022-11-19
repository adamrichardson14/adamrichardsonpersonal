import type { NextApiRequest, NextApiResponse } from "next";
import { getViews, updateViews } from "../../../lib/views";

enum HttpMethod {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}

export default async function views(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.GET:
      return await getViews(req, res);
    case HttpMethod.POST:
      return updateViews(req, res);

    default:
      res.setHeader("Allow", [HttpMethod.POST, HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
