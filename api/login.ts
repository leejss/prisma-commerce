import { Response } from "../types/api";

export default async function login(email: string): Promise<Response> {
  try {
    const res = await fetch(`http://localhost:3000/api/login?email=${email}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg);
    console.log(json);
    return {
      data: json,
      error: null,
    };
  } catch (error: any) {
    console.log(JSON.parse(error.message));
    return {
      data: null,
      error: JSON.parse(error.message),
    };
  }
}
