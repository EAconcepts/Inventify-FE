import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/helpers/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdLocalPhone, MdLockOutline, MdOutlineMail } from "react-icons/md";
import { RiUserLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface RegisterProps {
  name?: string;
  email?: string;
  telephone?: string;
  password?: string;
}
const Signup = () => {
  const [user, setUserLogin] = useState<RegisterProps>({
    name: "",
    email: "",
    telephone: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setToken } = useAuth();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLogin((prevVals) => ({ ...prevVals, [name]: value }));
  };
  const validateInputs = () => {
    const errors: RegisterProps = {};
    if (!user.name) {
      errors.name = "Name cannot be empty!";
    }
    if (!user.email) {
      errors.email = "Please enter a valid email";
    }
    if (!user.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  };
  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = validateInputs();
    console.log(validated);
    console.log(user);
    if (Object.keys(validated).length > 0) {
      toast.error("Please fill all fields");
      return;
    }
    handleSignUp.mutate();
  };

  const handleSignUp = useMutation({
    mutationFn: () => axios.post(`${apiUrl}/auth/signup`, user),
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.data.token);
      setToken(data?.data.token);
      toast.success(data.data.message);
      setTimeout(() => navigateTo("/auth/verification"), 1000);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center "
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
      }}
    >
      <div className="bg-white/90 w-max px-[52px] flex flex-col items-center min-h-[50%] pb-[20px] rounded-[8px]">
        <h2 className="text-center mt-[24px] text-[24px] font-bold">
          USER SIGN UP
        </h2>
        <form
          onSubmit={signUp}
          className="flex justify-center mt-[16px] w-[250px] gap-y-[12px]  flex-col items-center "
        >
          <div className="w-full relative">
            <RiUserLine className=" absolute top-[50%] translate-y-[-50%] left-[8px] " />
            <Input
              type="text"
              placeholder="Name"
              name="name"
              onChange={onInputChange}
              value={user.name}
              className="pl-[24px]"
            />
          </div>
          <div className="w-full relative">
            <MdOutlineMail className=" absolute top-[50%] translate-y-[-50%] left-[8px] " />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              onChange={onInputChange}
              value={user.email}
              className="pl-[24px]"
            />
          </div>
          <div className="w-full relative">
            <MdLocalPhone className=" absolute top-[50%] translate-y-[-50%] left-[8px] " />
            <Input
              type="tel"
              placeholder="Phone Number"
              name="telephone"
              onChange={onInputChange}
              value={user.telephone}
              className="pl-[24px]"
            />
          </div>
          <div className="w-full relative">
            <MdLockOutline className=" absolute top-[50%] translate-y-[-50%] left-[8px] " />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onInputChange}
              value={user.password}
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
            {handleSignUp.isPending ? "Signing up..." : "Sign Up"}
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
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 ">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
