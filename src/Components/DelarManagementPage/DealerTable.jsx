/* eslint-disable react/prop-types */
import { Modal, Space, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useUserBlockMutation } from "../../redux/api/adminApi";
import { useState } from "react";
import { toast } from "sonner";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DealerInfoEdit from "./DealerInfoEdit";

const DealerTable = ({ data, loading, showViewModal, meta, onPageChange }) => {
  const [UserBlock] = useUserBlockMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [record, setIsRecord] = useState(null);
  const handleDelete = async (id) => {
    const toastId = toast.loading("Forhandleren slettes...");
    const data = {
      action: "delete",
    };
    try {
      const res = await UserBlock({ data, id }).unwrap();
      console.log(res);
      toast.success("Forhandleren er blevet slettet.", {
        id: toastId,
        duration: 2000,
      });
      setIsOpen2(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "Der er et problem med at blokere brugeren.",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  const handleBlock = async (id) => {
    const toastId = toast.loading("Brugeren blokeres...");
    const data = {
      action: "block",
    };
    try {
      const res = await UserBlock({ data, id }).unwrap();
      console.log(res);
      toast.success("Brugeren er blokeret.", {
        id: toastId,
        duration: 2000,
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at blokere brugeren.",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  const handleUnBlock = async (id) => {
    const toastId = toast.loading("Brugeren afblokeres...");
    const data = {
      action: "unblock",
    };
    try {
      const res = await UserBlock({ data, id }).unwrap();
      console.log(res);
      toast.success("Brugeren er afblokeret.", {
        id: toastId,
        duration: 2000,
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at fjerne blokeringen af brugeren.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const columns = [
    {
      title: "Forhandler-ID",
      dataIndex: "uuid",
      key: "uuid",
    },
    {
      title: "Forhandlernavn",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },

    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefon",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.phoneNumber ? <>{text?.phoneNumber}</> : "Not provided"}
        </div>
      ),
    },

    {
      title: "Lokation",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.address ? <>{text?.address}</> : "Ikke angivet"}
        </div>
      ),
    },
    {
      title: "Handling",
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
              Ophæv blokering
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpen(true);
                setIsRecord(record);
              }}
              className="bg-red-600 text-white px-5 rounded-lg font-medium"
            >
              Bloker
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
          <button
            onClick={() => {
              setIsOpen3(true);
              setIsRecord(record);
            }}
            className="text-red-600  rounded-lg font-medium"
          >
            <FaEdit />
          </button>
        </div>
      ),
    },
    {
      title: "Detaljer",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <Link onClick={() => showViewModal(record)} to={`${record._id}`}>
                <p className="text-xs font-semibold border border-[#00721E] hover:text-secondary-color px-2 py-1 rounded">
                  Se detaljer
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
            <> Vil du ophæve blokeringen af brugeren?</>
          ) : (
            <> Vil du blokere brugeren?</>
          )}

          {/* */}
        </h1>
        <div className="flex justify-center items-center mt-5 gap-5">
          {record?.status == "blocked" ? (
            <button
              onClick={() => handleUnBlock(record?._id)}
              className="bg-green-600 text-white px-2 text-lg rounded-lg font-medium"
            >
              Ja
            </button>
          ) : (
            <button
              onClick={() => handleBlock(record?._id)}
              className="bg-green-600 text-white px-2 text-lg rounded-lg font-medium"
            >
              Ja
            </button>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="bg-red-600 text-white px-2 text-lg rounded-lg font-medium"
          >
            Nej
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
          Vil du slette denne forhandler?
          {/* */}
        </h1>
        <div className="flex justify-center items-center mt-5 gap-5">
          <button
            onClick={() => handleDelete(record?._id)}
            className="bg-green-600 text-white px-2 text-lg rounded-lg font-medium"
          >
            Ja
          </button>

          <button
            onClick={() => setIsOpen2(false)}
            className="bg-red-600 text-white px-2 text-lg rounded-lg font-medium"
          >
            Nej
          </button>
        </div>
      </Modal>

      <DealerInfoEdit
        record={record}
        setIsOpen3={setIsOpen3}
        isOpen3={isOpen3}
      />
    </div>
  );
};

export default DealerTable;
