import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prismaClient from "../../db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const emailSchema = z.string();
  const email = req.query.email;
  try {
    emailSchema.parse(email);
    const findReuslt = await prismaClient.user.findFirst({
      where: {
        email: {
          equals: email as string,
        },
      },
    });
    if (!findReuslt) {
      throw new Error(
        JSON.stringify({
          message: "가입하지 않은 이메일입니다.",
          statusCode: "401",
        })
      );
    }
    res.status(200).json(findReuslt);
  } catch (error: any) {
    if (error.name === "ZodeError") {
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
