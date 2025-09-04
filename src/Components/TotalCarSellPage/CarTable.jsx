/* eslint-disable react/prop-types */
import { Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";

const CarTable = ({
  data,
  loading,
  showViewModal,
  showDeleteModal, 
  meta,
  onPageChange,
}) => {
  const testData = data;
  const columns = [
    {
      title: "Privat bruger",
      dataIndex: "privateUserProfile",
      key: "privateUserProfile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },
    {
      title: "Forhandlerens navn",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </div>
      ),
    },
    {
      title: "Mærkenavn & Model",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.brand} {text?.model}
        </div>
      ),
    },
    // {
    //   title: "Car Model",
    //   dataIndex: "carModel",
    //   key: "carModel",
    //   render: (text) => <div className="whitespace-nowrap"></div>,
    // },
    {
      title: "CRV-nummer",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.cvrNumber ? <> {text?.cvrNumber}</> : "Not available"}
        </div>
      ),
    },
    {
      title: "Placering",
      dataIndex: "company",
      key: "company",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.city}( {text?.postCode})
        </div>
      ),
    },
    {
      title: "Farve",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <div className="whitespace-nowrap">{text?.color}</div>,
    },

    {
      title: "Pris",
      dataIndex: "car",
      key: "car",
      render: (text) => (
        <div className="whitespace-nowrap">
          {text?.expectedPrice ? <>{text?.expectedPrice} .kr</> : ""}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="Vis detaljer">
              <GoEye
                className="cursor-pointer"
                onClick={() => showViewModal(record)}
                style={{ fontSize: "24px" }}
              />
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
          // showSizeChanger: true,
        }}
        rowKey="id"
        scroll={{ x: true }}
      />
      {/* <pre>{JSON.stringify(testData, null, 3)}</pre> */}
    </div>
  );
};

export default CarTable;
