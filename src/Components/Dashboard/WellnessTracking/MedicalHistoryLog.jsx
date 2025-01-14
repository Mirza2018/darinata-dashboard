import React from "react";
import MedicalHistory from "../UserHealthRecord/MedicalHistory";
import { ConfigProvider, Table } from "antd";
const columns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Others",
    dataIndex: "other",
  },
];

const notes = [
  {
    key: "1",
    date: "12/12/24",
    other: "Good condition",
  },
  {
    key: "2",
    date: "13/12/24",
    other: "Good condition",
  },
  {
    key: "3",
    date: "14/12/24",
    other: "Good condition",
  },
  {
    key: "4",
    date: "15/12/24",
    other: "Good condition",
  },
  {
    key: "5",
    date: "16/12/24",
    other: "Good condition",
  },
  {
    key: "6",
    date: "17/12/24",
    other: "Good condition",
  },
];
const MedicalHistoryLog = () => {
  return (
    <div>
      <MedicalHistory />
      <div className=" bg-[#F7F8F8] rounded-lg shadow p-8">
        <h1 className="text-2xl font-normal text-secondary-color mb-6 ">
          Clinivea provides actionable lifestyle and wellness tips.
        </h1>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                lineHeight: 1.2,
              },
            },
          }}
        >
          <Table
            bordered
            columns={columns}
            dataSource={notes}
            pagination={false}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default MedicalHistoryLog;
