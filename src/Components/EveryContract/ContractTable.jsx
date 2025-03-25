/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";

const ContractTable = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "SL",
      dataIndex: "ownerName",
      key: "ownerName",
      responsive: ["md"],
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Dealer Name",
      dataIndex: "ownerName",
      key: "ownerName",
      responsive: ["md"],
    },
    {
      title: "Car Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "User Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Car Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Contract",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Link to={`contract/999`}>
          <button className="border-green-700 border text-black rounded-md px-2 py-1 font-semibold whitespace-nowrap">
            See Contract Peper
          </button>
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button className="ring-green-700 ring-2 border-4 bg-[#C68C4E] text-black rounded-md  py-1 font-semibold whitespace-nowrap px-10">
          Paid
        </button>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ContractTable;
