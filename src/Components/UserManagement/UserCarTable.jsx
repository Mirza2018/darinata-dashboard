/* eslint-disable react/prop-types */
import { Button, Space, Switch, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const UserCarTable = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  pageSize = 0,
}) => {
  const columns = [
    // {
    //   title: "User Name",
    //   dataIndex: "userName",
    //   key: "userName",
    //   responsive: ["md"],
    // },
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
      dataIndex: "carPrice",
      key: "carPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Block",
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
                {/* <GoEye style={{ fontSize: "24px" }} /> */}
                {/* <Link to={`${record._id}`}>
                  <p className="text-xs font-semibold border-2 border-[#00721E] px-2 py-1 rounded">
                    See Details
                  </p>
                </Link> */}
                <Switch default checked={record.isBlock} />
                {console.log(record)}
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

export default UserCarTable;
