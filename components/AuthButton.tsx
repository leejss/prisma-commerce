import { useRouter } from "next/router";
import useUserStore from "../store/user";
import Button from "./ui/Button";

const AuthButton = () => {
  const store = useUserStore();
  const router = useRouter();
  const handleClick = () => {
    if (store.user) {
      store.reset();
    } else {
      router.push({
        hash: "login",
      });
    }
  };

  return (
    <Button onClick={handleClick} className="absolute top-6 right-8">
      {store.user ? "로그아웃" : "로그인"}
    </Button>
  );
};

export default AuthButton;
