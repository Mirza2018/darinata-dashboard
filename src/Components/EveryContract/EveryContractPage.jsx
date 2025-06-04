import { useEffect, useState } from "react";

import axios from "axios";
import { useEveryContract2Query, useEveryContractQuery } from "../../redux/api/adminApi";
import ViewEarningTable from "../TotalEarningPage/ViewEarningTable";
import ContractTable from "./ContractTable";
import ContractTable2 from "./ContractTable2";


export default function EveryContractPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  });

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };

  const {
    data: everyContract,
    currentData,
    isLoading,
    isFetching,
    isSuccess,
  } = useEveryContractQuery(filters);

  const {
    data: everyContract2,
    currentData: currentData2,
    isLoading: isLoading2,
    isFetching: isFetching2,
    isSuccess: isSuccess2,
  } = useEveryContract2Query(filters);



  const displayedData = everyContract ?? currentData;
  const displayedData2 = everyContract2 ?? currentData2;
  //* Store Search Value
  console.log("meta", displayedData2);
  
  const [searchText, setSearchText] = useState("");
const [iscontract,setIscontract]=useState(false)
  //* Use to set user
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
        const response = await axios.get("/data/carData.json");

        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSearch = (value) => {
    setSearchText(value);
  };

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
    <div className="min-h-[90vh]">
      <div
        className="bg-[#FFFFFF] p-3 rounded"
        style={{ boxShadow: "0px 0px 2px 1px #00000040" }}
      >
        <div className="flex justify-start gap-3 p-6">
          {/* <div className="flex gap-4 items-center">
            <Input
              placeholder="Search User..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold !border-input-color py-2"
              prefix={
                <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
              }
            />
          </div> */}

          <h1
            onClick={() => setIscontract(false)}
            className={`text-2xl font-medium  px-2 py-2 rounded-xl cursor-pointer ${
              iscontract ? "bg-white-400 text-black" : "bg-green-400 text-white"
            } `}
          >
            Contract
          </h1>
          <h1
            onClick={() => setIscontract(true)}
            className={`text-2xl font-medium  px-2 py-2 rounded-xl cursor-pointer ${
              iscontract ? "bg-green-400 text-white" : "bg-white-400 text-black"
            } `}
          >
            Offer Contract
          </h1>
        </div>
        <div className="px-2 lg:px-6">
          {iscontract ? (
            <ContractTable2
              data={displayedData2?.data?.result}
              loading={isLoading2}
              showViewModal={showViewModal}
              showDeleteModal={showDeleteModal}
              meta={displayedData2?.data?.meta}
              onPageChange={onPageChange}
            />
          ) : (
            <ContractTable
              data={displayedData?.data?.result}
              loading={isLoading}
              showViewModal={showViewModal}
              showDeleteModal={showDeleteModal}
              meta={displayedData?.data?.meta}
              onPageChange={onPageChange}
            />
          )}
        </div>

        <ViewEarningTable
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />
      </div>
    </div>
  );
}
