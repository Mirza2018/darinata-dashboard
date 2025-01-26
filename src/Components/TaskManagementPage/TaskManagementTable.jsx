/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const TaskManagementTable = ({
  data,
  loading,
  showViewModal,
  showViewModal2,
  showDeleteModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "Task Id",
      dataIndex: "taskId",
      key: "taskId",
      responsive: ["md"],
    },
    {
      title: "Dealer Name",
      dataIndex: "dealerName",
      key: "dealerName",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Account Status",
      dataIndex: "accountStatus",
      key: "accountStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <Button
                onClick={() => showViewModal(record)}
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
              >
                <p className="text-xs font-semibold border-2 border-[#ADD8E6] bg-[#F3F9FB] px-2 py-1 rounded">
                  See Details
                </p>
              </Button>
              <Button
                onClick={() => showViewModal2(record)}
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
              >
                <p className="text-xs font-semibold border-2 border-[#ADD8E6] bg-[#F3F9FB] px-2 py-1 rounded">
                  Mark Complete
                </p>
              </Button>
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
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default TaskManagementTable;
