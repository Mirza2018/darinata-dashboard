import { EditOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useProfileQuery } from "../../redux/api/adminApi";
import { getImageUrl } from "../../redux/getBaseUrl";
import profileImage from "/images/profileImage.png";

const Profile = () => {
  const [myImage, setImageUrl] = useState(profileImage);
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useProfileQuery();
  const displayedData = data ?? currentData;

  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    setImageUrl(getImageUrl() + displayedData?.data?.profile?.profileImage);
  }, [displayedData?.data?.profile]);

  return (
    <div
      className="min-h-screen bg-primary-color flex justify-center items-center"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="py-10 rounded-lg h-full w-full lg:w-[70%]">
        <h1 className="text-2xl font-bold ms-10 mb-10">Profile</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-8">
            <img className=" w-40 aspect-square object-contain rounded-full ring-1 relative" src={myImage} alt="" />
            <p className="text-5xl font-semibold">
              {displayedData?.data?.profile?.first_name}{" "}
              {displayedData?.data?.profile?.last_name}
            </p>
          </div>
          <Link to="edit-profile" className="hover:text-blue-500">
            <div className="mt-10 bg-base-color border border-secondary-color  px-5 py-3 rounded-lg">
              <div className="flex gap-1 whitespace-nowrap">
                <EditOutlined style={{ color: "#000" }} />
                <p className=" whitespace-nowrap">Edit Profile</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center text-white mt-5">
          <Form
            initialValues={displayedData?.data?.profile}
            layout="vertical"
            className="bg-transparent p-4 w-full"
          >
            <Typography.Title level={5} style={{ color: "#222222" }}>
              First Name
            </Typography.Title>
            <Form.Item className="text-white" name="first_name">
              <Input
                readOnly
                placeholder="Enter your first name"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Last Name
            </Typography.Title>
            <Form.Item name="last_name" className="text-white">
              <Input
                readOnly
                placeholder="Enter your last name"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item className="text-white ">
              <Input
                readOnly
                value={userInfo?.email}
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>

            <Typography.Title level={5} style={{ color: "#222222" }}>
              Address
            </Typography.Title>
            <Form.Item name="address" className="text-white">
              <Input
                readOnly
                placeholder="Enter your contact number"
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
                    readOnly
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
                    readOnly
                    placeholder="Enter your city"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </div>
            </div>

            <Typography.Title level={5} style={{ color: "#222222" }}>
              Contact Number
            </Typography.Title>
            <Form.Item name="phoneNumber" className="text-white">
              <Input
                readOnly
                placeholder="Enter your contact number"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
