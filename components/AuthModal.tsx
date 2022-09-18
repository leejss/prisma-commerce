import { useRouter } from "next/router";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = () => {
  const router = useRouter();
  const hash = router.asPath.split("#")[1];

  const handleClickBackground = () => {
    router.replace({
      hash: "",
    });
  };

  return (
    <div
      onClick={handleClickBackground}
      className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.3)]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl"
      >
        {hash === "login" && <LoginForm />}
        {hash === "register" && <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthModal;
