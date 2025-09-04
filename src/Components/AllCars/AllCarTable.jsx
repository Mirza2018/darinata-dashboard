/* eslint-disable react/prop-types */
import { Modal, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "sonner";
import { useDeleteCarMutation } from "../../redux/api/adminApi";
import CarUpdateModel from "./CarUpdateModel";

const AllCarTable = ({
  data,
  loading,
  meta,
  onPageChange,
}) => {
  // console.log(data);
  const [deleteCar] = useDeleteCarMutation();
  const toastId = "deleteId";
  const [record, setRecord] = useState(null);
  const [isDeleteModelOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModelOpen, setIsUpdateModalOpen] = useState(false);

  const handleDeleteModel = (record) => {
    setIsDeleteModalOpen(true);
    setRecord(record);
  };
  const handleUpdateModel = (record) => {
    setIsUpdateModalOpen(true);
    setRecord(record);
  };

  const handleDelete = async () => {
    // toast.loading("Car is deleteing...", {
    //   id: toastId,
    //   duration: 2000,
    // });

    try {
      const res = await deleteCar(record?._id).unwrap();
      console.log(res);
      toast.success("Bilen er slettet.", {
        id: toastId,
        duration: 2000,
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Der er et problem med at slette bilen.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const columns = [
    {
      title: "Noteringsnavn",
      dataIndex: "company",
      key: "company",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },
    // {
    //   title: "Dealer Name",
    //   dataIndex: "profile",
    //   key: "profile",
    //   render: (text) => (
    //     <div className="whitespace-nowrap">
    //       {text?.first_name} {text?.last_name}
    //     </div>
    //   ),
    // },
    {
      title: "Mærkenavn og model",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.brand} {text?.model}
        </div>
      ),
    },
    // {
    //   title: "Car Model",
    //   dataIndex: "carModel",
    //   key: "carModel",
    //   render: (text) => <div className="whitespace-nowrap"></div>,
    // },
    // {
    //   title: "CRV Number",
    //   dataIndex: "profile",
    //   key: "profile",
    //   render: (text) => (
    //     <div className="whitespace-nowrap">
    //       {text?.cvrNumber ? <> {text?.cvrNumber}</> : "Not available"}
    //     </div>
    //   ),
    // },
    {
      title: "Lokation",
      dataIndex: "company",
      key: "company",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.city}( {text?.postCode})
        </div>
      ),
    },
    {
      title: "Farve",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <div className="whitespace-nowrap">{text?.color}</div>,
    },

    {
      title: "Pris",
      dataIndex: "expectedPrice",
      key: "expectedPrice",
      render: (text) => (
        <div className="whitespace-nowrap">{text ? <>{text} .kr</> : ""}</div>
      ),
    },

    {
      title: "Handling",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-3">
          <Space size="middle">
            <Tooltip placement="right" title="Slet">
              <RiDeleteBinLine
                className="cursor-pointer text-red-600"
                onClick={() => handleDeleteModel(record)}
                style={{ fontSize: "24px" }}
              />
            </Tooltip>
          </Space>
          <Space size="middle">
            <Tooltip placement="right" title="Rediger">
              <CiEdit
                className="cursor-pointer text-blue-500"
                onClick={() => handleUpdateModel(record)}
                style={{ fontSize: "24px" }}
              />
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title=""
        closable={{ "aria-label": "Custom Close Button" }}
        open={isDeleteModelOpen}
        onOk={() => setIsDeleteModalOpen(false)}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer=""
      >
        <div>
          <h1 className="text-center font-medium text-xl">
            Vil du slette denne bil?
          </h1>

          <div className="flex justify-center gap-5 mt-5">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white text-xl px-8 py-2 rounded-lg"
            >
              Ja
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-green-500 text-white text-xl px-8 py-2 rounded-lg"
            >
              Nej
            </button>
          </div>
        </div>
      </Modal>
      <CarUpdateModel
        record={record}
        isUpdateModelOpen={isUpdateModelOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
      />
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
      {/* <pre>{JSON.stringify(data, null, 3)}</pre> */}
    </div>
  );
};

export default AllCarTable;
