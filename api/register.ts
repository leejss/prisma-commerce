import { Response } from "../types/api";

type RegisterBody = {
  email: string;
  firstName: string;
  lastName: string;
};

export default async function register(body: RegisterBody): Promise<Response> {
  try {
    const res = await fetch(`http://localhost:3000/api/register`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg);

    return {
      data: json,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: JSON.parse(error.message),
    };
  }
}
