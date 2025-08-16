import { Button, Form } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { AllImages, AuthImages } from "../../../public/images/AllImages";
import {
  useForgetOtpVerifyMutation,
  useResendOTPMutation,
} from "../../redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  clearAuth,
  clearForgotPasswordToken,
  clearResendSignUpToken,
  setForgotPasswordToken,
  setResetPasswordToken,
} from "../../redux/slices/authSlice";

const OtpPage = () => {
  const [varifyOtp] = useForgetOtpVerifyMutation();
  const [resendOtp] = useResendOTPMutation();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const resendToken = useSelector((state) => state.auth.resendSignUpToken);

  const handleResendOtp = async () => {
    dispatch(clearForgotPasswordToken());
    const data = {
      purpose: "forget-password",
    };
    const toastId = toast.loading("OTP genfremsendes...");
    try {
      const res = await resendOtp(data).unwrap();
      dispatch(setForgotPasswordToken(resendToken));
      console.log(res);
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.error("RedendOTP Error:", error); // Log the error for debugging

      toast.error(
        "Der opstod en fejl under genfremsendelsen af OTP'en. Prøv venligst igen senere.",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  const handleOTPSubmit = async () => {
    dispatch(clearResendSignUpToken());
    const toastId = toast.loading("OTP indsendes...");
    console.log("OTP:", otp);
    const data = { otp: Number(otp) };

    try {
      const res = await varifyOtp(data).unwrap();

      // dispatch(setSignUpToken(res?.data?.signUpToken));
      console.log(res);

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      dispatch(clearAuth());
      dispatch(setResetPasswordToken(res?.data?.resetPasswordToken));

      //   const decodeToken = jwtDecode(res?.data?.accessToken);
      //   dispatch(setAccessToken(res?.data?.accessToken));
      //   dispatch(setUserInfo(decodeToken));
      //   cookies.set("car_trading_dealer_accessToken", res?.data?.accessToken);
      navigate("/update-password");
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging

      toast.error(
        "Der opstod en fejl under registreringen. Prøv venligst igen senere.",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  // const handleOTPSubmit = () => {
  //   console.log("OTP:", otp);
  //   navigate("/update-password");
  // };

  return (
    <div className=" bg-[#E6F3F7]">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen bg-site-color py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] hidden lg:block">
          <img
            src={AllImages.otpPage}
            alt="forgot_Password_Img"
            className="w-full object-cover rounded-xl aspect-square"
          />
        </div>
        {/* <div className="h-[80vh] w-[2px] bg-[#F5382C] hidden lg:block"></div> */}
        <div className="w-full md:w-[80%] lg:w-[50%]   px-10 bg-[#F3F9FB] shadow-lg rounded-xl">
          <div className=" text-center">
            <div className="flex flex-col justify-center items-center">
              <div className="my-4">
                <img
                  src={AllImages.otpLogo}
                  alt="logo"
                  className="w-full object-cover rounded-xl aspect-square"
                />
              </div>
              <h1 className="text-4xl font-semibold mb-4">Enter your code</h1>
              <p className="text-base font-normal  mb-2 text-[#1E1E1E] ">
                We sent a code your email address.
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] bg-transparent border border-input-color
                      hover:border-input-color focus:bg-transparent focus:border-input-color rounded-lg mr-[10px] sm:mr-[20px] text-secondary-color !text-black !border-[#1E1E1E] !bg-white"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>
              <div className="flex justify-between py-1">
                <p>Didn’t receive code?</p>
                <p
                  onClick={handleResendOtp}
                  className="!text-[#F5382C] cursor-pointer !underline font-semibold"
                >
                  Resend
                </p>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-[#FF991C] hover:border-input-colortext-xl text-white bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8"
                  onClick={handleOTPSubmit}
                >
                  Get OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtpPage;
