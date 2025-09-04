/* eslint-disable react/prop-types */
import { Button, Form, Modal, Radio, Table, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setOfferCarInfo } from "../../redux/slices/offerCarInfoSlice";

const ContractTable2 = ({ data, loading, meta, onPageChange }) => {


  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const statusRecord = (record) => {
    setIsModalOpen(true);
    setStatusData(record);
  };
  const columns = [
    {
      title: "SL",
      dataIndex: "mark",
      key: "mark",
      responsive: ["md"],
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    // {
    //   title: "Dealer Name",
    //   dataIndex: "profile",
    //   key: "dealer",
    //   render: (text) => (
    //     <div className="whitespace-nowrap">
    //       {text?.first_name} {text?.last_name}
    //     </div>
    //   ),
    // },
    {
      title: "Biloplysninger",
      dataIndex: "mark",
      key: "mark",
      render: (text, record) => (
        <div className="whitespace-nowrap">
          {record.mark} {record.model}
        </div>
      ),
    },
    // {
    //   title: "User Name",
    //   dataIndex: "privateUserProfile",
    //   key: "privateUserProfile",
    //   render: (text) => (
    //     <div className="whitespace-nowrap">
    //       {text?.first_name} {text?.last_name}
    //     </div>
    //   ),
    // },
    {
      title: "Bilpris",
      dataIndex: "cashPrice",
      key: "cashPrice",
      render: (text) => <div className="whitespace-nowrap">{text} .kr</div>,
    },
    // {
    //   title: "Color",
    //   dataIndex: "carModel",
    //   key: "carModel",
    //   render: (text) => <div className="whitespace-nowrap">{text?.color}</div>,
    // },
    {
      title: "Kontrakt",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Tooltip placement="right" title="View Contract Details">
            {!record?.signatureAsDealer && !record?.signatureAsOwner && (
              <Button className={`  !text-white  !bg-highlight-color`}>
                <p>Afventer kontraktpapir</p>
              </Button>
            )}
            {record?.signatureAsDealer && record?.signatureAsOwner && (
              <Button
                onClick={() => {
                  dispatch(setOfferCarInfo(record));
                  navigate(`offer-contract/${record?._id}`);
                }}
                className={`  !text-white !bg-green-500 `}
              >
                {" "}
                <p>Se kontraktpapir</p>{" "}
              </Button>
            )}
          </Tooltip>
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

          className={` text-black rounded-md  py-1 font-semibold whitespace-nowrap bg-green-500 px-6  ${
            record?.status == "accept"
              ? "bg-green-500 px-6 "
              : "bg-highlight-color px-3"
          }`}
        >
          {record?.signatureAsDealer && record?.signatureAsOwner ? (
            <Tooltip title="" placement="topRight">
              <span className="text-white px-2">Solgt</span>
            </Tooltip>
          ) : (
            <Tooltip title="" placement="topRight">
              <span className="text-white">Ikke solgt</span>
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
          // showSizeChanger: true,
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
      
    </div>
  );
};

export default ContractTable2;
