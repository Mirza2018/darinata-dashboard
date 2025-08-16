import { useEffect, useState } from "react";

import { Button, Form, Input, Modal, Upload } from "antd";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  useCreateUserMutation,
  useDealerListQuery,
} from "../../redux/api/adminApi";
import DealerTable from "./DealerTable";
import ViewDealerTable from "./ViewDealerTable";
import { SearchOutlined } from "@ant-design/icons";

export default function DelarManagementMainPage() {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  });

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };

  const handleSearch = (search) => {
    console.log(searchText);
    setFilters((prev) => ({
      ...prev,
      searchTerm: search,
    }));
  };
  const {
    data: userData,
    currentData,
    isLoading,
    isFetching,
    isSuccess,
  } = useDealerListQuery(filters);
  const [createData] = useCreateUserMutation();

  const displayedData = userData ?? currentData;
  // console.log(displayedData);
  // console.log("meta", displayedData?.meta);

  //* Store Search Value
  const [form] = Form.useForm();
  const router = useNavigate();

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
    // console.log(values);

    // router("car-info");

    const toastId = toast.loading("Forhandleren er ved at blive oprettet...");
    const data = { ...values, role: "dealer" };
    console.log(data);

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
      toast.success("Forhandleren er oprettet.", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      handleCancelAddDealer();
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at oprette forhandleren", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-[90vh]">
      <div
        className="bg-[#FFFFFF] p-3 rounded"
        style={{ boxShadow: "0px 0px 2px 1px #00000040" }}
      >
        <div className="flex justify-between p-6">
          <div className="flex justify-between gap-4 items-center  w-full">
            <div className="flex gap-4 items-center">
              <Input
                placeholder="Søg fornavn..."
                // value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-fit text-base font-semibold !border-input-color py-2"
                prefix={
                  <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
                }
              />
              {/* <Button
                onClick={handleSearch}
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
              /> */}
            </div>
            <button
              onClick={showModalAddDealer}
              className="flex whitespace-nowrap gap-2 text-xl font-bold bg-highlight-color rounded-md py-3 px-10 text-white"
            >
              Opret forhandler
            </button>
          </div>
        </div>
        <Modal
          title={null}
          open={isModalOpenAddDealer}
          onOk={handleOkAddDealer}
          onCancel={handleCancelAddDealer}
          footer={null}
          width={900}
        >
          <Form
            name="basic"
            className="md:grid md:grid-cols-3  gap-5 p-5 "
            form={form}
            onFinish={onFinish}
            layout="vertical"
          >
            <div
              // onChange={handleImageUpload}
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
                    Træk og slip dine filer her, eller klik for at uploade
                  </p>
                </Upload>
              </Form.Item>
            </div>

            <div className="md:col-span-2 ">
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst fornavn.",
                    },
                  ]}
                  label="Fornavn"
                  name="first_name"
                >
                  <Input required placeholder="Indtast dit fornavn" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst efternavn.",
                    },
                  ]}
                  label="Efternavn"
                  name="last_name"
                >
                  <Input required placeholder="Indtast dit efternavn" />
                </Form.Item>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst et telefonnummer.",
                    },
                  ]}
                  label="Telefonnummer"
                  name="phoneNumber"
                >
                  <Input required placeholder="Indtast dit telefonnummer" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst e-mail.",
                    },
                  ]}
                  label="E-mail"
                  name="email"
                >
                  <Input required placeholder="Indtast din e-mail" />
                </Form.Item>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst postnummer.",
                    },
                  ]}
                  label="Postnummer"
                  name="zip"
                >
                  <Input required placeholder="Indtast postnummer" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst by.",
                    },
                  ]}
                  label="By"
                  name="city"
                >
                  <Input required placeholder="Indtast bynavn" />
                </Form.Item>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst gade.",
                    },
                  ]}
                  label="Gade"
                  name="street"
                >
                  <Input required placeholder="Indtast dit gadelink" />
                </Form.Item>
                <Form.Item label="Website Link" name="websiteLink">
                  <Input placeholder="Indtast dit hjemmesidelink" />
                </Form.Item>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst CVR-nummer.",
                    },
                  ]}
                  label="CVR-nummer"
                  name="cvrNumber"
                >
                  <Input required placeholder="Indtast dit CVR-nummer" />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst firmanavn.",
                    },
                  ]}
                  label="Firmanavn"
                  name="companyName"
                >
                  <Input required placeholder="Indtast dit firmanavn" />
                </Form.Item>{" "}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Form.Item label="Reg. nr." name="regNo">
                  <Input placeholder="Indtast dit registreringsnummer." />
                </Form.Item>
                <Form.Item label="Kontonummer" name="kontoNr">
                  <Input placeholder="Indtast dit kontonummer" />
                </Form.Item>{" "}
              </div>
              <div className="">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Indtast venligst adgangskode.",
                    },
                  ]}
                  label="Adgangskode"
                  name="password"
                >
                  <Input.Password
                    required
                    placeholder="Indtast din adgangskode "
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
                Opret
              </button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="px-2 lg:px-6">
          <DealerTable
            data={displayedData?.data}
            // data={displayedData}
            loading={loading}
            showViewModal={showViewModal}
            showDeleteModal={showDeleteModal}
            meta={displayedData?.meta}
            onPageChange={onPageChange}
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
