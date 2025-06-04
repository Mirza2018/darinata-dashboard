import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllIcons } from "../../../public/images/AllImages";
import { useDealerDetailsQuery } from "../../redux/api/adminApi";
import UserCarTable from "./UserCarTable";
import ViewUserCarBlockModal from "./ViewUserCarBlockModal";

const SingleUserManagement = () => {
  const params = useParams();
  const { data: dealerData, isLoading } = useDealerDetailsQuery(params);
  console.log(dealerData?.data?.meta?.total);
  const [data, setData] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const handleCancel = () => {
    setIsViewModalVisible(false); 
    //    setIsDeleteModalVisible(false);
  };

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
        const filteredData = response?.data?.find(
          (item) => item._id === params.id
        );

        setData(filteredData.myCars);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <div className="px-2 lg:px-6">
        {/* Card Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 my-10">
          <div>
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
                    {dealerData?.data?.meta?.total}
                  </p>
                  <p className="text-base font-normal ">Total Car List</p>
                 
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
                  <img src={AllIcons.car} className="h-10 w-10" alt="" />
                </div>
                <div className="text-start">
                  <p className="text-4xl font-bold mb-1">1</p>
                  <p className="text-base font-normal ">Unsold Total Car</p>
                  <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                    <img src={AllIcons.upArrow} className="h-10 w-4" alt="" />
                    2% (25 days)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
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
        </div>
        <UserCarTable
          data={dealerData?.data?.result}
          loading={isLoading}
          showViewModal={showViewModal}
          // showDeleteModal={showDeleteModal}
          pageSize={12}
        />

        <ViewUserCarBlockModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          //   handleBlock={handleBlock}
        />
      </div>
    </div>
  );
};

export default SingleUserManagement;
