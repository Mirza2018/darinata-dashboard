/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { render } from "react-dom";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { dateConvert } from "../../utils/dateConvert";

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
      dataIndex: "dealerInfo",
      key: "dealerInfo",
      render: (text) => (
        <div>
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },
    {
      title: "Task Description",
      dataIndex: "taskDescription",
      key: "taskDescription",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (text) => <div>{dateConvert(text)}</div>,
    },
    {
      title: "status",
      dataIndex: "taskStatus",
      key: "taskStatus",
      render: (text) => (
        <div>
          {text == "pending" ? (
            <div className="bg-yellow-400 text-center py-2 px-2 rounded-md font-medium">
              pending
            </div>
          ) : (
            <div className="bg-green-400 text-center text-white py-2 px-2 rounded-md font-medium">
              {text}
            </div>
          )}
        </div>
      ),
    },
    // {
    //   title: "Account Status",
    //   dataIndex: "accountStatus",
    //   key: "accountStatus",
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <p
                onClick={() => showViewModal(record)}
                className="text-xs font-semibold border border-[#ADD8E6] bg-[#F3F9FB] px-2 py-1 rounded cursor-pointer"
              >
                See Details
              </p>
            </Tooltip>
            {record?.taskStatus == "pending" && (
              <Tooltip placement="right" title="View Details">
                <p
                  onClick={() => showViewModal2(record)}
                  className="text-xs font-semibold border border-[#ADD8E6]  px-2 py-1 rounded cursor-pointer"
                >
                  Mark Complete
                </p>
              </Tooltip>
            )}
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
        pagination={pageSize}
        rowKey="id"
        scroll={{ x: true }}
      />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default TaskManagementTable;
