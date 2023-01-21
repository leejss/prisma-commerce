import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prismaClient from "../../db/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const bodySchema = z.object({
      rating: z.number(),
      text: z.string(),
      userId: z.string(),
      productId: z.string(),
    });
    try {
      const body = JSON.parse(req.body);
      bodySchema.parse(body);
      const result = await prismaClient.review.create({
        data: body,
      });
      res.status(200).json(result);
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({
          msg: "잘못된 요청입니다.",
        });
      }
      res.status(500).json(error.message);
    }
  }
}
