import { ConfigProvider, Select } from "antd";
import Area_Chart from "../Chart/AreaChart";
import Bar_Chart from "../Chart/BarChart";
import { GrTransaction } from "react-icons/gr";
import { Link } from "react-router-dom";

import { AllIcons } from "../../../public/images/AllImages";
import { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "../Tables/UsersTable";
import ViewUserModal from "../UI/ViewUserModal";
import DeleteUserModal from "../UI/DeleteUserModal";


const AdminDashboard = () => {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);



  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Show Delete Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
        const recentData = response.data?.slice(0, 5);

        setData(recentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (data) => {
    // Handle delete action here
    console.log({ id: data?.id, userName: data?.userName });
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  const handleBlock = (data) => {
    console.log("Blocked User:", { id: data?.id, userName: data?.userName });
    setIsViewModalVisible(false);
  };

  return (
    <div className="w-full min-h-[90vh] px-1 sm:px-2 lg:px-2">

        <>
          <div>
            {/* Card Items */}
            <div className="flex flex-col sm:flex-row gap-1 lg:gap-5">
              <div className="flex gap-5 flex-wrap rounded-lg bg-secondary-color py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-4 items-center">
                  <div className="p-3 rounded-full bg-[#F76056] w-fit">
                    <img src={AllIcons.girl} className="h-10 w-10" alt="" />
                  </div>
                  <div className="text-start">
                    <p className="text-xs lg:text-base xl:text-2xl text-primary-color mb-1">
                      Total User
                    </p>
                    <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                      1500
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 flex-wrap rounded-lg bg-secondary-color py-2 px-1 xl:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-4 items-center">
                  <div className="p-3 rounded-full bg-[#F76056] w-fit">
                    <img src={AllIcons.person} className="h-10 w-10" alt="" />
                  </div>
                  <div className="text-start">
                    <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                      Total MVR
                    </p>
                    <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                      1500
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 flex-wrap rounded-lg bg-secondary-color py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-4 items-center">
                  <div className="p-3 rounded-full bg-[#F76056] w-fit">
                    <img
                      src={AllIcons.incomeAmount}
                      className="h-10 w-10"
                      alt=""
                    />
                  </div>
                  <div className="text-start">
                    <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                      Total Voucher
                    </p>
                    <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                      $1500
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 flex-wrap rounded-lg bg-secondary-color py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-4 items-center">
                  <GrTransaction className="bg-[#F76056] rounded-full h-8 lg:h-10 xl:h-16 w-8 lg:w-10 xl:w-16 flex items-center justify-center text-primary-color p-1 lg:p-2" />
                  <div className="text-start">
                    <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                      Total Transaction
                    </p>
                    <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                      $ 000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mt-8">
              <div
                className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg"
                style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
              >
                <div className="flex justify-between text-base-color mt-4">
                  <p className="text-2xl sm:text-3xl mb-5">User Overview</p>
                  <div>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            fontSize: 16,
                            colorBorder: "#222222",
                          },
                        },
                      }}
                    >
                      <Select
                        defaultValue="2024"
                        style={{ width: 80 }}
                        options={[
                          { value: "2024", label: "2024" },
                          { value: "2023", label: "2023" },
                          { value: "2022", label: "2022" },
                          { value: "2021", label: "2021" },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                </div>
                <div>
                  <Area_Chart />
                </div>
              </div>

              <div
                className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg flex flex-col"
                style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
              >
                <div className="flex justify-between text-base-color mt-4">
                  <p className="text-2xl sm:text-3xl mb-5">Income Overview</p>
                  <div>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            fontSize: 16,
                            colorBorder: "#222222",
                          },
                        },
                      }}
                    >
                      <Select
                        defaultValue="2024"
                        style={{ width: 80 }}
                        options={[
                          { value: "2024", label: "2024" },
                          { value: "2023", label: "2023" },
                          { value: "2022", label: "2022" },
                          { value: "2021", label: "2021" },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                </div>
                <hr />
                <div>
                  <Bar_Chart />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-5">
              <div
                className="bg-[#FFFFFF] rounded flex-1 p-3"
                style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
              >
                <div className="flex justify-between items-center mx-3 py-2">
                  <p className="text-2xl font-semibold text-base-color">
                    Recent users
                  </p>
                  <div>
                    <Link to="/users">
                      <p className="text-lg text-base-color underline">
                        view all
                      </p>
                    </Link>
                  </div>
                </div>
                <UsersTable
                  data={data}
                  loading={loading}
                  showViewModal={showViewModal}
                  showDeleteModal={showDeleteModal}
                />
              </div>
            </div>
          </div>
          <ViewUserModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
            handleBlock={handleBlock}
          />
          <DeleteUserModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </>
      
    </div>
  );
};

export default AdminDashboard;
