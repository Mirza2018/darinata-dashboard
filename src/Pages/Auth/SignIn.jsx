import { Checkbox, Button, Input, Form, Typography, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { DownOutlined } from "@ant-design/icons";

const SignIn = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const onFinish = (values) => {
    console.log("clinivea_user:", values);
    localStorage.removeItem("clinivea_user");
    localStorage.setItem("clinivea_user", JSON.stringify(values));
    navigate("/dashboard"); // Correct use of navigate function
  };
  return (
    <div className="text-base-color">
      <div className="max-w-[1350px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 min-h-screen py-10">
        <div className="">
          <img
            src={AllImages.logo}
            alt="logo"
            className="h-[60px] w-[245px] mx-auto"
          />
        </div>
        <div className="w-full md:w-[80%] lg:w-full mx-auto">
          {/* -------- Sign In Page Header ------------ */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-center mt-5 mb-8">
              <h1 className="text-3xl sm:text-4xl font-medium mb-4">
                Login to Account!
              </h1>
              <p className="text-lg sm:text-xl mb-2 ">
                Please enter your email and password to continue.
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
                  message: "Email is Required",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Password is Required",
                },
              ]}
              name="password"
              className="text-base-color"
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Role
            </Typography.Title>
            <Form.Item
              rules={[{ required: true }]}
              name="role"
              className="text-white"
            >
              <Select
                placeholder="Select Role"
                suffixIcon={
                  <DownOutlined className="text-[#222222] text-xl  mt-1" />
                }
                className="h-12 text-xl bg-site-color  text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="mvr">MVR </Select.Option>
                <Select.Option value="user">User </Select.Option>
              </Select>
            </Form.Item>
            <div className="flex justify-between items-center mt-10">
              <Checkbox className="">Remember me</Checkbox>
              <Link
                to="/forgot-password"
                className="!text-[#F5382C] !underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
