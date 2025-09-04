/* eslint-disable react/prop-types */
import { Space, Table, Tooltip } from "antd";
import { dateConvert } from "../../utils/dateConvert";

const TaskManageTable = ({ 
  data,
  loading,
  showViewModal,
  showViewModal2,
  meta,
  onPageChange,
}) => {
  const columns = [
    {
      title: "Opgave-ID",
      dataIndex: "taskId",
      key: "taskId",
      responsive: ["md"],
    },
    {
      title: "Forhandlernavn",
      dataIndex: "dealerInfo",
      key: "dealerInfo",
      render: (text) => (
        <div>
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },
    {
      title: "Opgavebeskrivelse",
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
      title: "Status",
      dataIndex: "taskStatus",
      key: "taskStatus",
      render: (text) => (
        <div>
          {text == "pending" ? (
            <div className="bg-yellow-400 text-center py-2 px-2 rounded-md font-medium">
              afventer
            </div>
          ) : (
            <div className="bg-green-400 text-center text-white py-2 px-2 rounded-md font-medium">
              Fuldført
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Handling",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="Se detaljer">
              <p
                onClick={() => showViewModal(record)}
                className="text-xs font-semibold border border-[#ADD8E6] bg-[#F3F9FB] px-2 py-1 rounded cursor-pointer"
              >
                Se detaljer
              </p>
            </Tooltip>
            {record?.taskStatus == "pending" && (
              <Tooltip placement="right" title="View Details">
                <p
                  onClick={() => showViewModal2(record)}
                  className="text-xs font-semibold border border-[#ADD8E6]  px-2 py-1 rounded cursor-pointer"
                >
                  Marker som fuldført
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
        pagination={{
          current: meta?.page,
          pageSize: meta?.limit,
          total: meta?.total,
          onChange: onPageChange,
          // showSizeChanger: true,
        }}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default TaskManageTable;
  