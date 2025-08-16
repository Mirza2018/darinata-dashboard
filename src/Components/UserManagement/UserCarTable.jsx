/* eslint-disable react/prop-types */
import { Table } from "antd";

const UserCarTable = ({ data, loading, pageSize = 0 }) => {
  console.log("hi", data);

  const columns = [
    {
      title: "Bilnavn",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => {
        return <p>{text?.brand}</p>;
      },
    },
    {
      title: "Bilmodel",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => {
        return <p>{text?.model}</p>;
      },
    },
    {
      title: "Bilpris",
      dataIndex: "expectedPrice",
      key: "expectedPrice",
      render: (text) => {
        return <p>{text}.kr</p>;
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    {
      title: "Farve",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => {
        return <p>{text?.color}</p>;
      },
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
