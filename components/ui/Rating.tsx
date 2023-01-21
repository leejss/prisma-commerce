import { AiFillStar } from "react-icons/ai";

type Props = {
  rating: number;
  onChange: (newRating: number) => void;
};

const Rating = ({ rating, onChange }: Props) => {
  const starArr = new Array(5).fill(false).map((_, idx) => {
    return idx < rating ? true : false;
  });
  return (
    <div className="flex gap-3">
      {starArr.map((mark, idx) => {
        return (
          <div
            onClick={() => {
              onChange(idx + 1);
            }}
            key={idx}
          >
            {mark ? <SelectedStart /> : <UnSelectedStar />}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;

const SelectedStart = () => {
  return <AiFillStar color="#ffb726" size={24} />;
};

const UnSelectedStar = () => {
  return <AiFillStar color="#d8d8d8" size={24} />;
};
