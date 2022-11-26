import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import { useStore } from "../../store/auth";

const SignUp = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const handleSignUp = (values) => {
    console.log(values);
    axiosClient
      .post("register", values)
      .then((res) => {
        const user = res?.data?.user;
        console.log(res);
        setUser(user);
        localStorage.setItem("token", res?.data?.token);
        toast.success("đăng ký tài khoản thành công");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <LayoutAuthentication heading="Sign Up">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Dont have an account?
        <Link to="/login" className="font-medium underline text-primary">
          Sign in
        </Link>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="field flex flex-col w-full items-start">
            <Label htmlFor="email">Full name</Label>
            <Input
              control={control}
              name="name"
              placeholder="full name"
            ></Input>
          </div>
          <div className="field flex flex-col w-full items-start">
            <Label htmlFor="email">Email *</Label>
            <Input
              control={control}
              name="email"
              placeholder="example@gmail.com"
            ></Input>
          </div>
          <div className="field flex flex-col w-full items-start">
            <Label htmlFor="email">password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="password"
            ></Input>
          </div>

          <Button type="submit">Sign up</Button>
        </form>
      </p>
    </LayoutAuthentication>
  );
};

export default SignUp;
