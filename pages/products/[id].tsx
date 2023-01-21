/* eslint-disable @next/next/no-img-element */
import type { Product } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import ProductOrder from "../../components/ProductOrder";
import ProductReview from "../../components/ProductReview";
import prismaClient from "../../db/client";

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  return (
    <div className="container mx-auto">
      <h1 className="">{product.name}</h1>
      <div className="flex flex-col">
        <div className="">
          <img src={product.image} alt="" />
          <div>{product.price.toLocaleString()}원</div>
          <p>{product.description}</p>
        </div>
        <div>
          <ProductOrder productId={product.id} />
        </div>
        <div>{/* <ProductReview productId={product.id} /> */}</div>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const product = await prismaClient.product.findFirst({
      where: {
        id: {
          equals: ctx.query.id as string,
        },
      },
      include: {
        review: true,
      },
    });
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        product: null,
      },
    };
  }
};
