import { Link } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import AppointmentTable from "../Components/Tables/AppointmentTable";
import LabResultCard from "../Components/Dashboard/UserDashboard/LabResultCard";
import RewardPoints from "../Components/Dashboard/UserDashboard/RewardPoints";
import RecentChat from "../Components/Dashboard/UserDashboard/RecentChat";

// import Line_Chart from "../Chart/LineChart";

const UserDashboardPage = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [appointmentLoading, setAppointmentLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get("/data/appointmentData.json");
        const recentData = response.data?.slice(0, 5);

        setAppointmentData(recentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setAppointmentLoading(false);
      }
    };

    fetchAppointmentData();
  }, []);

  return (
    <div className="w-full min-h-[90vh] px-1 sm:px-2 lg:px-2">
      <>
        <h1 className="text-[24px] text-[#F5382C] text-center py-[22px]">
          Personalized greeting based on the time of day and key healthcare
          reminders.
        </h1>
        <div className="grid xl:grid-cols-5 lg:grid-cols-2 gap-5 grid-cols-1 items-stretch">
          {/* <Line_Chart /> */}
          <div className="xl:col-span-2">
            <LabResultCard />
          </div>
          <div>
            <RewardPoints />
          </div>

          <div className="xl:col-span-2">
            <RecentChat />
          </div>
        </div>
        <div
          className="flex flex-col lg:flex-row gap-4 mt-5 p-5 rounded"
          style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
        >
          <div className="bg-[#FFFFFF] rounded flex-1">
            <div className="flex justify-between items-center mx-3 py-2">
              <p className="text-2xl font-semibold text-base-color">
                Appointment
              </p>
              <div>
                <Link to="/user/calendarappointments">
                  <p className="text-lg text-base-color underline">view all</p>
                </Link>
              </div>
            </div>
            <AppointmentTable
              data={appointmentData}
              loading={appointmentLoading}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default UserDashboardPage;
