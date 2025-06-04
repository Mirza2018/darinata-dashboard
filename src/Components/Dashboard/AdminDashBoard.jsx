
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import { useCustomerMapQuery, useTotalCountQuery, useTotalSalesChartQuery } from "../../redux/api/adminApi";
import CustomerMap from "../MainDashBoardPage/CustomerMap";
import TotalRevenue from "../MainDashBoardPage/Totalrevenue";

const AdminDashboard = () => {
  const { data: totalCount } = useTotalCountQuery();
  // console.log(totalCount);
  const { data: customerMap } = useCustomerMapQuery();
  // console.log(customerMap);
  const { data: totalSalesChart } = useTotalSalesChartQuery();
  console.log(totalSalesChart);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            <div className="flex-1">
              <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div
                  className="flex 
                 gap-2 xl:gap-4 items-center"
                >
                  <div className="p-3 rounded-full bg-[#00B07426]  w-fit">
                    <img src={AllIcons.sell} className="h-10 w-10" alt="" />
                  </div>
                  <div className="text-start">
                    <p className="text-4xl font-bold mb-1">
                      {totalCount?.data?.totalSell}
                    </p>
                    <p className="text-base font-normal ">Total Car Sell</p>
                    {/* <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                      <img src={AllIcons.upArrow} className="h-10 w-4" alt="" />
                      4% (30 days)
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div
                  className="flex 
                 gap-2 xl:gap-4 items-center"
                >
                  <div className="p-3 rounded-full bg-[#00B07426]  w-fit">
                    <img src={AllIcons.car} className="h-10 w-10" alt="" />
                  </div>
                  <div className="text-start">
                    <p className="text-4xl font-bold mb-1">
                      {totalCount?.data?.totalSold}
                    </p>
                    <p className="text-base font-normal ">Total Sold Car</p>
                    {/* <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                      <img src={AllIcons.upArrow} className="h-10 w-4" alt="" />
                      2% (25 days)
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div>
              <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div
                  className="flex 
                 gap-2 xl:gap-4 items-center"
                >
                  <div className="p-3 rounded-full bg-[#00B07426]  w-fit">
                    <img src={AllIcons.revenue} className="h-10 w-10" alt="" />
                  </div>
                  <div className="text-start">
                    <p className="text-4xl font-bold mb-1">$128</p>
                    <p className="text-base font-normal ">Total Revenue</p>
                    <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                      <img src={AllIcons.upArrow} className="h-10 w-4" alt="" />
                      4% (30 days)
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex-1">
              <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div
                  className="flex 
                 gap-2 xl:gap-4 items-center"
                >
                  <div className="p-3 rounded-full bg-[#00B07426]  w-fit">
                    <img
                      src={AllIcons.totalUser}
                      className="h-10 w-10"
                      alt=""
                    />
                  </div>
                  <div className="text-start">
                    <p className="text-4xl font-bold mb-1">
                      {totalCount?.data?.totalUser}
                    </p>
                    <p className="text-base font-normal ">Total User</p>
                    {/* <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                      <img src={AllIcons.upArrow} className="h-10 w-4" alt="" />
                      4% (30 days)
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div
                  className="flex 
                 gap-2 xl:gap-4 items-center"
                >
                  <div className="p-3 rounded-full bg-[#00B07426]  w-fit">
                    <img src={AllIcons.dealer} className="h-10 w-10" alt="" />
                  </div>
                  <div className="text-start">
                    <p className="text-4xl font-bold mb-1">
                      {totalCount?.data?.totalDealer}
                    </p>
                    <p className="text-base font-normal ">Total Dealer</p>
                    {/* <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                      <img src={AllIcons.upArrow} className="h-10 w-4" alt="" />
                      25% (30 days)
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="">
            {/* <React.Fragment>
              <PieCharts />
            </React.Fragment> */}
            {/* <React.Fragment>
              <OrderChart />
            </React.Fragment> */}
            <TotalRevenue totalSalesChart={totalSalesChart} />
          </div>
          <div className="">
            {/* <div className="xl:col-span-2">
              <TotalRevenue />
            </div> */}
            <React.Fragment>
              <CustomerMap customerMap={customerMap} />
            </React.Fragment>
          </div>

          {/*           
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
          </div> */}

          {/* <div className="flex flex-col lg:flex-row gap-4 mt-5">
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
          </div> */}
        </div>
        {/* <ViewUserModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        /> */}
        {/* <DeleteUserModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        /> */}
      </>
    </div>
  );
};

export default AdminDashboard;
