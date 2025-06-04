import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { useAllCarListQuery } from "../../redux/api/adminApi";
import AllCarTable from "./AllCarTable";

const AllCarsMainPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  });
  const [searchText, setSearchText] = useState("");

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };

  //   console.log(searchText);

  const { data, currentData, isError, isFetching, isLoading } =
    useAllCarListQuery(filters);
  const displayData = data ?? currentData;

  const onSearch = (value) => {
    setSearchText(value);
  };

  const handleSearch = () => {
    console.log(searchText);
    setFilters((prev) => ({
      ...prev,
      searchTerm: searchText,
    }));
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
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search Brand Name Or Modle Name..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold !border-input-color py-2 md:w-[400px]"
              //   prefix={
              //     <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
              //   }
            />
            <Button
              onClick={handleSearch}
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
            />
          </div>
        </div>
        <div className="px-2 lg:px-6">
          <AllCarTable
            data={displayData?.data?.result}
            loading={isLoading}
            meta={displayData?.data?.pagination}
            onPageChange={onPageChange}
          />
        </div>

 
      </div>
    </div>
  );
};

export default AllCarsMainPage;
