/* eslint-disable react/prop-types */
import { Button, Form, Modal, Radio, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";

const ContractTable = ({ data, loading, meta, onPageChange }) => {
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
      dataIndex: "profile",
      key: "dealer",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },
    {
      title: "Car Name",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <div className="whitespace-nowrap">{text?.brand}</div>,
    },
    {
      title: "User Name",
      dataIndex: "privateUserProfile",
      key: "privateUserProfile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },
    {
      title: "Car Price",
      dataIndex: "car",
      key: "car",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.isBid ? text?.bidPrice : text?.expectedPrice} .kr
        </div>
      ),
    },
    {
      title: "Color",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <div className="whitespace-nowrap">{text?.color}</div>,
    },
    {
      title: "Contract",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Tooltip placement="right" title="View Contract Details">
            {/* {!record?.signatureAsDealer && !record?.signatureAsOwner && (
              <Button className={`  !text-white  !bg-highlight-color`}>
                <p>Pending contract</p>
              </Button>
            )}
            {!record?.signatureAsDealer && record?.signatureAsOwner && (
              <Button className={`  !text-white !bg-secondary-color !px-5`}>
                {" "}
                <p>Make your contract</p>{" "}
              </Button>
            )} */}
            {record?.signatureAsDealer && record?.signatureAsOwner ? (
              <Link to={`contract/${record?.car?._id}`}>
                <Button className={`  !text-white !bg-green-500 `}>
                  {" "}
                  <p>See Contract Paper</p>{" "}
                </Button>
              </Link>
            ) : (
              <Button className={`  !text-white  !bg-highlight-color px-2`}>
                <p>Pending Contract Paper</p>
              </Button>
            )}
          </Tooltip>
          {/* {record?.status === "sold" ? (
            <Link to={`contract/${record?.car?._id}`}>
              <button className="bg-green-600 border w-fit text-white rounded-md px-10 py-1 font-semibold whitespace-nowrap">
                See Contract Paper
              </button>
            </Link>
          ) : (
            <p className="bg-yellow-600 border w-fit text-white rounded-md w-fix text-center px-11 py-1 font-semibold whitespace-nowrap">
              No Contract Done
            </p>
          )} */}
        </>
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
          // onClick={() => statusRecord(record)}
          className={` text-black rounded-md  py-1 font-semibold whitespace-nowrap ${
            record?.signatureAsDealer && record?.signatureAsOwner
              ? "bg-green-500 px-6 "
              : "bg-highlight-color px-3"
          }`}
        >
          {record?.signatureAsDealer && record?.signatureAsOwner ? (
            <Tooltip title="status" placement="topRight">
              <span className="text-white px-2">Sold</span>
            </Tooltip>
          ) : (
            <Tooltip title="status" placement="topRight">
              <span className="text-white">Not Sold</span>
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
      {/* <pre>{JSON.stringify(data, null, 3)}</pre> */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: meta?.page,
          pageSize: meta?.limit,
          total: meta?.total,
          onChange: onPageChange,
          showSizeChanger: true,
        }}
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
