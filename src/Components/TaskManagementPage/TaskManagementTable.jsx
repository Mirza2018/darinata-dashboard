/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const TaskManagementTable = ({
  data,
  loading,
  showViewModal,
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
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
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

export default TaskManagementTable;
