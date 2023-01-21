type Body = {
  rating: number;
  text: string;
  userId: string;
  productId: string;
};

export async function addReview(body: Body) {
  try {
    const res = await fetch(`http://localhost:3000/api/reviews`, {
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
