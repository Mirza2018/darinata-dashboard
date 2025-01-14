import { useState } from "react";
import { ConfigProvider, Divider, Radio, Table } from "antd";
const columns = [
  {
    title: "Weight",
    dataIndex: "weight",
  },
  {
    title: "BP",
    dataIndex: "bP",
  },
  {
    title: "Blood Suger",
    dataIndex: "bloodSuger",
  },
  {
    title: "Others",
    dataIndex: "others",
  },
];

const progressData = [
  {
    key: "1",
    weight: "137 pounds",
    bP: "139",
    bloodSuger: "80 mg/dL-90mg/dl",
    others: "White blood cell 5,000–10,000/mm3",
  },
  {
    key: "1",
    weight: "137 pounds",
    bP: "139",
    bloodSuger: "80 mg/dL",
    others: "White blood cell 5,000–10,000/mm3",
  },
  {
    key: "1",
    weight: "137 pounds",
    bP: "139",
    bloodSuger: "80 mg/dL",
    others: "White blood cell 5,000–10,000/mm3",
  },
];
const columns2 = [
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
];

const ProgressNotes = () => {
  const [name, setName] = useState("Hamid Hasan.");
  return (
    <div className=" bg-[#F7F8F8] rounded-lg shadow mt-5">
      <h1 className="text-2xl font-normal text-secondary-color mb-6 ">
        Progress Notes from MVRs:
      </h1>
      <div className="flex justify-start items-center my-10">
        <label className="block text-base  font-medium text-gray-700 whitespace-nowrap ">
          Patient Name:
        </label>
        <div className="">
          <input
            type="text"
            name="name"
            defaultValue={name}
            className="pl-10 outline-none bg-[#F7F8F8]  w-full sm:text-sm  border-b-2 border-black "
          />
        </div>
      </div>
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
          dataSource={progressData}
          pagination={false}
        />
      </ConfigProvider>

      <h1 className="block text-base font-medium text-gray-700 whitespace-nowrap my-5">
        Notes:
      </h1>
      <Table
        bordered
        columns={columns2}
        dataSource={notes}
        pagination={false}
      />
    </div>
  );
};

export default ProgressNotes;
