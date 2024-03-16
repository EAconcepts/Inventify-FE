import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/helpers/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline } from "react-icons/md";
import { RiUserLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginProps {
  email: string;
  password: string;
}

const Signin = () => {
  const [loginValues, setLogin] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const { setToken, setUser } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigateTo = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevVals) => ({ ...prevVals, [name]: value }));
  };

  const handleLogin = useMutation({
    mutationFn: () => axios.post(`${apiUrl}/auth/signin`, loginValues),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message);
      const token = data.data.token;
      const user = data.data.data;
      localStorage.setItem("token", token);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setTimeout(() => {
        navigateTo("/dashboard");
      }, 1000);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginValues);
    if (!loginValues.email || !loginValues.password) {
      toast.error("Please enter email and password");
      return;
    }
    handleLogin.mutate();
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center "
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
      }}
    >
      <div className="bg-white/90 w-max px-[52px] flex flex-col items-center min-h-[50%] pb-[20px] rounded-[8px]">
        <h2 className="text-center mt-[24px] text-[24px] font-bold">
          USER LOGIN
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center mt-[16px] w-[250px] gap-y-[12px]  flex-col items-center "
        >
          {/* Email */}
          <div className="w-full relative">
            <RiUserLine className=" absolute top-[50%] translate-y-[-50%] left-[8px] " />
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="pl-[24px]"
            />
          </div>
          {/* Password */}
          <div className="w-full relative">
            <MdLockOutline className=" absolute top-[50%] translate-y-[-50%] left-[8px] " />
            <Input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              className=" pl-[24px]"
            />
          </div>
          <div className="w-full flex justify-between text-[12px]">
            <div className=" flex items-center gap-x-[8px] ">
              <Input className="size-[14px] " type="checkbox" />
              <span>Remember me</span>
            </div>
            <Link to="">Forgot Password?</Link>
          </div>
          <Button className="mt-[12px] px-[32px]">
            {handleLogin.isPending ? "Logging in..." : "Login"}
          </Button>
          <div className=" w-full flex gap-x-[10px] items-center">
            <div className="w-full border h-0 "></div>
            <span>OR</span>
            <div className="w-full border h-0 "></div>
          </div>
        </form>
        <div className="mt-[16px] gap-y-[12px] flex flex-col">
          <Button
            variant={"outline"}
            className="w-full flex gap-x-[8px] py-[18px]"
          >
            <FcGoogle />
            <span>Continue with google</span>
          </Button>

          <p className="text-[14px]">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-blue-500 ">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
