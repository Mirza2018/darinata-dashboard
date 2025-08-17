import { Button, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../redux/api/adminApi";
import { toast } from "sonner";

const SettingsChangePassword = () => {
  const [changePass] = useChangePasswordMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);

    const toastId = toast.loading("Adgangskoden ændres...");

    try {
      const res = await changePass(values).unwrap();
      console.log(res);
      toast.success("Adgangskoden er ændret.", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields(); 
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at ændre problemet.", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div>
      <div
        className="container w-[90%] mx-auto bg-primary-color min-h-[80vh] p-20 flex justify-center items-center"
        style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
      >
        <div className="w-full lg:w-[70%]">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Nuværende adgangskode
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst din nuværende adgangskode.",
                },
              ]}
              name="oldPassword"
              className="text-white "
            >
              <Input.Password
                placeholder="Indtast venligst dit kodeord."
                className="py-2 px-3 text-xl bg-site-color border  text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Ny adgangskode
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst din nye adgangskode.",
                },
              ]}
              name="newPassword"
              className="text-white"
            >
              <Input.Password
                placeholder="Indtast din adgangskode."
                className="py-2 px-3 text-xl bg-site-color border  text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Indtast ny adgangskode igen
            </Typography.Title>
            <Form.Item
              name="confirmPassword"
              className="text-white"
              rules={[
                {
                  required: true,
                  message: "Bekræft venligst din adgangskode.",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "De to kodeord, du indtastede, stemmer ikke overens."
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Indtast venligst dit kodeord."
                className="py-2 px-3 text-xl bg-site-color border  text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <div className="mt-10">
              <Link
                to={`/admin/settings/forgot-password`}
                className=" text-lg !underline"
              >
                Glemt adgangskode?
              </Link>
            </div>
            <Form.Item>
              <Button
                className="w-full py-6 border  text-xl !text-white bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8"
                htmlType="submit"
              >
                Bekræft
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsChangePassword;
