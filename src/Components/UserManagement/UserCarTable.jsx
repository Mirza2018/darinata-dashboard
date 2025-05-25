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
      dataIndex: "expectedPrice",
      key: "expectedPrice",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    // {
    //   title: "Block",
    //   key: "action",
    //   render: (_, record) => (
    //     <>
    //       <Space size="middle">
    //         <Tooltip placement="right" title="View Details">
    //           <p className="!p-0" onClick={() => showViewModal(record)}>
    //             <Switch default checked={record.isBlock} />
    //             {console.log(record)}
    //           </p>
    //         </Tooltip>
    //       </Space>
    //     </>
    //   ),
    // },
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
