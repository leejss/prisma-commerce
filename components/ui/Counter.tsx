import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Counter = ({ onDecrement, onIncrement, value }: Props) => {
  return (
    <div>
      <span>수량</span>
      <div className="flex items-center gap-4">
        <button
          className="disabled:text-gray-400"
          onClick={onDecrement}
          disabled={value === 1}
        >
          <AiOutlineMinus size={24} />
        </button>
        <span className="w-10 text-center">{value}</span>
        <button onClick={onIncrement}>
          <AiOutlinePlus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Counter;
