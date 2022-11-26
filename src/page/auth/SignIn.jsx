import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Button from "../../components/Button";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-toastify";
import { useStore } from "../../store/auth";

const SignIn = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  //   const setToken = useStore((state) => state.setToken);
  const handleSignIn = (values) => {
    console.log(values);
    axiosClient
      .post("login", values)
      .then((res) => {
        console.log(res);
        const user = res?.data?.user;
        if (res?.data?.status === 401) {
          toast.error("đăng nhập không thành công");
        } else {
          setUser(user);
          localStorage.setItem("token", res?.data?.token);
          toast.success("đăng nhập thành công");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <LayoutAuthentication heading="Sign In">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Dont have an account?{" "}
        <Link to="/register" className="font-medium underline text-primary">
          Sign up
        </Link>
        <form onSubmit={handleSubmit(handleSignIn)}>
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
              placeholder="example@gmail.com"
            ></Input>
          </div>

          <Button type="submit">Sign in</Button>
        </form>
      </p>
    </LayoutAuthentication>
  );
};

export default SignIn;
