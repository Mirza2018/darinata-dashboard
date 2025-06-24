/* eslint-disable react/prop-types */
import { Modal, Space, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useUserBlockMutation } from "../../redux/api/adminApi";
import { useState } from "react";
import { toast } from "sonner";
import { FaTrashAlt } from "react-icons/fa";

const DealerTable = ({ data, loading, showViewModal, meta, onPageChange }) => {
  const [UserBlock] = useUserBlockMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [record, setIsRecord] = useState(null);
  const handleDelete = async (id) => {
    const toastId = toast.loading("Dealer is Deleteing...");
    const data = {
      action: "delete",
    };
    try {
      const res = await UserBlock({ data, id }).unwrap();
      console.log(res);
      toast.success("Dealer is Delete successfully", {
        id: toastId,
        duration: 2000,
      });
      setIsOpen2(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "There is an problem to block user", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  const handleBlock = async (id) => {
    const toastId = toast.loading("User is Blocking...");
    const data = {
      action: "block",
    };
    try {
      const res = await UserBlock({ data, id }).unwrap();
      console.log(res);
      toast.success("User Block successfully", {
        id: toastId,
        duration: 2000,
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "There is an problem to block user", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  const handleUnBlock = async (id) => {
    const toastId = toast.loading("User is Unblocking...");
    const data = {
      action: "unblock",
    };
    try {
      const res = await UserBlock({ data, id }).unwrap();
      console.log(res);
      toast.success("User Unblock successfully", {
        id: toastId,
        duration: 2000,
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem to Unblock user",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  const columns = [
    {
      title: "Dealer ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Dealer Name",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.phoneNumber ? <>{text?.phoneNumber}</> : "Not provided"}
        </div>
      ),
    },

    {
      title: "Location",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.address ? <>{text?.address}</> : "Not provided"}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-5">
          {record?.status == "blocked" ? (
            <button
              onClick={() => {
                setIsOpen(true);
                setIsRecord(record);
              }}
              className="bg-yellow-600 text-white px-2 rounded-lg font-medium"
            >
              Unblock
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpen(true);
                setIsRecord(record);
              }}
              className="bg-red-600 text-white px-5 rounded-lg font-medium"
            >
              Block
            </button>
          )}

          <button
            onClick={() => {
              setIsOpen2(true);
              setIsRecord(record);
            }}
            className="text-red-600  rounded-lg font-medium"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
    {
      title: "Details",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <Link onClick={() => showViewModal(record)} to={`${record._id}`}>
                <p className="text-xs font-semibold border border-[#00721E] hover:text-secondary-color px-2 py-1 rounded">
                  See Details
                </p>
              </Link>
            </Tooltip>
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
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
        rowKey="serialNumber"
        scroll={{ x: true }}
      />
      <Modal
        title=""
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={[]}
      >
        {console.log(record?.status)}
        <h1 className="flex justify-center items-center text-xl  font-medium">
          {record?.status == "blocked" ? (
            <> Do you want to Unblock user?</>
          ) : (
            <> Do you want to block user?</>
          )}

          {/* */}
        </h1>
        <div className="flex justify-center items-center mt-5 gap-5">
          {record?.status == "blocked" ? (
            <button
              onClick={() => handleUnBlock(record?._id)}
              className="bg-green-600 text-white px-2 text-lg rounded-lg font-medium"
            >
              Yes
            </button>
          ) : (
            <button
              onClick={() => handleBlock(record?._id)}
              className="bg-green-600 text-white px-2 text-lg rounded-lg font-medium"
            >
              Yes
            </button>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="bg-red-600 text-white px-2 text-lg rounded-lg font-medium"
          >
            No
          </button>
        </div>
      </Modal>
      <Modal
        title=""
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen2}
        onOk={() => setIsOpen2(false)}
        onCancel={() => setIsOpen2(false)}
        footer={[]}
      >
        {console.log(record?.status)}
        <h1 className="flex justify-center items-center text-xl  font-medium">
          Do you want to Delete this delear?
          {/* */}
        </h1>
        <div className="flex justify-center items-center mt-5 gap-5">
          <button
            onClick={() => handleDelete(record?._id)}
            className="bg-green-600 text-white px-2 text-lg rounded-lg font-medium"
          >
            Yes
          </button>

          <button
            onClick={() => setIsOpen2(false)}
            className="bg-red-600 text-white px-2 text-lg rounded-lg font-medium"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DealerTable;
