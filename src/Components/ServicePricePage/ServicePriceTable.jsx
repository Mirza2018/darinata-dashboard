/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const ServicePriceTable = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "Car Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
      responsive: ["md"],
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Car Model",
      dataIndex: "carModel",
      key: "carModel",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Service Charge",
      dataIndex: "serviceCharge",
      key: "serviceCharge",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#00721E",
                }}
                onClick={() => showViewModal(record)}
              >
                Customize
                {/* <GoEye style={{ fontSize: "24px" }} /> */}
              </Button>
            </Tooltip>
            {/* <Tooltip placement="left" title="Delete this User">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
                onClick={() => showDeleteModal(record)}
              >
                <RiDeleteBin6Line style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip> */}
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
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ServicePriceTable;
