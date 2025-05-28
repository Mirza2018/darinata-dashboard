/ eslint-disable no-unused-vars /;
import { Button, Form, Input, Spin, Typography, Upload } from "antd";
import profileImage from "/images/profileImage.png";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/adminApi";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { getImageUrl } from "../../redux/getBaseUrl";

const EditProfile = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useProfileQuery();
  const [profileUpdate] = useUpdateProfileMutation();
  const displayedData = data ?? currentData;
  console.log(displayedData);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [imageUrl, setImageUrl] = useState(profileImage);

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  useEffect(() => {
    setImageUrl(getImageUrl() + displayedData?.data?.profile?.profileImage);
  }, [displayedData?.data?.profile]);

  const onFinish = async (values) => {
    const toastId = toast.loading("Profile is updateing...");

    const data = { ...values };
    delete data.profileImage;

    // console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    console.log(values);

    if (values?.profileImage?.fileList?.[0].originFileObj) {
      const profileImage = values.profileImage?.fileList[0]?.originFileObj;

      console.log(profileImage);
      formData.append("profileImage", profileImage);
    }

    try {
      const res = await profileUpdate({
        fromData: formData,
        userId: userInfo.profile,
      }).unwrap();

      console.log("API Response:", res);
      toast.success(res?.data?.message || "Profile Update Successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);

      toast.error(error?.data?.message || "Try Again", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div
        className="min-h-screen bg-primary-color flex justify-center items-center"
        style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
      >
        <Form
          initialValues={displayedData?.data?.profile}
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent py-10 h-full w-full lg:w-[70%]"
        >
          <h1 className="text-2xl font-bold ms-10 mb-10">Profile</h1>
          <div className="mt-12 flex items-center gap-x-4">
            <div className=" relative">
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain"
                src={imageUrl}
                alt=""
              />
              <Form.Item name="profileImage">
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload to server
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className="absolute -top-10 !right-3 text-end"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  <button className="bg-highlight-color h-9 w-9 rounded-full text-xl">
                    <EditOutlined className="bg-highlight-color text-white" />
                  </button>
                </Upload>
              </Form.Item>
            </div>
            <p className="text-5xl font-semibold -mt-16">
              {displayedData?.data?.profile?.first_name}{" "}
              {displayedData?.data?.profile?.last_name}
            </p>
          </div>

          <div className=" text-white mt-5">
            <Typography.Title level={5} style={{ color: "#222222" }}>
              First Name
            </Typography.Title>
            <Form.Item name="first_name" className="text-white">
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your first name"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>

            <Typography.Title level={5} style={{ color: "#222222" }}>
              Last Name
            </Typography.Title>
            <Form.Item name="last_name" className="text-white">
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your last name"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            {/* <Typography.Title level={5} style={{ color: "#222222" }}>
            Email
          </Typography.Title>
          <Form.Item name="email" className=" ">
            <Input
              suffix={<MdOutlineEdit />}
              type="email"
              placeholder="Enter your email"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item> */}

            <Typography.Title level={5} style={{ color: "#222222" }}>
              Address
            </Typography.Title>
            <Form.Item name="address" className="text-white">
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your address"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <div className="flex gap-5 w-full">
              <div className="flex-1">
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Zip Code
                </Typography.Title>
                <Form.Item name="zip" className="text-white">
                  <Input
                    suffix={<MdOutlineEdit />}
                    placeholder="Enter your postal code"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </div>

              <div className="flex-1">
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  City
                </Typography.Title>
                <Form.Item name="city" className="text-white">
                  <Input
                    suffix={<MdOutlineEdit />}
                    placeholder="Enter your address"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </div>
            </div>

            <Typography.Title level={5} style={{ color: "#222222" }}>
              Contact number
            </Typography.Title>
            <Form.Item name="phoneNumber" className="text-white">
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Contact number"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                htmlType="submit"
              >
                Save & Change
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
};
export default EditProfile;
