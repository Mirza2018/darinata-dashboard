import { useEffect, useMemo, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import axios from "axios";
import DeleteCarModal from "./DeleteCarModal";
import ViewCarTable from "./ViewCarTable";

import { useSellCarQuery } from "../../redux/api/adminApi";
import CarTable from "./CarTable";

export default function CarSellTable() {
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
    data: sellCarData,
    currentData,
    isError,
    isFetching,
    isLoading,
  } = useSellCarQuery(filters);
  const displayData = sellCarData ?? currentData;
  console.log("meta", displayData?.data?.meta);

  //* Store Search Value
  const [searchText, setSearchText] = useState("");

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

  //   const filteredData = useMemo(() => {
  //     if (!searchText) return data;
  //     return data.filter((item) =>
  //       item.userName.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //   }, [data, searchText]);

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
        <div className="flex justify-between p-6">
          {/* <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-base-color">Users</h1>
          </div> */}
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
        </div>
        <div className="px-2 lg:px-6">
          <CarTable
            data={displayData?.data?.result}
            loading={loading}
            showViewModal={showViewModal}
            showDeleteModal={showDeleteModal}
            meta={displayData?.data?.meta}
            onPageChange={onPageChange}
          />
        </div>

        <ViewCarTable
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          data={currentRecord}
          currentRecord={data}
          handleBlock={handleBlock}
        />
      </div>
    </div>
  );
}
