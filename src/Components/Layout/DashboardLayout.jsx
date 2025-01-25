import Topbar from "../Shared/Topbar";

// import logo from "/images/logo.png";
// import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import chat from "../../../public/images/dashboard-logo/chat.svg";
import appointment from "../../../public/images/dashboard-logo/appointment.svg";
import users from "../../../public/images/dashboard-logo/users.svg";
import assignMVR from "../../../public/images/dashboard-logo/assignMVR.svg";
import mvr from "../../../public/images/dashboard-logo/mvr.svg";
import earning from "../../../public/images/dashboard-logo/earning.svg";
import subscription from "../../../public/images/dashboard-logo/subscription.svg";
import faq from "../../../public/images/dashboard-logo/faq.svg";
import setting from "../../../public/images/dashboard-logo/setting.svg";
import profile from "../../../public/images/dashboard-logo/profile.svg";
// import logout from "../../../public/images/dashboard-logo/logout.svg";
import healthrecordinterface from "../../../public/images/dashboard-logo/healthrecordsinterface.svg";
import wellnesstrack from "../../../public/images/dashboard-logo/wellnesstracking.svg";
import calendarappointments from "../../../public/images/dashboard-logo/calendar&appointments.svg";
import cliniveapay from "../../../public/images/dashboard-logo/cliniveapay.svg";
import mvrcommunication from "../../../public/images/dashboard-logo/mvrcommunication.svg";

// import logo from "/images/logo.png";

import dashboardLogo from "../../../public/images/dashboard-logos/dashboard.svg";
import dealer from "../../../public/images/dashboard-logos/dealer.svg";
import logout from "../../../public/images/dashboard-logos/logout.svg";
import privacy from "../../../public/images/dashboard-logos/privacy.svg";
import service from "../../../public/images/dashboard-logos/service.svg";
import task from "../../../public/images/dashboard-logos/task.svg";
import terms from "../../../public/images/dashboard-logos/terms.svg";
import totalCar from "../../../public/images/dashboard-logos/total-car.svg";
import totalEarning from "../../../public/images/dashboard-logos/total-earning.svg";
import userManagement from "../../../public/images/dashboard-logos/user-management.svg";

import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";

const DashboardLayout = () => {
  const userRole = JSON.parse(localStorage.getItem("clinivea_user")); // Parse the stored JSON string

  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();

  const [collapsed, setCollapsed] = useState(false);

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const adminMenuItems = [
  //   {
  //     key: "dashboard",
  //     icon: (
  //       <img
  //         src={dashboardLogo}
  //         alt="dashboard"
  //         width={20}
  //         style={{
  //           filter: location.pathname.includes("dashboard")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="dashboard">Dashboard</NavLink>,
  //   },
  //   {
  //     key: "users",
  //     icon: (
  //       <img
  //         src={users}
  //         alt="dashboard"
  //         width={20}
  //         style={{
  //           filter: location.pathname.includes("users")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="users">User</NavLink>,
  //   },
  //   {
  //     key: "assign-mvr",
  //     icon: (
  //       <img
  //         src={assignMVR}
  //         alt="AssignMVR"
  //         width={20}
  //         style={{
  //           filter: location.pathname.includes("assign-mvr")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="assign-mvr">Assign MVR</NavLink>,
  //   },
  //   {
  //     key: "mvr",
  //     icon: <img src={mvr} alt="mvr" width={20} />,
  //     label: <span className="text-base-color">MVR</span>,
  //     children: [
  //       {
  //         key: "add-mvr",
  //         icon: <span>&#8226;</span>,
  //         label: <NavLink to="add-mvr">Add MVR</NavLink>,
  //       },
  //       {
  //         key: "all-mvr",
  //         icon: <span>&#8226;</span>,
  //         label: <NavLink to="all-mvr">MVR List</NavLink>,
  //       },
  //     ],
  //   },
  //   {
  //     key: "earning",
  //     icon: (
  //       <img
  //         src={earning}
  //         alt="warning"
  //         width={16}
  //         height={16}
  //         style={{
  //           filter: location.pathname.includes("earning")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="earning">Earning</NavLink>,
  //   },
  //   {
  //     key: "subscription",
  //     icon: (
  //       <img
  //         src={subscription}
  //         alt="subscription"
  //         width={16}
  //         height={16}
  //         style={{
  //           filter: location.pathname.includes("subscription")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="subscription">Subscription</NavLink>,
  //   },
  //   {
  //     key: "faq",
  //     icon: (
  //       <img
  //         src={faq}
  //         alt="FAQ"
  //         width={20}
  //         style={{
  //           filter: location.pathname.includes("faq")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="faq">FAQ</NavLink>,
  //   },

  //   {
  //     key: "profile",
  //     icon: (
  //       <img
  //         src={profile}
  //         alt="dashboard"
  //         width={16}
  //         height={16}
  //         style={{
  //           filter: location.pathname.includes("profile")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="profile">Profile</NavLink>,
  //   },
  //   {
  //     key: "settings",
  //     label: <span className="text-base-color"> Settings</span>,
  //     icon: <img src={setting} alt="dashboard" width={16} height={16} />,
  //     children: [
  //       {
  //         key: "change-password",
  //         icon: <span>&#8226;</span>,
  //         label: (
  //           <NavLink to="settings/change-password">Change Password</NavLink>
  //         ),
  //       },
  //       {
  //         key: "about-us",
  //         icon: <span>&#8226;</span>,
  //         label: <NavLink to="about-us">About Us</NavLink>,
  //       },
  //       {
  //         key: "terms-of-service",
  //         icon: <span>&#8226;</span>,
  //         label: <NavLink to="terms-of-service">Terms & Condition</NavLink>,
  //       },
  //       {
  //         key: "privacy-policy",
  //         icon: <span>&#8226;</span>,
  //         label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
  //       },
  //     ],
  //   },
  //   {
  //     key: "logout",
  //     icon: (
  //       <img
  //         src={logout}
  //         alt="dashboard"
  //         width={16}
  //         height={16}
  //         style={{ color: "#222222", fontSize: "16px" }}
  //       />
  //     ),
  //     label: (
  //       <div onClick={() => localStorage.removeItem("clinivea_user")}>
  //         <NavLink to="/signin">Logout</NavLink>
  //       </div>
  //     ),
  //   },
  // ];
  const adminMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={dashboardLogo}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "total-Car-Sell",
      icon: (
        <img
          src={totalCar}
          alt="total-Car-Sell"
          width={20}
          style={{
            filter: location.pathname.includes("total-Car-Sell")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="total-Car-Sell">Total Car Sell</NavLink>,
    },

    {
      key: "total-earning",
      icon: (
        <img
          src={totalEarning}
          alt="total-earning"
          width={20}
          style={{
            filter: location.pathname.includes("total-earning")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="total-earning">Total Earning </NavLink>,
    },

    {
      key: "service-price",
      icon: (
        <img
          src={service}
          alt="service-price"
          width={20}
          style={{
            filter: location.pathname.includes("service-price")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="service-price">Service Price</NavLink>,
    },

    {
      key: "user-management",
      icon: (
        <img
          src={userManagement}
          alt="user-management"
          width={20}
          style={{
            filter: location.pathname.includes("user-management")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="user-management">User Management</NavLink>,
    },
    {
      key: "dealer-management",
      icon: (
        <img
          src={dealer}
          alt="dealer-management"
          width={20}
          style={{
            filter: location.pathname.includes("dealer-management")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dealer-management">Dealer Management</NavLink>,
    },
    {
      key: "task-management",
      icon: (
        <img
          src={task}
          alt="task-management"
          width={20}
          style={{
            filter: location.pathname.includes("task-management")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="task-management">Task Management</NavLink>,
    },

    {
      key: "settings",
      label: <span className="text-base-color"> Settings</span>,
      icon: <img src={setting} alt="dashboard" width={16} height={16} />,
      children: [
        {
          key: "change-password",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="settings/change-password">Change Password</NavLink>
          ),
        },
        {
          key: "about-us",
          icon: <span>&#8226;</span>,
          label: <NavLink to="about-us">About Us</NavLink>,
        },
        // {
        //   key: "terms-of-service",
        //   icon: <span>&#8226;</span>,
        //   label: <NavLink to="terms-of-service">Terms & Condition</NavLink>,
        // },
        // {
        //   key: "privacy-policy",
        //   icon: <span>&#8226;</span>,
        //   label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
        // },
      ],
    },

    {
      key: "terms-of-service",
      icon: (
        <img
          src={terms}
          alt="terms-of-service"
          width={20}
          style={{
            filter: location.pathname.includes("terms-of-service")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="terms-of-service">Terms & Conditions</NavLink>,
    },
    {
      key: "privacy-policy",
      icon: (
        <img
          src={privacy}
          alt="privacy-policy"
          width={20}
          style={{
            filter: location.pathname.includes("privacy-policy")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
    },

    {
      key: "logout",
      icon: (
        <img
          src={logout}
          alt="dashboard"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div onClick={() => localStorage.removeItem("clinivea_user")}>
          <NavLink to="/signin">Logout</NavLink>
        </div>
      ),
    },
    {
      key: "profile",
      icon: (
        <img
          src={profile}
          alt="dashboard"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("profile")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="profile">Profile</NavLink>,
    },

    {
      key: "mvr",
      icon: <img src={mvr} alt="mvr" width={20} />,
      label: <span className="text-base-color">MVR</span>,
      children: [
        {
          key: "add-mvr",
          icon: <span>&#8226;</span>,
          label: <NavLink to="add-mvr">Add MVR</NavLink>,
        },
        {
          key: "all-mvr",
          icon: <span>&#8226;</span>,
          label: <NavLink to="all-mvr">MVR List</NavLink>,
        },
      ],
    },

    {
      key: "earning",
      icon: (
        <img
          src={earning}
          alt="warning"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("earning")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="earning">Earning</NavLink>,
    },
    {
      key: "subscription",
      icon: (
        <img
          src={subscription}
          alt="subscription"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("subscription")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="subscription">Subscription</NavLink>,
    },
  ];

  const mvrMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={dashboardLogo}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "appointment",
      icon: (
        <img
          src={appointment}
          alt="Appointment"
          width={20}
          style={{
            filter: location.pathname.includes("appointment")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="appointment">Appointment</NavLink>,
    },
    {
      key: "chat",
      icon: (
        <img
          src={chat}
          alt="Chat"
          width={20}
          style={{
            filter: location.pathname.includes("chat")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="chat">Chat</NavLink>,
    },
    {
      key: "profile",
      icon: (
        <img
          src={profile}
          alt="profile"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("profile")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="profile">Profile</NavLink>,
    },
    {
      key: "settings",
      label: <span className="text-base-color"> Settings</span>,
      icon: <img src={setting} alt="dashboard" width={16} height={16} />,
      children: [
        {
          key: "change-password",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="settings/change-password">Change Password</NavLink>
          ),
        },
      ],
    },
    {
      key: "logout",
      icon: (
        <img
          src={logout}
          alt="logout"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div onClick={() => localStorage.removeItem("clinivea_user")}>
          <NavLink to="/signin">Logout</NavLink>
        </div>
      ),
    },
  ];
  const userMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={dashboardLogo}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },

    {
      key: "healthrecord",
      icon: (
        <img
          src={healthrecordinterface}
          alt="Healthrecord"
          width={20}
          style={{
            filter: location.pathname.includes("healthrecord")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="healthrecord">Health Records Interface</NavLink>,
    },

    {
      key: "cliniveapay",
      icon: (
        <img
          src={cliniveapay}
          alt="cliniveapay"
          width={20}
          style={{
            filter: location.pathname.includes("cliniveapay")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="cliniveapay">Clinivea Pay</NavLink>,
    },

    {
      key: "mvrcommunication",
      icon: (
        <img
          src={mvrcommunication}
          alt="mvrcommunication"
          width={20}
          style={{
            filter: location.pathname.includes("mvrcommunication")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="mvrcommunication">MVR Communication</NavLink>,
    },

    {
      key: "calendarappointments",
      icon: (
        <img
          src={calendarappointments}
          alt="calendarappointments"
          width={20}
          style={{
            filter: location.pathname.includes("calendarappointments")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: (
        <NavLink to="calendarappointments">Calendar & Appointments</NavLink>
      ),
    },

    {
      key: "wellnesstrack",
      icon: (
        <img
          src={wellnesstrack}
          alt="wellnesstrack"
          width={20}
          style={{
            filter: location.pathname.includes("wellnesstrack")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: (
        <NavLink to="wellnesstrack">
          Actionable Insights and Wellness Tracking
        </NavLink>
      ),
    },

    {
      key: "profile",
      icon: (
        <img
          src={profile}
          alt="profile"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("profile")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="profile">Profile</NavLink>,
    },

    {
      key: "settings",
      label: <span className="text-base-color"> Settings</span>,
      icon: <img src={setting} alt="dashboard" width={16} height={16} />,
      children: [
        {
          key: "change-password",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="settings/change-password">Change Password</NavLink>
          ),
        },
      ],
    },
    {
      key: "logout",
      icon: (
        <img
          src={logout}
          alt="logout"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div onClick={() => localStorage.removeItem("clinivea_user")}>
          <NavLink to="/signin">Logout</NavLink>
        </div>
      ),
    },
  ];

  // Select the appropriate menu items based on user role
  const menuItems =
    userRole?.role === "admin"
      ? adminMenuItems
      : userRole?.role === "mvr"
      ? mvrMenuItems
      : userMenuItems;

  return (
    <div className="h-screen bg-white ">
      <Layout className="!relative !bg-white">
        <Sider
          width={240}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 5px #00000040",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              width={150}
              height={150}
              className="my-7 mx-auto"
            />
          </Link>

          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            selectedKeys={pathSegment}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 2,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-white px-2 xl:px-5 py-4 xl:py-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
