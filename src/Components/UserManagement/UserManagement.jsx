import { useEffect, useState } from "react";

import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Upload, Button } from "antd";
import axios from "axios";
import UserTable from "./UserTable";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useUsersListQuery,
} from "../../redux/api/adminApi";
import { toast } from "sonner";

export default function UserManagement() {
  const [filters, setFilters] = useState({
    page: 1,
    limit:8,
  });

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };

  const {
    data: userData,
    currentData,
    isLoading,
    isFetching,
    isSuccess,
  } = useUsersListQuery(filters);

  const [createData] = useCreateUserMutation();

  const displayedData = userData ?? currentData;
  // console.log("meta", displayedData?.meta);

  const [form] = Form.useForm();
  const router = useNavigate();

  const { TextArea } = Input;
  //* Store Search Value
  const [searchText, setSearchText] = useState("");
  const [isModalOpenAddUser, setIsModalOpenAddUser] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const showModalAddUser = () => {
    setIsModalOpenAddUser(true);
  };
  const handleOkAddUser = () => {
    setIsModalOpenAddUser(false);
  };
  const handleCancelAddUser = () => {
    setIsModalOpenAddUser(false);
  };
  //* Store Search Value

  //* Use to set user
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Show Delete Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");

        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const onFinish = async (values) => {
    console.log(values);

    // router("car-info");

    const toastId = toast.loading("User is creating...");
    const data = { ...values, role: "private_user" };

    delete data.profileImage;

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append(
      "profileImage",
      data?.profileImage?.fileList[0].originFileObj
    );

    console.log(data);
  
    try {
      const res = await createData(formData).unwrap();
      console.log(res);
      toast.success(res?.message || "user is create Successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      handleCancelAddUser();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem to create user",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
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
          <div className="flex justify-end gap-4 items-center  w-full">
            {/* <Input
              placeholder="Search User..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="w-fit text-base font-semibold !border-input-color py-2"
              prefix={
                <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
              }
            /> */}
            <button
              onClick={showModalAddUser}
              className="flex whitespace-nowrap gap-2 text-xl font-bold bg-highlight-color rounded-md py-3 px-10 text-white"
            >
              Add user
            </button>
          </div>
        </div>
        <Modal
          title={null}
          open={isModalOpenAddUser}
          onOk={handleOkAddUser}
          onCancel={handleCancelAddUser}
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
              onChange={handleImageUpload}
              className="border border-dashed border-gray-300 md:mb-0 mb-5 p-4 rounded-md h-fit"
            >
              <Form.Item name="profileImage">
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
                <Form.Item label="First Name" name="first_name">
                  <Input required placeholder="Enter your First Name" />
                </Form.Item>
                <Form.Item label="Last Name" name="last_name">
                  <Input required placeholder="Enter your Last Name" />
                </Form.Item>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input required placeholder="Enter your Phone Number" />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input required placeholder="Enter your Address" />
                </Form.Item>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item label="Email" name="email">
                  <Input required placeholder="Enter your Email" />
                </Form.Item>

                <Form.Item label="Rge Nr." name="regNo">
                  <Input required placeholder="Enter your Rge Nr." />
                </Form.Item>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item label="Konto Nr." name="kontoNr">
                  <Input required placeholder="Enter your Konto Nr." />
                </Form.Item>{" "}
                <Form.Item label="Website Link" name="websiteLink">
                  <Input placeholder="Enter your Website Link" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <Input.Password
                    required
                    placeholder="Enter your Password Link"
                  />
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
          <UserTable
            data={displayedData?.data}
            loading={loading}
            showViewModal={showViewModal}
            showDeleteModal={showDeleteModal}
            meta={displayedData?.meta}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
