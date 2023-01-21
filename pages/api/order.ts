import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prismaClient from "../../db/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodySchema = z.object({
    quantity: z.number(),
    productId: z.string(),
    userId: z.string(),
  });
  try {
    const body = JSON.parse(req.body);
    bodySchema.parse(body);

    // TODO. Prisma client 살펴보기

    // const user = await prismaClient.user.findFirst({
    //   where: {
    //     id: {
    //       equals: body.userId,
    //     },
    //   },
    // });
    // if (!user)
    //   throw new Error(
    //     JSON.stringify({
    //       msg: "일치하는 유저가 없습니다.",
    //       code: "400",
    //     })
    //   );
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({
        msg: "잘못된 요청입니다.",
      });
    }
  }
}

//
