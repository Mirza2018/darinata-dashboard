/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, useNavigate } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";

import AllUsers from "../Dashboard/Users/Users";
import AssignMVR from "../Dashboard/AssignMVR/AssignMVR";
import SingleAssignMVR from "../Dashboard/AssignMVR/SingleAssignMVR";
import AddMVR from "../Dashboard/MVR/AddMVR";
import AllMVR from "../Dashboard/MVR/AllMVR";
import Subscription from "../Dashboard/Subscription/Subscription";
import FAQ from "../Dashboard/FAQ/FAQ";

import Profile from "../../Pages/Profile/Profile";
import EditProfile from "../../Pages/Profile/EditProfile";

import SignIn from "../../Pages/Auth/SignIn";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";
import OtpPage from "../../Pages/Auth/OtpPage";
import SettingsChangePassword from "../Dashboard/settings/SettingsChangePassword";
import SettingsForgotPassword from "../Dashboard/settings/SettingsForgotPassword";
import SettingsOtpPage from "../Dashboard/settings/SettingsOtpPage";
import SettingsUpdatePassword from "../Dashboard/settings/SettingsUpdatePassword";
import Logout from "../Dashboard/Logout";

import TermsOfService from "../Dashboard/settings/TermsOfService";
import AboutUs from "../Dashboard/settings/AboutUs";
import PrivacyPolicy from "../Dashboard/settings/PrivacyPolicy";

import Notifications from "../Dashboard/Notifications";
import Earning from "../Dashboard/Earning/Earning";
import Appointment from "../Dashboard/Appointment/Appointment";
import Chat from "../Dashboard/Chat/Chat";
import { useEffect } from "react";
import Loading from "../UI/Loading";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../Dashboard/AdminDashBoard";
import MvrDashboard from "../Dashboard/MvrDashBoard";
import CalendarappointmentsPage from "../Dashboard/Calendarappointments/CalendarappointmentsPage";
import UserDashboardPage from "../../Pages/UserDashboardPage";
import MedicalHistory from "../Dashboard/UserHealthRecord/MedicalHistory";
import UserHealthRecoardPage from "../../Pages/UserHealthRecoardPage";
import ActionableWellnessTracking from "../../Pages/ActionableWellnessTracking";
import CliniveaPayPage from "../../Pages/CliniveaPayPage";
import CarSellTable from "../TotalCarSellPage/CarSellTable";
import DelarManagementMainPage from "../DelarManagementPage/DelarManagementMainPage";
import EarningTable from "../TotalEarningPage/EarningTable";
import TotalEarning from "../TotalEarningPage/TotalEarning";
import UserManagement from "../UserManagement/UserManagement";
import ServicePrice from "../ServicePricePage/ServicePrice";
import TaskManagement from "../TaskManagementPage/TaskManagement";
import SingleUserManagement from "../UserManagement/SingleUserManagement";
import SingleDealer from "../DelarManagementPage/SingleDealerPage/SingleDealer";
import ContractData from "../DelarManagementPage/SingleDealerPage/ContractData";
import UserCarInfo from "../UserManagement/UserCarInfo";

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("clinivea_user"));
    if (user && user.role) {
      navigate(`/${user.role}/dashboard`, { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  // Optionally display a loading indicator
  return <Loading />;
}

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "total-Car-Sell",
        element: <CarSellTable />,
      },
      {
        path: "total-earning",
        element: <TotalEarning />,
      },
      {
        path: "service-price",
        element: <ServicePrice />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "user-management/car-info",
        element: <UserCarInfo />,
      },
      {
        path: "dealer-management",
        element: <DelarManagementMainPage />,
      },
      {
        path: "user-management/:id",
        element: <SingleUserManagement />,
      },

      {
        path: "dealer-management/:id",
        element: <SingleDealer />,
      },
      {
        path: "dealer-management/:id/contract/:id",
        element: <ContractData />,
      },

      {
        path: "task-management",
        element: <TaskManagement />,
      },

      {
        path: "subscription",
        element: <Subscription />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit-profile",
        element: <EditProfile />,
      },

      {
        path: "settings/forgot-password",
        element: <SettingsForgotPassword />,
      },
      {
        path: "settings/change-password",
        element: <SettingsChangePassword />,
      },
      {
        path: "settings/update-password",
        element: <SettingsUpdatePassword />,
      },
      {
        path: "settings/otp-page",
        element: <SettingsOtpPage />,
      },

      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "mvr",
    element: (
      <ProtectedRoute role="mvr">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <MvrDashboard />,
      },
      {
        path: "appointment",
        element: <Appointment />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit-profile",
        element: <EditProfile />,
      },

      {
        path: "settings/forgot-password",
        element: <SettingsForgotPassword />,
      },
      {
        path: "settings/change-password",
        element: <SettingsChangePassword />,
      },
      {
        path: "settings/update-password",
        element: <SettingsUpdatePassword />,
      },
      {
        path: "settings/otp-page",
        element: <SettingsOtpPage />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "user",
    element: (
      <ProtectedRoute role="user">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <UserDashboardPage />,
      },
      {
        path: "healthrecord",
        element: <UserHealthRecoardPage />,
      },
      {
        path: "cliniveapay",
        element: <CliniveaPayPage />,
      },
      {
        path: "mvrcommunication",
        element: <Chat />,
      },
      {
        path: "calendarappointments",
        element: <CalendarappointmentsPage />,
      },

      {
        path: "wellnesstrack",
        element: <ActionableWellnessTracking />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit-profile",
        element: <EditProfile />,
      },

      {
        path: "settings/forgot-password",
        element: <SettingsForgotPassword />,
      },
      {
        path: "settings/change-password",
        element: <SettingsChangePassword />,
      },
      {
        path: "settings/update-password",
        element: <SettingsUpdatePassword />,
      },
      {
        path: "settings/otp-page",
        element: <SettingsOtpPage />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },

  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verify-otp",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
]);

export default router;
