/* eslint-disable @next/next/no-img-element */
import type { Product } from "@prisma/client";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="rounded-2xl justify-around p-4 flex flex-col gap-3 w-[300px] h-[600px] glass">
      <h2 className="text-2xl text-center">{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        className="max-w-full h-[65%] object-contain"
      />
      <p className="text-center text-xl">{product.price.toLocaleString()}원</p>
    </div>
  );
};

export default ProductCard;
