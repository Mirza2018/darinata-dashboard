import { Form, Input, Modal, Upload } from "antd";
import React, { useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";
import { useUpdateProfileAnotherMutation } from "../../redux/api/profileApi";
const DealerInfoEdit = ({ record, setIsOpen3, isOpen3 }) => {
  const [editDealer] = useUpdateProfileAnotherMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (record?.profile) {
      form.setFieldsValue({
        first_name: record?.profile?.first_name,
        last_name: record?.profile?.last_name,
        phoneNumber: record?.profile.phoneNumber,
        email: record?.email,
        zip: record?.profile?.zip,
        city: record?.profile?.city,
        cvrNumber: record?.profile?.cvrNumber,
        companyName: record?.profile?.companyName,
        websiteLink: record?.profile?.websiteLink,
        street: record?.profile?.street,
        address: record?.profile?.address,
        kontoNr: record?.profile?.kontoNr,
        regNo: record?.profile?.regNo,
      });
    }
  }, [record, form]);
  const onFinish = async (values) => {
    const toastId = toast.loading("Dealer info is Updating...");
    const data = { ...values };
    console.log(data);
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(data));

    console.log(data);

    try {
      const res = await editDealer({
        data: data,
        id: record?.profile?._id,
      }).unwrap();
      console.log(res);
      toast.success(res?.message || "Dealer is update Successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      setIsOpen3(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem to create Dealer",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <Modal
      title={null}
      open={isOpen3}
      onOk={() => setIsOpen3(false)}
      onCancel={() => setIsOpen3(false)}
      footer={null}
      width={800}
    >
      <Form
        name="basic"
        className="md:grid md:grid-cols-3  gap-5 p-5 "
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <div className="md:col-span-2 ">
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter First Name",
                },
              ]}
              label="First Name"
              name="first_name"
            >
              <Input required placeholder="Enter your First Name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter Last Name",
                },
              ]}
              label="Last Name"
              name="last_name"
            >
              <Input required placeholder="Enter your Last Name" />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter Phone Number",
                },
              ]}
              label="Phone Number"
              name="phoneNumber"
            >
              <Input required placeholder="Enter your Phone Number" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter Email",
                },
              ]}
              label="Email"
            >
              <Input
                value={record?.email}
                className="cursor-not-allowed"
                required
                placeholder="Enter your Email"
              />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter Zip",
                },
              ]}
              label="Zip"
              name="zip"
            >
              <Input required placeholder="Ente zip" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter City",
                },
              ]}
              label="City"
              name="city"
            >
              <Input required placeholder="Enter city name" />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter Address",
                },
              ]}
              label="Address"
              name="address"
            >
              <Input required placeholder="Enter your Address" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter Street",
                },
              ]}
              label="Street"
              name="street"
            >
              <Input required placeholder="Enter your Street Link" />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter CVR Number",
                },
              ]}
              label="CVR Number"
              name="cvrNumber"
            >
              <Input required placeholder="Enter your CVR Number" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter Company Name",
                },
              ]}
              label="Company Name"
              name="companyName"
            >
              <Input required placeholder="Enter your company name" />
            </Form.Item>{" "}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item label="Rge Nr." name="regNo">
              <Input required placeholder="Enter your Rge Nr." />
            </Form.Item>
            <Form.Item label="Konto Nr." name="kontoNr">
              <Input required placeholder="Enter your Konto Nr." />
            </Form.Item>{" "}
          </div>
          <div className="grid md:grid-cols-2 gap-5">
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
            Update
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DealerInfoEdit;
