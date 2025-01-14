import { Form, Input, Typography } from "antd";
import profileImage from "/images/profileImage.png";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Profile = () => {
  const profileData = {
    fullname: "James Mitchell",
    email: "emily@gmail.com",
    address: "Vancouver, BC VG1Z4, Canada",
    contactNumber: "+99-01846875456",
  };

  return (
    <div
      className="min-h-screen bg-primary-color flex justify-center items-center"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="py-10 text-base-color rounded-lg h-full w-full lg:w-[70%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-8">
            <img className="h-40 w-40 relative" src={profileImage} alt="" />
            <p className="text-5xl font-semibold">{profileData.fullname}</p>
          </div>
          <Link to="edit-profile" className="hover:text-primary-color">
            <div className="mt-10 bg-secondary-color px-5 py-3 rounded-lg">
              <div className="flex gap-1">
                <EditOutlined style={{ color: "#FAFAFA" }} />
                <p className="text-primary-color">Edit Profile</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center text-white mt-5">
          <Form layout="vertical" className="bg-transparent p-4 w-full">
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item className="text-white ">
              <Input
                value={profileData.email}
                readOnly
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Full Name
            </Typography.Title>
            <Form.Item className="text-white">
              <Input
                readOnly
                value={profileData.fullname}
                placeholder="Enter your full name"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Address
            </Typography.Title>
            <Form.Item className="text-white">
              <Input
                readOnly
                value={profileData.address}
                placeholder="Enter your contact number"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Contact Number
            </Typography.Title>
            <Form.Item className="text-white">
              <Input
                readOnly
                value={profileData.contactNumber}
                placeholder="Enter your contact number"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
