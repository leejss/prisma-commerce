import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Rating from "./ui/Rating";
import { addReview } from "../api/reviews";
import useUserStore from "../store/user";

type Props = {
  productId: string;
};

const ProductReview = ({ productId }: Props) => {
  const user = useUserStore((state) => state.user);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleClick = async () => {
    if (!user) return;
    if (rating === 0) {
      alert("Select rating");
      return;
    }
    const body = {
      rating,
      text,
      userId: user.id,
      productId,
    };
    const result = await addReview(body);
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-3">
      <Rating rating={rating} onChange={setRating} />
      <Input
        disabled={!user}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button disabled={!user} className="self-end" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default ProductReview;
