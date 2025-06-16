import Topbar from "../Shared/Topbar";
import setting from "../../../public/images/dashboard-logo/setting.svg";
import contract from "../../../public/images/dashboard-logos/contract.svg";
import dashboardLogo from "../../../public/images/dashboard-logos/dashboard.svg";
import dealer from "../../../public/images/dashboard-logos/dealer.svg";
import logout from "../../../public/images/dashboard-logos/logout.svg";
import privacy from "../../../public/images/dashboard-logos/privacy.svg";
import service from "../../../public/images/dashboard-logos/service.svg";
import terms from "../../../public/images/dashboard-logos/terms.svg";
import totalCar from "../../../public/images/dashboard-logos/total-car.svg";
import totalEarning from "../../../public/images/dashboard-logos/total-earning.svg";
import userManagement from "../../../public/images/dashboard-logos/user-management.svg";

import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { clearAuth } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const DashboardLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();

  const [collapsed, setCollapsed] = useState(false);

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

  const currentPath = location.pathname;
  const activeKeys = (() => {
    if (currentPath.includes("/dashboard")) {
      return ["dashboard"];
    }
    if (currentPath.includes("/every-contract")) {
      return ["every-contract"];
    }
    if (currentPath.includes("/all-cars")) {
      return ["all-cars"];
    }
    if (currentPath.includes("/total-Car-Sell")) {
      return ["total-Car-Sell"];
    }
    if (currentPath.includes("/total-earning")) {
      return ["total-earning"];
    }
    if (currentPath.includes("/service-price")) {
      return ["service-price"];
    }
    if (currentPath.includes("/user-management")) {
      return ["user-management"];
    }
    if (currentPath.includes("/dealer-management")) {
      return ["dealer-management"];
    }
    if (currentPath.includes("/task-management")) {
      return ["task-management"];
    }
    if (
      currentPath.includes("/change-password") ||
      currentPath.includes("/profile") ||
      currentPath.includes("/forgot-password") ||
      currentPath.includes("/update-password") ||
      currentPath.includes("/otp-page")
    ) {
      return ["change-password"];
    }
    if (currentPath.includes("/terms-of-service")) {
      return ["terms-of-service"];
    }
    if (currentPath.includes("/privacy-policy")) {
      return ["privacy-policy"];
    }

    return [currentPath.split("/")[1]]; // Default fallback
  })();
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
      key: "every-contract",
      icon: (
        <img
          src={contract}
          alt="every-contract"
          width={20}
          style={{
            filter: location.pathname.includes("every-contract")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="every-contract">Every Contract</NavLink>,
    },
    {
      key: "all-cars",
      icon: (
        <img
          src={totalCar}
          alt="all-cars"
          width={20}
          style={{
            filter: location.pathname.includes("all-cars")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="all-cars">All Cars</NavLink>,
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
          src={AllImages.task}
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
      key: "change-password",
      icon: (
        <img
          src={setting}
          alt="change-password"
          width={20}
          style={{
            filter:
              location.pathname.includes("change-password") ||
              location.pathname.includes("forgot-password") ||
              location.pathname.includes("update-password") ||
              location.pathname.includes("otp-page") ||
              location.pathname.includes("/profile")
                ? "brightness(0) invert(1)"
                : undefined,
          }}
        />
      ),
      label: <NavLink to="settings/change-password">settings</NavLink>,
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
        <div
          onClick={() => {
            dispatch(clearAuth());
            navigate("/signin");
          }}
        >
          <p>Logout</p>
        </div>
      ),
    },
  ];

  const menuItems = adminMenuItems;
  // userRole?.role === "admin" ? adminMenuItems : userRole?.role === "mvr";

  return (
    <div className="h-screen bg-white ">
      <Layout className="!relative !bg-white">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
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
            selectedKeys={activeKeys}
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
