import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

export async function getViews(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  const response = await prisma.viewCount.upsert({
    where: {
      slug: slug as string,
    },
    create: {
      slug: slug as string,
      count: 1,
    },
    update: {},
  });

  return res.status(200).json(response);
}

export async function updateViews(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  const response = await prisma.viewCount.upsert({
    where: {
      slug: slug as string,
    },
    create: {
      slug: slug as string,
      count: 1,
    },
    update: {
      count: { increment: 1 },
    },
  });

  return res.status(200).json(response);
}
