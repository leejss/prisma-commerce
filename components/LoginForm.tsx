import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import login from "../api/login";
import useUserStore from "../store/user";
import Button from "./ui/Button";
import Input from "./ui/Input";

const LoginForm = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const setUser = useUserStore((state) => state.setUser);
  return (
    <div className="flex flex-col gap-4">
      <Formik
        initialValues={{
          email: "",
        }}
        validate={(values) => {
          const errors = {} as Record<string, string>;
          if (!values.email) {
            errors.email = "이메일을 입력하세요.";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          const email = values.email;
          const res = await login(email);
          if (res.error) {
            setErrorMsg(res.error.msg);
            return;
          }
          if (res.data) {
            setUser(res.data);
            router.replace({
              hash: "",
            });
          }
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between gap-2"
          >
            <label>
              <Input
                placeholder="Email"
                className=""
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </label>
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
            <Button type="submit" disabled={isSubmitting}>
              로그인
            </Button>
          </form>
        )}
      </Formik>
      <Button
        theme="blue"
        onClick={() => {
          router.replace({
            hash: "register",
          });
        }}
      >
        계정 생성하기
      </Button>
    </div>
  );
};

export default LoginForm;
