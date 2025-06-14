/* eslint-disable react/prop-types */
import { Space, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";

const UserTable = ({
  data,
  loading,
  showViewModal,
  meta,
  onPageChange,

}) => {
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
    </div>
  );
};

export default UserTable;
