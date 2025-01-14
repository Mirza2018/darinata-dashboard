/ eslint-disable no-unused-vars /
import { Button, Form, Input, Typography, Upload } from "antd";
import profileImage from "/images/profileImage.png";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";

const EditProfile = () => {
  const profileData = {
    fullname: "James Mitchell",
    email: "emily@gmail.com",
    address: "Vancouver, BC VG1Z4, Canada",
    contactNumber: "+99-01846875456",
  };

  const [imageUrl, setImageUrl] = useState(profileImage);

  const handleImageUpload = (info)=> {
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

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(imageUrl);
  };

  return (
    <div
      className="min-h-screen bg-primary-color flex justify-center items-center"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent py-10 text-base-color h-full w-full lg:w-[70%]"
      >
        <div className="mt-12 flex items-center gap-x-4">
          <div className=" relative">
            <img
              className="h-40 w-40 relative rounded-full border border-secondary-color object-contain"
              src={imageUrl}
              alt=""
            />
            <Form.Item name="image">
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
                <Button
                  style={{
                    zIndex: 1,
                    opacity: 1,
                    height: "36px",
                    width: "36px",
                    borderRadius: "90px",
                    fontSize: "18px",
                  }}
                >
                  <EditOutlined style={{ color: "#f5382c" }} />
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <p className="text-5xl font-semibold -mt-16">James Mitchell</p>
        </div>

        <div className=" text-white mt-5">
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Email
          </Typography.Title>
          <Form.Item
            initialValue={profileData.email}
            name="email"
            className="text-white "
          >
            <Input
              suffix={<MdOutlineEdit />}
              type="email"
              placeholder="Enter your email"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Full Name
          </Typography.Title>
          <Form.Item
            initialValue={profileData.fullname}
            name="fullname"
            className="text-white"
          >
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Enter your Name"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Address
          </Typography.Title>
          <Form.Item
            initialValue={profileData.address}
            name="address"
            className="text-white"
          >
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Enter your address"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Contact number
          </Typography.Title>
          <Form.Item
            initialValue={profileData.contactNumber}
            name="contactNumber"
            className="text-white"
          >
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Enter your Contact number"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
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