import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import register from "../api/register";
import Button from "./ui/Button";
import Input from "./ui/Input";

const RegisterForm = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
      }}
      validate={(values) => {
        const errors = {} as Record<string, string>;
        if (!values.email) {
          errors.email = "이메일을 입력하세요.";
        }
        if (!values.firstName) {
          errors.firstName = "First Name을 입력하세요.";
        }
        if (!values.lastName) {
          errors.lastName = "Last Name을 입력하세요.";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        const res = await register(values);
        if (res.error) {
          setErrorMsg(res.error.msg);
          return;
        }
        if (res.data) {
          alert("계정을 생성했습니다.");
          router.replace({
            hash: "#login",
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
          className="flex flex-col justify-between gap-4"
        >
          <label>
            <Input
              placeholder="Eamil"
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </label>
          {errors.email && <span className="text-red-500">{errors.email}</span>}
          <label>
            <Input
              placeholder="First Name"
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
          </label>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName}</span>
          )}
          <label>
            <Input
              placeholder="Last Name"
              type="text"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
          </label>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName}</span>
          )}
          <Button type="submit" disabled={isSubmitting}>
            계정생성하기
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
