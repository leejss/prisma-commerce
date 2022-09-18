import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prismaClient from "../../db/client";
prismaClient;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodySchema = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });
  const body = JSON.parse(req.body);

  try {
    bodySchema.parse(body);

    const findReuslt = await prismaClient.user.findFirst({
      where: {
        email: {
          equals: body.email as string,
        },
      },
    });
    if (findReuslt)
      throw new Error(
        JSON.stringify({
          message: "이미 가입한 이메일입니다.",
          statusCode: "409",
        })
      );
    const newUser = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    };
    const createResult = await prismaClient.user.create({
      data: newUser,
    });
    res.status(200).json(createResult);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({
        msg: "잘못된 요청입니다.",
      });
    }
    const errorObj = JSON.parse(error.message);
    if (errorObj && errorObj.message && errorObj.statusCode) {
      res.status(errorObj.statusCode).json({
        msg: error.message,
      });
    }
    res.status(500).json(error.message);
  } finally {
    return;
  }
}
