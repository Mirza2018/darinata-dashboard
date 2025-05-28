/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import user from "/images/user.png";
import profileImage from "/images/profileImage.png";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../redux/getBaseUrl";
import { useProfileQuery } from "../../redux/api/adminApi";

const notifications = [
  {
    id: 1,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 2,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 3,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 4,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 5,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
];

const Topbar = ({ collapsed, setCollapsed }) => {
  const [myImage, setImageUrl] = useState(profileImage);
    const { data, currentData, isLoading, isFetching, isSuccess } =
      useProfileQuery();
    const displayedData = data ?? currentData;
  useEffect(() => {
    setImageUrl(getImageUrl() + displayedData?.data?.profile?.profileImage);
  }, [displayedData?.data?.profile]);
  const user = JSON.parse(localStorage.getItem("clinivea_user"));
  const [notificationCount, setNotificationCount] = useState(
    notifications.length
  );

  const handleMenuClick = () => {
    setNotificationCount(0); // Reset notification count when the menu is clicked
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white shadow-xl p-4 rounded-lg"
      onClick={handleMenuClick}
    >
      {notifications.map((notification) => (
        <div className="test-start" key={notification.id}>
          <div className="flex gap-2">
            <BellFilled style={{ color: "#FF9500" }} />
            <div className="flex flex-col items-start">
              <p>{notification.message}</p>
              <p className="text-gray-400">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
      <Link
        to={`/admin/notifications`}
        className="w-2/3 mx-auto bg-highlight-color text-white rounded h-8 py-1 cursor-pointer hover:text-white"
      >
        See More
      </Link>
    </div>
  );
  return (
    <div className="pt-4 mx-[-50px] flex justify-between items-center bg-[#ffffff] ">
      <div className="flex items-center gap-2 text-text-color ml-4">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl"
        />
      </div>
      <div className="flex items-center justify-center mr-5">
        <Link
          to="profile"
          className="flex items-center justify-center gap-5 bg-transparent text-base-color border-0 rounded-lg h-8 px-2 py-1  mr-5"
        >
          <p className="text-text-color text-base font-semibold">
            {" "}
            <span className="text-text-light-color font-normal">Hello, </span>
            {displayedData?.data?.profile?.first_name}{" "}
            {displayedData?.data?.profile?.last_name}
          </p>
          <img
            src={myImage}
            alt="profile_pic"
            style={{ width: "45px", height: "45px", marginRight: "10px" }}
            className="rounded-full"
          />
        </Link>
        {/* <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <BellFilled
            shape="circle"
            size="small"
            className=" py-4 px-2 rounded-full border border-secondary-color  h-6 text-base font-bold !text-highlight-color"
          />
        </Dropdown> */}
      </div>
    </div>
  );
};
export default Topbar;
