import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDealerDetailsQuery } from "../../../redux/api/adminApi";
import SingleDealerTable from "./SingleDealerTable";
import ViewDealerChat from "./ViewDealerChat";
// import UserCarTable from "./UserCarTable";
// import ViewUserCarBlockModal from "./ViewUserCarBlockModal";

const SingleDealer = () => {
  const params = useParams(); 
  // console.log(params);
  const { data: dealerData,isLoading } = useDealerDetailsQuery(params)
// console.log(dealerData);


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
        const response = await axios.get("/data/dealerData.json");
        const filteredData = response?.data?.find(
          (item) => item._id === params.id
        );

        setData(filteredData?.dealerCars);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("single data",data);

  return (
    <div>
      <div className="px-2 lg:px-6">
        <SingleDealerTable
          data={dealerData?.data?.result}
          loading={isLoading}
          showViewModal={showViewModal}
          // showDeleteModal={showDeleteModal}
          pageSize={12}
        />

        <ViewDealerChat
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default SingleDealer;
