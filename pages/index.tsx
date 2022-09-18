import type { Product } from "@prisma/client";
import { useRouter } from "next/router";
import AuthButton from "../components/AuthButton";
import AuthModal from "../components/AuthModal";
import ProductCard from "../components/ProductCard";
import prismaClient from "../db/client";

type Props = {
  products: Product[];
};

const Home = ({ products }: Props) => {
  const router = useRouter();
  const hash = router.asPath.split("#")[1];
  const authModalOpen = hash === "login" || hash === "register";

  return (
    <>
      <div className="container mx-auto py-[200px]">
        <AuthButton />
        <ul className="flex gap-4 max-w-[80%]">
          {products.map((p) => {
            return (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            );
          })}
        </ul>
      </div>
      {authModalOpen && <AuthModal />}
    </>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const products = await prismaClient.product.findMany();
    console.log(products);
    return {
      props: { products },
    };
  } catch (error) {
    console.log(error);
  }
}
