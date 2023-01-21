import useOrderStore from "../store/order";
import useUserStore from "../store/user";
import Button from "./ui/Button";
import Counter from "./ui/Counter";

type Props = {
  productId: string;
};

const ProductOrder = ({ productId }: Props) => {
  const user = useUserStore((state) => state.user);
  const { quantity, decQantity, incQantity } = useOrderStore();

  const handleOrder = async () => {};

  return (
    <div className="flex flex-col gap-3">
      <Counter
        value={quantity}
        onDecrement={decQantity}
        onIncrement={incQantity}
      />
      <Button theme="blue">Order</Button>
    </div>
  );
};

export default ProductOrder;
