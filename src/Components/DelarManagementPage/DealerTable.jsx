/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const DealerTable = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "serialNumber",
      dataIndex: "serialNumber",
      key: "serialNumber",
      responsive: ["md"],
    },

    {
      title: "Dealer Name",
      dataIndex: "dealerName",
      key: "dealerName",
    },
    {
      title: "CRV Number",
      dataIndex: "cvrNumber",
      key: "cvrNumber",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
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
                  color: "#222222",
                }}
                onClick={() => showViewModal(record)}
              >
                {/* {console.log("111",record._id)} */}
                <Link to={`${record._id}`}>
                  <p className="text-xs font-semibold border-2 border-[#00721E] px-2 py-1 rounded">
                    See Details
                  </p>
                </Link>
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
        rowKey="serialNumber"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default DealerTable;
