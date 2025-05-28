/* eslint-disable react/prop-types */
import {
  Button,
  Form,
  Modal,
  Radio,
  Space,
  Switch,
  Table,
  Tooltip,
} from "antd";
import { useState } from "react";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useChangePaymentMutation } from "../../../redux/api/adminApi";

const SingleDealerTable = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  pageSize = 0,
}) => {
  const [changePaymet] = useChangePaymentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const statusRecord = (record) => {
    setIsModalOpen(true);
    setStatusData(record);
  };

  const columns = [
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
    },
    {
      title: "Car Model",
      dataIndex: "carModel",
      key: "carModel",
    },
    {
      title: "Car Price",
      dataIndex: "expectedPrice",
      key: "expectedPrice",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },

    {
      title: "Contract",
      key: "contract",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              {/* {console.log(record)} */}
              <Link to={`contract/${record?.carId}`}>
                <p className="text-xs font-semibold border hover:text-secondary-color border-[#00721E] px-2 py-1 rounded">
                  See Contract Peper
                </p>
              </Link>
            </Tooltip>
          </Space>
        </>
      ),
    },
    {
      title: "Chat Check",
      key: "chatcheck",
      render: (_, record) => (
        <>
          <Space size="middle">
            {record?.conversationId ? (
              <Tooltip placement="right" title="View Details">
                <p
                  onClick={() => showViewModal(record)}
                  className="text-xs font-semibold border border-[#00721E] px-2 py-1 rounded cursor-pointer hover:text-secondary-color"
                >
                  Check
                </p>
              </Tooltip>
            ) : (
              <p
                // onClick={() => showViewModal(record)}
                className="text-xs font-semibold border border-[#00721E] px-2 py-1 rounded cursor-pointer hover:text-secondary-color"
              >
                No conversation
              </p>
            )}
          </Space>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <button
          onClick={() => statusRecord(record)}
          className={` text-black rounded-md  py-1 font-semibold whitespace-nowrap ${
            record?.paymentStatus === "paid"
              ? "bg-green-600 px-6 "
              : "bg-yellow-600 px-3"
          }`}
        >
          {console.log(record?.paymentStatus)}

          {record?.paymentStatus === "paid" ? (
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
  const onFinish = async (value) => {
    const toastId = toast.loading("Payment status is updating...");
    const data = {
      action: value?.paymentStatus,
      saleCarId: statusData?.saleCarId,
    };
    console.log(data);
    
    // return;
    try {
      const res = await changePaymet(data).unwrap();
      console.log(res);
      toast.success("Payment status is Update successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      
      toast.error("There is an error to update payment status", {
        id: toastId,
        duration: 2000,
      });
    }

    // console.log(value?.paymentStatus);
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
                { value: "unpaid", label: "Un Paid" },
              ]}
            />
          </Form.Item>

          <pre>{JSON.stringify(statusData, null, 2)}</pre>
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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SingleDealerTable;
