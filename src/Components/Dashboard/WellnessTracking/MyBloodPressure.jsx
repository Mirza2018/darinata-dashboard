import { useState } from "react";
import { Divider, Radio, Table } from "antd";
const columns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "AM",
    dataIndex: "am",
  },
  {
    title: "PM",
    dataIndex: "pm",
  },
  {
    title: "Result",
    dataIndex: "result",
  },
];

const progressData = [
  {
    key: "1",
    date: "03/12/2024",
    am: "06:30",
    pm: "",
    result: "Good",
  },
  {
    key: "2",
    date: "03/12/2024",
    am: "",
    pm: "06:30",
    result: "Good",
  },
  {
    key: "3",
    date: "03/12/2024",
    am: "06:30",
    pm: "",
    result: "Good",
  },
  {
    key: "4",
    date: "03/12/2024",
    am: "",
    pm: "07:20",
    result: "Good",
  },
  {
    key: "5",
    date: "03/12/2024",
    am: "06:40",
    pm: "",
    result: "Good",
  },
  {
    key: "6",
    date: "03/12/2024",
    am: "",
    pm: "06:30",
    result: "Good",
  },
];
// const columns2 = [
//   {
//     title: "Tuesday, March 24,2015",
//     dataIndex: "date",
//   },
//   {
//     title: "Others",
//     dataIndex: "other",
//   },
// ];

// const notes = [
//   {
//     key: "1",
//     date: "12/12/24",
//     other: "Good condition",
//   },
//   {
//     key: "2",
//     date: "13/12/24",
//     other: "Good condition",
//   },
//   {
//     key: "3",
//     date: "14/12/24",
//     other: "Good condition",
//   },
//   {
//     key: "4",
//     date: "15/12/24",
//     other: "Good condition",
//   },
//   {
//     key: "5",
//     date: "16/12/24",
//     other: "Good condition",
//   },
//   {
//     key: "6",
//     date: "17/12/24",
//     other: "Good condition",
//   },
// ];

const MyBloodPressure = () => {
  //  const [name, setName] = useState("Hamid Hasan.");
  return (
    <div className=" bg-[#F7F8F8] rounded-lg shadow p-8 h-fit">
      <h1 className="text-2xl font-normal text-secondary-color mb-6 ">
        My Blood Pressure log:
      </h1>

      {/* <h1 className="text-base font-bold text-secondary-color mb-6 ">
      Instructions: 
      </h1> */}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-secondary-color mb-6 ">
          Instructions:
        </h2>
        <ul className="list-disc list-inside">
          <li className="">
            Both the kidneys are visualized and appear normal in size, shape,
            position and echotexture. Cortico-medullary differentiation is well
            maintained.
          </li>
          <li className="">
          For best results, sit comfortably with both feet on the floor for at least five minutes before
          taking a measurement. Sit calmly and don&#39;t talk.
          </li>
        </ul>
      </div>

      {/* <div className="flex justify-start items-center my-10">
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
      </div> */}
      <Table
        bordered
        columns={columns}
        dataSource={progressData}
        pagination={false}
      />
      {/* <h1 className="block text-base font-medium text-gray-700 whitespace-nowrap my-5">
        Notes:
      </h1>
      <Table
        bordered
        columns={columns2}
        dataSource={notes}
        pagination={{ pageSize: 3 }}
      /> */}
    </div>
  );
};

export default MyBloodPressure;
