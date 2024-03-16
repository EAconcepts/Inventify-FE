import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/helpers/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Verification = () => {
  const [otp, setOtpValues] = useState<string>("");

  const navigateTo = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useAuth();
  //   console.log(token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(otp);
    if (!otp || (otp && otp.length < 4) || otp.trim() === "") {
      toast.error("Please enter a valid otp value");
      return;
    }
    verifyMutation.mutate();
  };

  const verifyMutation = useMutation({
    mutationFn: () =>
      axios.post(`${apiUrl}/auth/verification`, { otp }, { headers }),
    onSuccess: (data) => {
      toast.success(data.data.message);
      navigateTo("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return (
    <div>
      <div
        className="w-full h-screen flex flex-col justify-center items-center "
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        }}
      >
        <div className="bg-white/90 w-max px-[52px] flex flex-col items-center  pb-[20px] rounded-[8px]">
          <h2 className="text-center mt-[24px] text-[24px] font-bold">
            USER VERIFICATION
          </h2>
          <form
            onSubmit={handleVerification}
            className="flex justify-center mt-[16px] w-[250px] gap-y-[12px]  flex-col items-center "
          >
            <div className="w-full relative">
              {/* <RiUserLine className=" absolute top-[50%] translate-y-[-50%] left-[8px] " /> */}
              <Input
                value={otp}
                onChange={(e) => setOtpValues(e.target.value)}
                maxLength={4}
                placeholder="1234"
                className="pl-[24px] text-center tracking-[24px] text-black placeholder:text-gray-400"
              />
            </div>

            <Button className="mt-[12px] px-[32px]">
              {verifyMutation.isPending ? "Verifying" : "Verify"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verification;
