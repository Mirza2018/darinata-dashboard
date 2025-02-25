import { useEffect, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal } from "antd";
import axios from "axios";
import TaskManagementTable from "./TaskManageMentTable";
import ViewTaskManagementTable from "./ViewTaskManagementTable";
import ViewTaskCompleteTable from "./ViewTaskCompleteTable";
import { AllIcons, AllImages } from "../../../public/images/AllImages";

export default function TaskManagement() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  //* Store Search Value
  const [searchText, setSearchText] = useState("");
  const [isModalOpenTaskAdd, setIsModalOpenTaskAdd] = useState(false);
  const showModalTaskAdd = () => {
    setIsModalOpenTaskAdd(true);
  };
  const handleOkTaskAdd = () => {
    setIsModalOpenTaskAdd(false);
  };
  const handleCancelTaskAdd = () => {
    setIsModalOpenTaskAdd(false);
  };

  //* Use to set user
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isViewModalVisible2, setIsViewModalVisible2] = useState(false);

  //* It's Use to Show Delete Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentRecord2, setCurrentRecord2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/taskData.json");

        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   const filteredData = useMemo(() => {
  //     if (!searchText) return data;
  //     return data.filter((item) =>
  //       item.userName.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //   }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };
  const showViewModal2 = (record) => {
    setCurrentRecord2(record);
    setIsViewModalVisible2(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (data) => {
    // Handle delete action here
    console.log({ id: data?.id, userName: data?.userName });
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
  };
  const handleCancel2 = () => {
    setIsViewModalVisible2(false);
    // setIsDeleteModalVisible2(false);
  };

  const handleBlock = (data) => {
    console.log("Blocked User:", { id: data?.id, userName: data?.userName });
    setIsViewModalVisible(false);
  };
  const onFinish = (values) => {
    console.log(values);
    handleCancelTaskAdd();
    form.resetFields();
  };

  return (
    <div className="min-h-[90vh]">
      <div
        className="bg-[#FFFFFF] p-3 rounded"
        style={{ boxShadow: "0px 0px 2px 1px #00000040" }}
      >
        <div className="flex justify-between p-6">
          {/* <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-base-color">Users</h1>
          </div> */}
          <div className="flex justify-between gap-4 items-center  w-full">
            <Input
              placeholder="Search User..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold !border-input-color py-2 w-fit"
              prefix={
                <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
              }
            />
            <button
              onClick={showModalTaskAdd}
              className="flex whitespace-nowrap gap-2 text-xl font-bold bg-highlight-color rounded-md py-3 px-10 text-white"
            >
              {" "}
              <img src={AllImages.task} className="!invert" /> Create Task
            </button>
          </div>
          <Modal
            title={
              <p className="text-center text-2xl font-medium text-[#00721E]">
                Task Generator
              </p>
            }
            open={isModalOpenTaskAdd}
            onOk={handleOkTaskAdd}
            onCancel={handleCancelTaskAdd}
            footer={null}
          >
            <Form
              name="basic"
              form={form}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item label="Task title" name="taskTitle">
                <Input placeholder="Enter task title" />
              </Form.Item>
              <Form.Item label="Task Description" name="taskDescription">
                <TextArea placeholder="Enter task description" rows={4} />
              </Form.Item>
              <Form.Item label="Assign To" name="assign">
                <Input placeholder="Enter assignee name" />
              </Form.Item>
              <Form.Item label="Deadline" name="deadline">
                <DatePicker className=" w-full border border-secondary-color bg-base-color" />
              </Form.Item>

              <Form.Item label={null} className="text-center">
                <button
                  className="text-xl font-medium text-white bg-highlight-color px-28 py-3 rounded-md "
                  type="primary"
                  htmlType="submit"
                >
                  Done
                </button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className="px-2 lg:px-6">
          <TaskManagementTable
            data={data}
            loading={loading}
            showViewModal={showViewModal}
            showViewModal2={showViewModal2}
            showDeleteModal={showDeleteModal}
            pageSize={12}
          />
        </div>

        <ViewTaskManagementTable
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />

        <ViewTaskCompleteTable
          isViewModalVisible2={isViewModalVisible2}
          handleCancel2={handleCancel2}
          currentRecord2={currentRecord2}
          handleBlock={handleBlock}
        />
      </div>
    </div>
  );
}
