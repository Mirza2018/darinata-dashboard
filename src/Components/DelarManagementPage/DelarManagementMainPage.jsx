import { useEffect, useMemo, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Upload, Button } from "antd";
import axios from "axios";
import DealerTable from "./DealerTable";
import ViewDealerTable from "./ViewDealerTable";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DelarManagementMainPage() {
  //* Store Search Value
  const [form] = Form.useForm();
    const router = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isModalOpenAddDealer, setIsModalOpenAddDealer] = useState(false);

  //* Use to set user
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Show Delete Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);
  const showModalAddDealer = () => {
    setIsModalOpenAddDealer(true);
  };
  const handleOkAddDealer = () => {
    setIsModalOpenAddDealer(false);
  };
  const handleCancelAddDealer = () => {
    setIsModalOpenAddDealer(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/dealerData.json");

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

  const handleBlock = (data) => {
    console.log("Blocked User:", { id: data?.id, userName: data?.userName });
    setIsViewModalVisible(false);
  };
    const onFinish = (values) => {
      console.log(values);
      form.resetFields();
      handleCancelAddDealer();
      // router("car-info");
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
              className="w-fit text-base font-semibold !border-input-color py-2"
              prefix={
                <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
              }
            />
            <button
              onClick={showModalAddDealer}
              className="flex whitespace-nowrap gap-2 text-xl font-bold bg-highlight-color rounded-md py-3 px-10 text-white"
            >
              Crate Dealer
            </button>
          </div>
        </div>
        <Modal
          title={null}
          open={isModalOpenAddDealer}
          onOk={handleOkAddDealer}
          onCancel={handleCancelAddDealer}
          footer={null}
          width={1000}
        >
          <Form
            name="basic"
            className="md:grid md:grid-cols-3  gap-5 p-10 "
            form={form}
            onFinish={onFinish}
            layout="vertical"
          >
            <div
              // onChange={handleImageUpload}
              className="border border-dashed border-gray-300 md:mb-0 mb-5 p-4 rounded-md h-fit"
            >
              <Form.Item name="image">
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload to server
                  maxCount={1}
                  accept="image/*"
                  className="flex flex-col items-center justify-center gap-2 img-text-warp"
                >
                  <div className="flex items-center justify-center">
                    <FaCloudUploadAlt className="text-8xl " />
                  </div>
                  <p className="text-center">
                    Drag and drop your files here or click to upload
                  </p>
                </Upload>
              </Form.Item>
            </div>
            <div className="md:col-span-2 ">
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item label="First Name" name="firstName">
                  <Input placeholder="Enter your First Name" />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input placeholder="Enter your Last Name" />
                </Form.Item>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input placeholder="Enter your Phone Number" />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input placeholder="Enter your Address" />
                </Form.Item>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Form.Item label="Email" name="email">
                    <Input placeholder="Enter your Email" />
                  </Form.Item>
                </div>
                <div className="flex  gap-5 ">
                  <Form.Item label="Rge Nr." name="rgeNr">
                    <Input placeholder="Enter your Rge Nr." />
                  </Form.Item>
                  <Form.Item label="Konto Nr." name="kontoNr">
                    <Input placeholder="Enter your Konto Nr." />
                  </Form.Item>{" "}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item label="CVR Number" name="cvrNumber">
                  <Input placeholder="Enter your CVR Number" />
                </Form.Item>
                <Form.Item label="Website Link" name="websiteLink">
                  <Input placeholder="Enter your Website Link" />
                </Form.Item>
              </div>
            </div>

            <Form.Item label={null} className="col-span-3 text-end">
              <button
                className="text-xl font-medium text-white bg-highlight-color px-10 py-2 rounded-md "
                type="primary"
                htmlType="submit"
              >
                Create
              </button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="px-2 lg:px-6">
          <DealerTable
            data={data}
            loading={loading}
            showViewModal={showViewModal}
            showDeleteModal={showDeleteModal}
            pageSize={12}
          />
        </div>

        <ViewDealerTable
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />
        {/* <DeleteCarModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        /> */}
      </div>
    </div>
  );
}
