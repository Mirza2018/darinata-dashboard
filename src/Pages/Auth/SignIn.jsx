import { Checkbox, Button, Input, Form, Typography, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { DownOutlined } from "@ant-design/icons";
import { useUserLoginMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { setAccessToken, setUserInfo } from "../../redux/slices/authSlice";

const SignIn = () => {
  const [userLogin] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for navigation
  const cookies = new Cookies();

  const onFinish = async (values) => {
    const toastId = toast.loading("Logger ind...");
    console.log("car_trading_dealer:", values);

    try {
      const res = await userLogin(values).unwrap();
      const decodeToken = jwtDecode(res?.data?.accessToken);

      dispatch(setAccessToken(res?.data?.accessToken));
      dispatch(setUserInfo(decodeToken));
      console.log("res: ", res, decodeToken);
      cookies.set("car_trading_dealer_accessToken", res?.data?.accessToken);
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging

      toast.error("Der opstod en fejl under login.", {
        id: toastId,
        duration: 2000,
      });
    }

    return;
  };

  return (
    <div className=" bg-[#E6F3F7]">
      <div className="max-w-[1350px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 min-h-screen py-10">
        <div className="hidden lg:block">
          <img
            src={AllImages.signinPageImage}
            alt="logo"
            className=" mx-auto "
          />
        </div>
        <div className="w-full md:w-[80%] lg:w-[80%] mx-auto px-10 bg-[#F3F9FB] shadow-lg rounded-xl">
          {/* -------- Sign In Page Header ------------ */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-center mt-5 mb-8">
              <div className="my-4">
                <img
                  src={AllImages.logo2}
                  alt="logo"
                  className=" w-80 h-24 aspect-square object-contain"
                />
              </div>
              <h1 className="text-4xl font-semibold mb-4 ">Log ind</h1>
              <p className="text-base font-normal  mb-2 text-[#1E1E1E] ">
               Velkommen til adminstrator adgang
              </p>
            </div>
          </div>
          {/* -------- Form Start ------------ */}

          <Form
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              name="email"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "E-mail er påkrævet.",
                },
              ]}
            >
              <Input
                placeholder="Indtast din e-mail"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
             Adgangskode
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Adgangskode er påkrævet.",
                },
              ]}
              name="password"
              className="text-base-color"
            >
              <Input.Password
                placeholder="Indtast din adgangskode"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>


            <div className="flex justify-between items-center mt-10">
              <Checkbox className="">Husk mig</Checkbox>
              <Link to="/forgot-password" className="!text-[#1E1E1E] ">
                Glemt adgangskode
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="w-full py-6 border border-[#FF991C] hover:border-input-colortext-xl  bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8 "
                htmlType="submit"
              >
                Log ind
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
