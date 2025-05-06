/* eslint-disable react/prop-types */
import { Button, Form, Modal, Radio, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";

const ContractTable = ({ data, loading, pageSize = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const statusRecord = (record) => {
    setIsModalOpen(true);
    setStatusData(record);
  };
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
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => statusRecord(record)}
          className={` text-black rounded-md  py-1 font-semibold whitespace-nowrap ${
            record?.status === "Completed"
              ? "bg-green-600 px-6 "
              : "bg-yellow-600 px-3"
          }`}
        >
          {record?.status === "Completed" ? (
            <Tooltip title="Paid" placement="topRight">
              <span className="text-white">Paid</span>
            </Tooltip>
          ) : (
            <Tooltip title="Unpaid" placement="topRight">
              <span className="text-white">Non Paid</span>
            </Tooltip>
          )}
        </button>
      ),
    },
  ];

  const onFinish = (value) => {
    console.log({ value });
  };
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
      <Modal
        title="Payment Status"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form onFinish={onFinish}>
          {/* {console.log(statusData)} */}

          <Form.Item name="paymentStatus">
            <Radio.Group
              className="flex flex-col gap-3"
              options={[
                { value: "paid", label: "Paid" },
                { value: "nonpaid", label: "Non Paid" },
              ]}
            />
          </Form.Item>
          <div className="flex  gap-5 justify-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className=" bg-blue-100  px-3 py-1 rounded text-xl font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className=" bg-green-400 text-white px-3 py-1 rounded text-xl font-medium"
            >
              Update
            </button>
          </div>
        </Form>
      </Modal>
      ;
    </div>
  );
};

export default ContractTable;
