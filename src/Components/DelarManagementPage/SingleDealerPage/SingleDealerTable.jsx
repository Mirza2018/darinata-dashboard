/* eslint-disable react/prop-types */
import { Button, Space, Switch, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const SingleDealerTable = ({
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
              {console.log(record)}
              <Link to={`contract/${record._id}`}>
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
            <Tooltip placement="right" title="View Details">
              <p
                onClick={() => showViewModal(record)}
                className="text-xs font-semibold border border-[#00721E] px-2 py-1 rounded cursor-pointer hover:text-secondary-color"
              >
                Check
              </p>
            </Tooltip>
          </Space>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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

export default SingleDealerTable;
