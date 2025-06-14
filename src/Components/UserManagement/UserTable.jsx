/* eslint-disable react/prop-types */
import { Modal, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useUserBlockMutation } from "../../redux/api/adminApi";

const UserTable = ({ data, loading, showViewModal, meta, onPageChange }) => {
  const [UserBlock] = useUserBlockMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [record, setIsRecord] = useState(null);

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
      title: "User Name",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },
    // {
    //   title: "CRV Number",
    //   dataIndex: "cvrNumber",
    //   key: "cvrNumber",
    // },
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
        <>
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
        </>
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
        rowKey="id"
        scroll={{ x: true }}
      />
      {/* <pre>{JSON.stringify(data, null, 3)}</pre> */}
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
    </div>
  );
};

export default UserTable;
